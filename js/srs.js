/**
 * BrainForge V2 - Spaced Repetition System (SRS) Engine
 * Implements an 8-level spaced repetition algorithm with Again/Hard/Good/Easy ratings,
 * lapse tracking, review history, and UTC timestamp consistency.
 * @module srs
 */

/**
 * Standard interval schedule in days per level (0 to 7).
 * Level 0 = same-day review (0 days)
 * Level 1 = 1 day
 * Level 2 = 3 days
 * Level 3 = 7 days
 * Level 4 = 14 days (2 weeks)
 * Level 5 = 30 days (1 month)
 * Level 6 = 60 days (2 months)
 * Level 7 = 90 days (3 months)
 * @type {readonly number[]}
 */
export const SCHEDULE = Object.freeze([0, 1, 3, 7, 14, 30, 60, 90]);

/**
 * Maximum achievable SRS level.
 * @type {number}
 */
export const MAX_LEVEL = 7;

/**
 * Review response ratings.
 * @readonly
 * @enum {number}
 */
export const RATINGS = Object.freeze({
  /** Complete recall failure; resets level by -2 and reschedules today (0 days). */
  AGAIN: 0,
  /** Recalled with significant effort; retains current level, schedules at 80% interval (min 1 day if level > 0). */
  HARD: 1,
  /** Successful recall; advances level by +1, schedules at schedule[level + 1]. */
  GOOD: 2,
  /** Effortless recall; advances level by +2, schedules at 130% of schedule[level + 2]. */
  EASY: 3,
});

/**
 * Represents a spaced repetition memory card.
 * @typedef {Object} MemoryCard
 * @property {string} questionId - Concept or question identifier
 * @property {string} subject - Subject domain (e.g. "math", "science")
 * @property {string} topic - Specific topic/skill name
 * @property {number} level - Current SRS level (0-7)
 * @property {number} correctCount - Lifetime correct answer count
 * @property {number} wrongCount - Lifetime incorrect answer count
 * @property {number} lapseCount - Number of times card was forgotten after learning
 * @property {string|null} lastReviewed - UTC ISO timestamp of last review, or null
 * @property {string} nextReview - UTC ISO timestamp when card is next due
 * @property {Array<ReviewRecord>} history - Rolling buffer of last 10 reviews
 */

/**
 * Represents a single review record in card history.
 * @typedef {Object} ReviewRecord
 * @property {number} rating - Rating given (0=AGAIN, 1=HARD, 2=GOOD, 3=EASY)
 * @property {boolean} wasCorrect - Whether answer was correct
 * @property {string} reviewedAt - UTC ISO timestamp of this review
 * @property {number} level - SRS level reached after this review
 * @property {number} intervalDays - Scheduled interval in days
 */

/**
 * Computes the next SRS level, review interval in days, and next review date.
 *
 * Exact rating behavior:
 * - AGAIN (0):
 *   level = max(0, currentLevel - 2)
 *   interval = 0 days (same day review)
 * - HARD (1):
 *   level = currentLevel (level unchanged)
 *   interval = round(schedule[level] * 0.8), with a minimum of 1 day if level > 0 (0 if level is 0)
 * - GOOD (2):
 *   level = min(currentLevel + 1, 7)
 *   interval = schedule[level]
 * - EASY (3):
 *   level = min(currentLevel + 2, 7)
 *   interval = round(schedule[level] * 1.3)
 *
 * @param {number} currentLevel - Current card level (0-7)
 * @param {number} rating - Rating from RATINGS enum (AGAIN=0, HARD=1, GOOD=2, EASY=3)
 * @param {{ now?: Date|string|number }} [options={}] - Optional reference date
 * @returns {{ nextLevel: number, intervalDays: number, nextReviewDate: string }}
 */
export function getNextReview(currentLevel, rating, options = {}) {
  const level = Math.max(0, Math.min(MAX_LEVEL, Number(currentLevel) || 0));
  const baseDate = options.now ? new Date(options.now) : new Date();

  let nextLevel;
  let intervalDays;

  switch (rating) {
    case RATINGS.AGAIN: {
      nextLevel = Math.max(0, level - 2);
      intervalDays = 0;
      break;
    }
    case RATINGS.HARD: {
      nextLevel = level;
      if (level === 0) {
        intervalDays = 0;
      } else {
        const calculated = Math.round(SCHEDULE[level] * 0.8);
        intervalDays = Math.max(1, calculated);
      }
      break;
    }
    case RATINGS.GOOD: {
      nextLevel = Math.min(MAX_LEVEL, level + 1);
      intervalDays = SCHEDULE[nextLevel];
      break;
    }
    case RATINGS.EASY: {
      nextLevel = Math.min(MAX_LEVEL, level + 2);
      intervalDays = Math.round(SCHEDULE[nextLevel] * 1.3);
      break;
    }
    default: {
      // Default to AGAIN if unknown rating provided
      nextLevel = Math.max(0, level - 2);
      intervalDays = 0;
      break;
    }
  }

  const nextDate = new Date(baseDate.getTime());
  nextDate.setUTCDate(nextDate.getUTCDate() + intervalDays);

  return {
    nextLevel,
    intervalDays,
    nextReviewDate: nextDate.toISOString(),
  };
}

