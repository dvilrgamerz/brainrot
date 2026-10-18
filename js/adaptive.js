/**
 * BrainForge V2 - Adaptive Difficulty & Learning Engine
 * Provides concept mastery tracking, deterministic difficulty scaling,
 * prerequisite dependency mapping, and intelligent question sequencing.
 * @module adaptive
 */

import { clamp } from './utils.js';

/**
 * Prerequisite dependency registry mapped by subject and topic.
 * @type {Record<string, Record<string, string[]>>}
 */
export const PREREQUISITES_MAP = Object.freeze({
  math: {
    addition: [],
    subtraction: ['addition'],
    multiplication: ['addition'],
    division: ['multiplication', 'subtraction'],
    fractions: ['division', 'multiplication'],
    decimals: ['fractions', 'division'],
    percentages: ['decimals', 'fractions'],
    ratios: ['fractions', 'division'],
    algebra: ['addition', 'subtraction', 'multiplication', 'division'],
    exponents: ['multiplication'],
    roots: ['exponents'],
    geometry: ['algebra'],
    trigonometry: ['geometry', 'ratios', 'algebra'],
    'mental-calc': ['addition', 'subtraction', 'multiplication'],
  },
  cs: {
    hardware: [],
    binary: ['hardware'],
    networking: ['hardware', 'binary'],
    databases: ['hardware'],
    algorithms: ['binary', 'databases'],
  },
  coding: {
    syntax: [],
    variables: ['syntax'],
    conditionals: ['variables'],
    loops: ['conditionals'],
    functions: ['variables', 'loops'],
    'data-structures': ['functions', 'loops'],
  },
  science: {
    cells: [],
    photosynthesis: ['cells'],
    chemistry: [],
    physics: ['chemistry'],
    astronomy: ['physics'],
  },
  gk: {
    geography: [],
    history: ['geography'],
    economics: ['history'],
  },
});

/**
 * Computes concept-level mastery statistics from a sequence of attempts.
 *
 * @param {Array<{ correct: boolean, ms?: number, at?: string }>} attempts - History of attempts
 * @returns {{
 *   level: number,
 *   accuracy: number,
 *   streak: number,
 *   avgLatency: number|null,
 *   lastResults: boolean[]
 * }}
 */
export function getConceptMastery(attempts) {
  if (!Array.isArray(attempts) || attempts.length === 0) {
    return {
      level: 1,
      accuracy: 0,
      streak: 0,
      avgLatency: null,
      lastResults: [],
    };
  }

  // Extract results in chronological order
  const results = attempts.map(a => Boolean(a.correct));
  const correctCount = results.filter(Boolean).length;
  const accuracy = Math.round((correctCount / attempts.length) * 100);

  // Compute current consecutive correct streak from most recent backwards
  let streak = 0;
  for (let i = results.length - 1; i >= 0; i--) {
    if (results[i] === true) {
      streak++;
    } else {
      break;
    }
  }

  // Latency calculation
  const timed = attempts.filter(a => typeof a.ms === 'number' && Number.isFinite(a.ms) && a.ms > 0);
  const avgLatency = timed.length > 0
    ? Math.round(timed.reduce((sum, a) => sum + a.ms, 0) / timed.length)
    : null;

  // Last results window (up to last 10 attempts)
  const lastResults = results.slice(-10);

  // Derive concept mastery level (1-5)
  let level = 1;
  if (streak >= 6 && accuracy >= 85) {
    level = 5;
  } else if (streak >= 4 && accuracy >= 75) {
    level = 4;
  } else if (streak >= 3 && accuracy >= 60) {
    level = 3;
  } else if (streak >= 2 && accuracy >= 50) {
    level = 2;
  }

  return {
    level,
    accuracy,
    streak,
    avgLatency,
    lastResults,
  };
}

/**
 * Determines whether a user qualifies for a difficulty increase.
 * Requires 3 or more consecutive correct responses.
 * A single correct response NEVER qualifies for an increase.
 *
 * @param {{ streak?: number, lastResults?: boolean[] }} mastery - Mastery metrics
 * @returns {boolean} True if difficulty should increase
 */
export function shouldIncreaseDifficulty(mastery) {
  if (!mastery || typeof mastery.streak !== 'number') {
    return false;
  }
  return mastery.streak >= 3;
}

/**
 * Determines whether a user should drop in difficulty to reinforce foundational skills.
 * Requires 2 or more consecutive incorrect responses.
 *
 * @param {{ lastResults?: boolean[] }} mastery - Mastery metrics
 * @returns {boolean} True if difficulty should decrease
 */
export function shouldDecreaseDifficulty(mastery) {
  if (!mastery || !Array.isArray(mastery.lastResults) || mastery.lastResults.length < 2) {
    return false;
  }
  const lastTwo = mastery.lastResults.slice(-2);
  return lastTwo.length === 2 && lastTwo[0] === false && lastTwo[1] === false;
}

