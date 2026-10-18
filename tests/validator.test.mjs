import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeNumeric,
  isNumericMatch,
  isFuzzyMatch,
  validateMCQ,
  validateCodeOutput,
  isMathEquivalent,
  validateAnswer,
} from '../js/validator.js';

test('Exact match: case-insensitive and ignores extra surrounding whitespace', () => {
  const q = { answers: ['Paris', 'City of Light'] };
  const res1 = validateAnswer(q, '  paris  ');
  assert.equal(res1.correct, true);
  assert.equal(res1.match, 'exact');

  const res2 = validateAnswer(q, 'CITY OF LIGHT');
  assert.equal(res2.correct, true);
  assert.equal(res2.match, 'exact');
});

test('Exact match: rejects incorrect answer', () => {
  const q = { answers: ['mitochondria', 'mitochondrion'] };
  const res = validateAnswer(q, 'nucleus');
  assert.equal(res.correct, false);
  assert.equal(res.match, null);
});

test('Numeric equivalence: 0.5, 1/2, and .5 evaluate as equal', () => {
  assert.equal(isNumericMatch('0.5', '1/2'), true);
  assert.equal(isNumericMatch('.5', '0.5'), true);
  assert.equal(isNumericMatch('1/2', '.5'), true);

  const q = { answers: ['0.5'] };
  const res = validateAnswer(q, '1/2');
  assert.equal(res.correct, true);
  assert.equal(res.match, 'numeric');
});

test('Numeric equivalence: negative numbers and fractions (-0.75 == -3/4)', () => {
  assert.equal(isNumericMatch('-0.75', '-3/4'), true);
  assert.equal(isNumericMatch('-3/4', '-0.75'), true);

  const q = { answers: ['-3/4'] };
  const res = validateAnswer(q, '-0.75');
  assert.equal(res.correct, true);
  assert.equal(res.match, 'numeric');
});

test('Percentage handling: 50% parses to 0.5 and matches 1/2 and .5', () => {
  assert.equal(normalizeNumeric('50%'), 0.5);
  assert.equal(isNumericMatch('50%', '0.5'), true);
  assert.equal(isNumericMatch('50%', '1/2'), true);

  const q = { answers: ['50%'] };
  const res = validateAnswer(q, '0.5');
  assert.equal(res.correct, true);
  assert.equal(res.match, 'numeric');
});

test('Percentage handling: 25% matches 0.25 and 1/4', () => {
  assert.equal(normalizeNumeric('25%'), 0.25);
  assert.equal(isNumericMatch('25%', '1/4'), true);
  assert.equal(isNumericMatch('25%', '0.25'), true);
});

test('Fuzzy matching: passes when keyword overlap meets default 0.6 threshold', () => {
  const expected = 'general rise in prices over time';
  const actual = 'rise in prices over time';
  assert.equal(isFuzzyMatch(expected, actual, 0.6), true);

  const q = { answers: [expected], fuzzy: true };
  const res = validateAnswer(q, actual);
  assert.equal(res.correct, true);
  assert.equal(res.match, 'fuzzy');
});

test('Fuzzy matching: fails when key conceptual terms are missing', () => {
  const expected = 'general rise in prices over time';
  const actual = 'stock market crash yesterday';
  assert.equal(isFuzzyMatch(expected, actual, 0.6), false);

  const q = { answers: [expected], fuzzy: true };
  const res = validateAnswer(q, actual);
  assert.equal(res.correct, false);
});

test('Fuzzy matching: respects custom threshold property on question', () => {
  const q = {
    answers: ['carbon dioxide water sunlight'],
    fuzzy: true,
    fuzzyThreshold: 0.8,
  };
  // Has 2 of 3 keywords = 0.667. Meets 0.6, but fails strict 0.8
  const resFail = validateAnswer(q, 'water sunlight');
  assert.equal(resFail.correct, false);

  // All 3 keywords
  const resPass = validateAnswer(q, 'sunlight water carbon dioxide');
  assert.equal(resPass.correct, true);
});

test('Empty and whitespace input handling returns correct: false safely', () => {
  const q = { answers: ['any answer'] };
  assert.equal(validateAnswer(q, '').correct, false);
  assert.equal(validateAnswer(q, '    ').correct, false);
  assert.equal(validateAnswer(q, null).correct, false);
  assert.equal(validateAnswer(q, undefined).correct, false);
});

test('MCQ validation: matching index returns correct: true', () => {
  assert.equal(validateMCQ(2, 2), true);
  assert.equal(validateMCQ('2', 2), true);

  const q = { type: 'mcq', correctIndex: 1, options: ['A', 'B', 'C'] };
  const res = validateAnswer(q, 1);
  assert.equal(res.correct, true);
  assert.equal(res.match, 'mcq');
});

test('MCQ validation: mismatched index returns correct: false', () => {
  assert.equal(validateMCQ(1, 2), false);

  const q = { type: 'mcq', correctIndex: 1, options: ['A', 'B', 'C'] };
  const res = validateAnswer(q, 0);
  assert.equal(res.correct, false);
});

test('MCQ validation: invalid indices (negative, non-number, null) return false', () => {
  assert.equal(validateMCQ(-1, -1), false);
  assert.equal(validateMCQ(null, 0), false);
  assert.equal(validateMCQ(0, 'invalid'), false);
  assert.equal(validateMCQ(undefined, undefined), false);
});

test('Code output comparison: ignores trailing whitespace and normalized line breaks', () => {
  const expected = 'Hello World\nLine 2\n';
  const actual = 'Hello World   \r\nLine 2\r\n\r\n';
  assert.equal(validateCodeOutput(expected, actual), true);

  const q = { type: 'code-output', expectedOutput: expected };
  const res = validateAnswer(q, actual);
  assert.equal(res.correct, true);
  assert.equal(res.match, 'code-output');
});

test('Code output comparison: detects mismatched text accurately', () => {
  const expected = 'Result: 42';
  const actual = 'Result: 41';
  assert.equal(validateCodeOutput(expected, actual), false);

  const q = { type: 'code-output', expectedOutput: expected };
  const res = validateAnswer(q, actual);
  assert.equal(res.correct, false);
});

test('Special characters: punctuation and symbols handled safely without errors', () => {
  const q = { answers: ['[1, 2, 3]'] };
  const res = validateAnswer(q, '[1, 2, 3]');
  assert.equal(res.correct, true);

  const q2 = { answers: ['x + y = 10'] };
  const res2 = validateAnswer(q2, 'x + y = 10');
  assert.equal(res2.correct, true);
});

test('Very long input: handles 5000+ characters safely without error', () => {
  const q = { answers: ['42'] };
  const spam = 'a'.repeat(5000);
  const res = validateAnswer(q, spam);
  assert.equal(res.correct, false);
});

test('Math-equivalent: commutative addition (x + y == y + x)', () => {
  assert.equal(isMathEquivalent('x + y', 'y + x'), true);
  assert.equal(isMathEquivalent('a + b + c', 'c + a + b'), true);

  const q = { answers: ['x + y'] };
  const res = validateAnswer(q, 'y + x');
  assert.equal(res.correct, true);
  assert.equal(res.match, 'math-equivalent');
});

test('Math-equivalent: multiplication notation (2*x == 2x)', () => {
  assert.equal(isMathEquivalent('2*x', '2x'), true);
  assert.equal(isMathEquivalent('x * 2', '2x'), true);

  const q = { answers: ['2x'] };
  const res = validateAnswer(q, '2*x');
  assert.equal(res.correct, true);
  assert.equal(res.match, 'math-equivalent');
});