/**
 * Checks whether a memory card is currently due for review.
 * A card is due if its nextReview timestamp is less than or equal to now (UTC).
 * Cards without a nextReview timestamp are considered due immediately.
 *
 * @param {MemoryCard} memoryCard - Memory card to inspect
 * @param {Date|string|number} [now=new Date()] - Reference point in time
 * @returns {boolean} True if card is due for review
 */
export function isDue(memoryCard, now = new Date()) {
  if (!memoryCard || !memoryCard.nextReview) {
    return true;
  }
  const target = new Date(memoryCard.nextReview).getTime();
  const current = now instanceof Date ? now.getTime() : new Date(now).getTime();
  return target <= current;
}

/**
 * Filters a list of memory cards down to those that are due,
 * sorted chronologically by nextReview ascending (most overdue first).
 *
 * @param {MemoryCard[]} allMemoryCards - Collection of all memory cards
 * @param {Date|string|number} [now=new Date()] - Reference point in time
 * @returns {MemoryCard[]} Array of due cards sorted by due timestamp
 */
export function getDueCards(allMemoryCards, now = new Date()) {
  if (!Array.isArray(allMemoryCards)) {
    return [];
  }
  return allMemoryCards
    .filter(card => isDue(card, now))
    .sort((a, b) => {
      const timeA = a.nextReview ? new Date(a.nextReview).getTime() : 0;
      const timeB = b.nextReview ? new Date(b.nextReview).getTime() : 0;
      return timeA - timeB;
    });
}

/**
 * Creates a brand new memory card ready for spaced repetition tracking.
 * Initializes with level 0 and makes it immediately due for initial review.
 *
 * @param {string} questionId - Unique concept or question ID
 * @param {string} subject - Subject domain
 * @param {string} topic - Specific topic/concept name
 * @param {{ now?: Date|string|number }} [options={}] - Optional reference date
 * @returns {MemoryCard} Newly initialized card object
 */
export function createMemoryCard(questionId, subject, topic, options = {}) {
  const baseDate = options.now ? new Date(options.now) : new Date();

  return {
    questionId: String(questionId),
    subject: String(subject),
    topic: String(topic),
    level: 0,
    correctCount: 0,
    wrongCount: 0,
    lapseCount: 0,
    lastReviewed: null,
    nextReview: baseDate.toISOString(),
    history: [],
  };
}

/**
 * Updates an existing memory card with the outcome of a review.
 * Adjusts level, interval, counts, lapse count, and appends to the rolling 10-item history.
 *
 * @param {MemoryCard} existingCard - Existing card record
 * @param {number} rating - User rating (0=AGAIN, 1=HARD, 2=GOOD, 3=EASY)
 * @param {boolean} wasCorrect - Whether the user answered correctly
 * @param {{ now?: Date|string|number }} [options={}] - Optional reference date
 * @returns {MemoryCard} New updated memory card object
 */
export function updateMemoryCard(existingCard, rating, wasCorrect, options = {}) {
  const baseDate = options.now ? new Date(options.now) : new Date();
  const currentLevel = existingCard?.level || 0;

  const { nextLevel, intervalDays, nextReviewDate } = getNextReview(currentLevel, rating, { now: baseDate });

  const correct = Boolean(wasCorrect);
  const isLapse = !correct || rating === RATINGS.AGAIN;

  const reviewRecord = {
    rating,
    wasCorrect: correct,
    reviewedAt: baseDate.toISOString(),
    level: nextLevel,
    intervalDays,
  };

  const currentHistory = Array.isArray(existingCard?.history) ? existingCard.history : [];
  const updatedHistory = [...currentHistory, reviewRecord].slice(-10);

  return {
    questionId: existingCard.questionId,
    subject: existingCard.subject,
    topic: existingCard.topic,
    level: nextLevel,
    correctCount: (existingCard.correctCount || 0) + (correct ? 1 : 0),
    wrongCount: (existingCard.wrongCount || 0) + (correct ? 0 : 1),
    lapseCount: (existingCard.lapseCount || 0) + (isLapse ? 1 : 0),
    lastReviewed: baseDate.toISOString(),
    nextReview: nextReviewDate,
    history: updatedHistory,
  };
}
