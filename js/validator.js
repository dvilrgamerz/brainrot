/**
 * BrainForge V2 - Deterministic Answer Validation Engine
 * Validates user answers across multiple formats: exact, numeric,
 * math-equivalent, fuzzy keyword overlap, MCQ, and code output.
 * Completely dependency-free and strictly prohibits eval() or new Function().
 * @module validator
 */

import { normalize } from './utils.js';

/**
 * Common English stop words filtered during keyword extraction.
 * @type {Set<string>}
 */
const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
  'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
  'to', 'was', 'were', 'will', 'with',
]);

/**
 * Parses numeric strings into standard numbers.
 * Supports:
 * - Integers and decimals: "42", "-17.5", ".5", "-.5", "+3"
 * - Fractions: "1/2", "-3/4", "7/8"
 * - Mixed numbers: "1 1/2", "-2 3/4"
 * - Percentages: "50%", "25.5 %", "-10%"
 * - Scientific notation: "1e5", "2.5e-3"
 *
 * @param {string|number} input - String or number to parse
 * @returns {number} Parsed number, or NaN if unparseable or division by zero
 */
export function normalizeNumeric(input) {
  if (typeof input === 'number') {
    return Number.isFinite(input) ? input : NaN;
  }
  if (typeof input !== 'string') {
    return NaN;
  }

  const s = input.trim();
  if (!s || s.length > 100) return NaN;

  // Percentage: e.g. "50%", "12.5 %"
  if (s.endsWith('%')) {
    const raw = s.slice(0, -1).trim();
    const val = Number(raw);
    return Number.isFinite(val) ? val / 100 : NaN;
  }

  // Mixed number: e.g. "1 1/2", "-2 3/4"
  const mixedMatch = s.match(/^([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixedMatch) {
    const whole = Number(mixedMatch[1]);
    const num = Number(mixedMatch[2]);
    const den = Number(mixedMatch[3]);
    if (den === 0) return NaN;
    const sign = whole < 0 || Object.is(whole, -0) ? -1 : 1;
    return whole + (sign * (num / den));
  }

  // Simple fraction: e.g. "1/2", "-3/4", "+5/10"
  const fracMatch = s.match(/^([+-]?\d+(?:\.\d+)?)\s*\/\s*([+-]?\d+(?:\.\d+)?)$/);
  if (fracMatch) {
    const num = Number(fracMatch[1]);
    const den = Number(fracMatch[2]);
    if (den === 0 || !Number.isFinite(num) || !Number.isFinite(den)) return NaN;
    return num / den;
  }

  // Standard float / integer / scientific notation
  // Handles ".5", "-.5", "+4", "100"
  if (/^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(s)) {
    const val = Number(s);
    return Number.isFinite(val) ? val : NaN;
  }

  return NaN;
}

/**
 * Compares two numeric representations within a specified tolerance.
 * Handles both numbers and string representations ("1/2" == "0.5" == ".5").
 *
 * @param {string|number} expected - Expected numeric value
 * @param {string|number} actual - User-provided numeric value
 * @param {number} [tolerance=0.001] - Allowable absolute difference
 * @returns {boolean} True if values match within tolerance
 */
export function isNumericMatch(expected, actual, tolerance = 0.001) {
  const numExp = typeof expected === 'number' ? expected : normalizeNumeric(expected);
  const numAct = typeof actual === 'number' ? actual : normalizeNumeric(actual);

  if (Number.isNaN(numExp) || Number.isNaN(numAct)) {
    return false;
  }

  return Math.abs(numExp - numAct) <= tolerance;
}

/**
 * Extracts meaningful keyword tokens from a string.
 * Strips punctuation, collapses whitespace, converts to lowercase,
 * and filters out stop words unless the string contains only stop words.
 *
 * @param {string} str - Raw text
 * @returns {string[]} Filtered keyword tokens
 */
function extractKeywords(str) {
  if (typeof str !== 'string') return [];
  const cleaned = normalize(str);
  if (!cleaned) return [];

  const tokens = cleaned.split(' ').filter(Boolean);
  const filtered = tokens.filter(t => t.length > 2 && !STOP_WORDS.has(t));

  return filtered.length > 0 ? filtered : tokens;
}

/**
 * Compares two strings using keyword overlap scoring.
 * Useful for short-answer conceptual questions where wording may vary slightly.
 *
 * @param {string} expected - Expected reference answer
 * @param {string} actual - User response
 * @param {number} [threshold=0.6] - Minimum overlap score (0.0 to 1.0)
 * @returns {boolean} True if overlap score meets or exceeds threshold
 */
export function isFuzzyMatch(expected, actual, threshold = 0.6) {
  if (typeof expected !== 'string' || typeof actual !== 'string') {
    return false;
  }

  // Exact normalized match is always 100% fuzzy match
  if (normalize(expected) === normalize(actual)) {
    return true;
  }

  const expTokens = extractKeywords(expected);
  const actTokens = extractKeywords(actual);

  if (expTokens.length === 0 || actTokens.length === 0) {
    return false;
  }

  // Guard against massive spam inputs (e.g. pasting an entire article)
  if (actTokens.length > expTokens.length * 5 + 4) {
    return false;
  }

  const actSet = new Set(actTokens);
  let matches = 0;

  for (const expWord of expTokens) {
    if (actSet.has(expWord)) {
      matches++;
      continue;
    }

    // Stem / prefix check for plurals or inflections (e.g. price / prices)
    if (expWord.length >= 4) {
      const stemMatch = actTokens.some(actWord => {
        if (actWord.length >= 4) {
          return expWord.startsWith(actWord) || actWord.startsWith(expWord);
        }
        return false;
      });
      if (stemMatch) {
        matches++;
      }
    }
  }

  const score = matches / expTokens.length;
  return score >= threshold;
}

/**
 * Validates a multiple-choice question answer by comparing zero-based indices.
 *
 * @param {number|string} correctIndex - The correct option index
 * @param {number|string} selectedIndex - The option selected by the user
 * @returns {boolean} True if indices match and are non-negative integers
 */
export function validateMCQ(correctIndex, selectedIndex) {
  if (correctIndex == null || selectedIndex == null) return false;
  const c = Number(correctIndex);
  const s = Number(selectedIndex);
  if (Number.isNaN(c) || Number.isNaN(s)) return false;
  return Number.isInteger(c) && Number.isInteger(s) && c >= 0 && c === s;
}

/**
 * Validates program output by comparing whitespace-normalized multiline strings.
 * Standardizes line endings, strips trailing line spaces, and ignores leading/trailing blank lines.
 *
 * @param {string} expected - Expected output
 * @param {string} actual - User or actual output
 * @returns {boolean} True if normalized outputs match
 */
export function validateCodeOutput(expected, actual) {
  if (typeof expected !== 'string' || typeof actual !== 'string') {
    return false;
  }

  const clean = (s) =>
    s
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .map(line => line.trimEnd())
      .join('\n')
      .trim();

  return clean(expected) === clean(actual);
}

/**
 * Checks for algebraic / expression equivalence without using eval().
 * Supports commutative addition and multiplication (e.g. "x + y" == "y + x", "2*x" == "2x").
 *
 * @param {string} expected - Expected expression
 * @param {string} actual - User expression
 * @returns {boolean} True if expressions are mathematically equivalent
 */
export function isMathEquivalent(expected, actual) {
  if (typeof expected !== 'string' || typeof actual !== 'string') return false;

  // Clean strings
  const cleanExp = expected.trim().toLowerCase().replace(/\s+/g, '');
  const cleanAct = actual.trim().toLowerCase().replace(/\s+/g, '');

  if (cleanExp === cleanAct) return true;

  // Numeric check first (e.g. "2/4" == "1/2")
  if (isNumericMatch(expected, actual)) return true;

  // Normalize multiplication operators: "2*x" -> "2x", "x*2" -> "2x", "x*y"
  const normTerms = (s) => {
    let res = s.replace(/×/g, '*');
    // Normalize x * 2 -> 2 * x
    res = res.replace(/([a-z])\*([0-9]+)/g, '$2*$1');
    // Normalize 2 * x -> 2x
    res = res.replace(/([0-9]+)\*([a-z])/g, '$1$2');
    return res;
  };

  const tExp = normTerms(cleanExp);
  const tAct = normTerms(cleanAct);
  if (tExp === tAct) return true;

  // Commutative addition check: e.g. "a + b" == "b + a"
  if (tExp.includes('+') && tAct.includes('+')) {
    const partsExp = tExp.split('+').sort().join('+');
    const partsAct = tAct.split('+').sort().join('+');
    if (partsExp === partsAct) return true;
  }

  // Commutative multiplication check: e.g. "a * b" == "b * a"
  if (tExp.includes('*') && tAct.includes('*')) {
    const partsExp = tExp.split('*').sort().join('*');
    const partsAct = tAct.split('*').sort().join('*');
    if (partsExp === partsAct) return true;
  }

  return false;
}

/**
 * Validates a user answer against a question object.
 * Returns the match classification: "exact", "numeric", "math-equivalent",
 * "fuzzy", "mcq", "code-output", or null if incorrect.
 *
 * @param {Object} question - The question specification
 * @param {any} userAnswer - User's submitted answer
 * @returns {{ correct: boolean, match: string|null }}
 */
export function validateAnswer(question, userAnswer) {
  if (!question || userAnswer == null) {
    return { correct: false, match: null };
  }

  // Handle MCQ
  if (question.type === 'mcq') {
    const isCorrect = validateMCQ(question.correctIndex, userAnswer);
    return {
      correct: isCorrect,
      match: isCorrect ? 'mcq' : null,
    };
  }

  // Handle Code Output
  if (question.type === 'code' || question.type === 'code-output') {
    const expected = question.expectedOutput || (Array.isArray(question.answers) ? question.answers[0] : question.answer);
    const isCorrect = validateCodeOutput(String(expected || ''), String(userAnswer));
    return {
      correct: isCorrect,
      match: isCorrect ? 'code-output' : null,
    };
  }

  // String answer validation
  const rawInput = String(userAnswer);
  if (rawInput.trim() === '') {
    return { correct: false, match: null };
  }

  // Guard against excessively long input
  if (rawInput.length > 2000) {
    return { correct: false, match: null };
  }

  const answers = Array.isArray(question.answers)
    ? question.answers
    : (question.answer ? [question.answer] : []);

  if (answers.length === 0) {
    return { correct: false, match: null };
  }

  const normUser = normalize(rawInput);

  // 1. Exact string match (case-insensitive, punctuation-normalized)
  for (const ans of answers) {
    if (normalize(String(ans)) === normUser) {
      return { correct: true, match: 'exact' };
    }
  }

  // 2. Numeric match (0.5 == 1/2 == 50% == .5)
  for (const ans of answers) {
    if (isNumericMatch(ans, rawInput)) {
      return { correct: true, match: 'numeric' };
    }
  }

  // 3. Math-equivalent expression match (e.g. algebraic commutative)
  for (const ans of answers) {
    if (isMathEquivalent(String(ans), rawInput)) {
      return { correct: true, match: 'math-equivalent' };
    }
  }

  // 4. Fuzzy match (keyword overlap) if flagged on question
  if (question.fuzzy) {
    const threshold = typeof question.fuzzyThreshold === 'number' ? question.fuzzyThreshold : 0.6;
    for (const ans of answers) {
      if (isFuzzyMatch(String(ans), rawInput, threshold)) {
        return { correct: true, match: 'fuzzy' };
      }
    }
  }

  return { correct: false, match: null };
}