/**
 * Returns the recommended next difficulty level (clamped to 1-5).
 * Difficulty is intentionally distinct from SRS memory strength.
 *
 * Deterministic rules:
 * - 3+ consecutive correct: difficulty increases by 1 (max 5)
 * - 2+ consecutive incorrect: difficulty decreases by 1 (min 1)
 * - Otherwise: difficulty remains unchanged
 * - A single correct answer NEVER increases difficulty
 *
 * @param {number} currentDifficulty - Current difficulty level (1-5)
 * @param {{ streak?: number, lastResults?: boolean[] }|null} mastery - Current concept mastery
 * @returns {number} New difficulty level (1-5)
 */
export function getRecommendedDifficulty(currentDifficulty, mastery) {
  const cur = clamp(Number(currentDifficulty) || 1, 1, 5);

  if (!mastery) {
    return cur;
  }

  if (shouldIncreaseDifficulty(mastery)) {
    return clamp(cur + 1, 1, 5);
  }

  if (shouldDecreaseDifficulty(mastery)) {
    return clamp(cur - 1, 1, 5);
  }

  return cur;
}

/**
 * Retrieves prerequisite topics for a given subject and topic.
 *
 * @param {string} subject - Subject key (e.g. "math", "coding")
 * @param {string} topic - Topic name (e.g. "percentages", "division")
 * @returns {string[]} List of prerequisite topics (empty if none or unknown)
 */
export function getPrerequisites(subject, topic) {
  if (!subject || !topic) return [];
  const subMap = PREREQUISITES_MAP[String(subject).toLowerCase()];
  if (!subMap) return [];
  const prereqs = subMap[String(topic).toLowerCase()];
  return Array.isArray(prereqs) ? [...prereqs] : [];
}

/**
 * Intelligently selects the next question for practice.
 * Prioritizes:
 * 1. Due reviews (highest priority)
 * 2. Weak topics (accuracy < 60% or broken streak)
 * 3. New unattempted material
 *
 * Penalizes / Avoids:
 * - Just-answered question (never repeated immediately if alternatives exist)
 * - Mastered easy questions (difficulty far below user level with high accuracy)
 *
 * @param {Array<Object>} availableQuestions - Pool of eligible questions
 * @param {Record<string, any>|Array<any>} [conceptHistory={}] - History or mastery map
 * @param {number} [currentDifficulty=1] - Current learner difficulty target (1-5)
 * @param {{ lastQuestionId?: string, dueQuestionIds?: string[] }} [options={}] - Options
 * @returns {Object|null} Selected question object or null if pool empty
 */
export function selectNextQuestion(availableQuestions, conceptHistory = {}, currentDifficulty = 1, options = {}) {
  if (!Array.isArray(availableQuestions) || availableQuestions.length === 0) {
    return null;
  }

  // Single question available: must return it
  if (availableQuestions.length === 1) {
    return availableQuestions[0];
  }

  // Filter out just-answered question to prevent immediate repetition
  let candidates = availableQuestions;
  if (options.lastQuestionId) {
    const withoutLast = availableQuestions.filter(q => q.id !== options.lastQuestionId);
    if (withoutLast.length > 0) {
      candidates = withoutLast;
    }
  }

  const dueSet = new Set(Array.isArray(options.dueQuestionIds) ? options.dueQuestionIds : []);
  const targetDiff = clamp(Number(currentDifficulty) || 1, 1, 5);

  let bestQuestion = null;
  let bestScore = -Infinity;

  for (const q of candidates) {
    let score = 0;

    // 1. Due reviews have top priority
    if (dueSet.has(q.id) || q.isDue) {
      score += 100;
    }

    // Inspect history / mastery for topic or concept
    const historyKey = q.conceptId || q.id || q.topic;
    let mastery = null;

    if (Array.isArray(conceptHistory)) {
      const attempts = conceptHistory.filter(a => a.questionId === q.id || a.topic === q.topic);
      if (attempts.length > 0) {
        mastery = getConceptMastery(attempts);
      }
    } else if (conceptHistory && typeof conceptHistory === 'object') {
      mastery = conceptHistory[historyKey] || conceptHistory[q.topic] || null;
    }

    if (mastery) {
      // 2. Weak topics get high priority
      if (mastery.accuracy < 60 || mastery.streak === 0) {
        score += 50;
      }
      // Penalize mastered easy questions
      if (mastery.accuracy >= 90 && (q.difficulty || 1) < targetDiff) {
        score -= 40;
      }
    } else {
      // 3. New material prioritized over mastered material
      score += 30;
    }

    // Difficulty matching bonus
    const qDiff = clamp(Number(q.difficulty) || targetDiff, 1, 5);
    const diffDelta = Math.abs(qDiff - targetDiff);
    if (diffDelta === 0) {
      score += 20;
    } else if (diffDelta === 1) {
      score += 10;
    } else {
      score -= diffDelta * 5;
    }

    // Deterministic tie-breaking: prefer higher score, then alphabetical question id
    if (score > bestScore) {
      bestScore = score;
      bestQuestion = q;
    } else if (score === bestScore && bestQuestion) {
      if (String(q.id) < String(bestQuestion.id)) {
        bestQuestion = q;
      }
    }
  }

  return bestQuestion || candidates[0];
}
