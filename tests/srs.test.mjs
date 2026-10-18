import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SCHEDULE,
  MAX_LEVEL,
  RATINGS,
  getNextReview,
  isDue,
  getDueCards,
  createMemoryCard,
  updateMemoryCard,
} from '../js/srs.js';

test('AGAIN rating drops level by 2 (clamped to 0) with 0-day interval', () => {
  const res = getNextReview(4, RATINGS.AGAIN);
  assert.equal(res.nextLevel, 2);
  assert.equal(res.intervalDays, 0);

  const resZero = getNextReview(1, RATINGS.AGAIN);
  assert.equal(resZero.nextLevel, 0);
  assert.equal(resZero.intervalDays, 0);
});

test('HARD rating maintains current level and applies 80% schedule interval', () => {
  // Level 3 schedule is 7 days; 7 * 0.8 = 5.6 -> round to 6
  const res3 = getNextReview(3, RATINGS.HARD);
  assert.equal(res3.nextLevel, 3);
  assert.equal(res3.intervalDays, 6);

  // Level 4 schedule is 14 days; 14 * 0.8 = 11.2 -> round to 11
  const res4 = getNextReview(4, RATINGS.HARD);
  assert.equal(res4.nextLevel, 4);
  assert.equal(res4.intervalDays, 11);
});

test('GOOD rating increments level by 1 and assigns schedule[level+1] interval', () => {
  const res = getNextReview(2, RATINGS.GOOD);
  assert.equal(res.nextLevel, 3);
  assert.equal(res.intervalDays, SCHEDULE[3]); // 7
});

test('EASY rating increments level by 2 and assigns schedule[level+2] * 1.3 interval', () => {
  // Level 2 -> Level 4. Schedule[4] = 14. 14 * 1.3 = 18.2 -> round to 18
  const res = getNextReview(2, RATINGS.EASY);
  assert.equal(res.nextLevel, 4);
  assert.equal(res.intervalDays, Math.round(SCHEDULE[4] * 1.3));
});

test('Boundary: Level 0 with AGAIN stays at level 0 and 0 days', () => {
  const res = getNextReview(0, RATINGS.AGAIN);
  assert.equal(res.nextLevel, 0);
  assert.equal(res.intervalDays, 0);
});

test('Boundary: Level 0 with HARD stays at level 0 and 0 days', () => {
  const res = getNextReview(0, RATINGS.HARD);
  assert.equal(res.nextLevel, 0);
  assert.equal(res.intervalDays, 0);
});

test('Boundary: Level 1 with HARD keeps level 1 with min 1 day interval', () => {
  // Schedule[1] = 1. 1 * 0.8 = 0.8 -> round to 1. Min 1 day.
  const res = getNextReview(1, RATINGS.HARD);
  assert.equal(res.nextLevel, 1);
  assert.equal(res.intervalDays, 1);
});

test('Boundary: Level 7 with GOOD is clamped to MAX_LEVEL 7', () => {
  const res = getNextReview(7, RATINGS.GOOD);
  assert.equal(res.nextLevel, 7);
  assert.equal(res.intervalDays, SCHEDULE[7]); // 90
});

test('Boundary: Level 7 with EASY is clamped to MAX_LEVEL 7 and 90 * 1.3 = 117 days', () => {
  const res = getNextReview(7, RATINGS.EASY);
  assert.equal(res.nextLevel, 7);
  assert.equal(res.intervalDays, Math.round(SCHEDULE[7] * 1.3)); // 117
});

test('Boundary: Level 6 with EASY clamps nextLevel to 7', () => {
  const res = getNextReview(6, RATINGS.EASY);
  assert.equal(res.nextLevel, 7);
  assert.equal(res.intervalDays, Math.round(SCHEDULE[7] * 1.3)); // 117
});

test('createMemoryCard initializes card with level 0 and immediate due date', () => {
  const now = new Date('2026-10-18T10:00:00.000Z');
  const card = createMemoryCard('math-add-1', 'math', 'addition', { now });

  assert.equal(card.questionId, 'math-add-1');
  assert.equal(card.subject, 'math');
  assert.equal(card.topic, 'addition');
  assert.equal(card.level, 0);
  assert.equal(card.correctCount, 0);
  assert.equal(card.wrongCount, 0);
  assert.equal(card.lapseCount, 0);
  assert.equal(card.lastReviewed, null);
  assert.equal(card.nextReview, now.toISOString());
  assert.deepEqual(card.history, []);
});

test('isDue correctly detects overdue, current, and future cards', () => {
  const now = new Date('2026-10-18T12:00:00.000Z');

  const overdueCard = { nextReview: '2026-10-18T10:00:00.000Z' };
  const exactCard = { nextReview: '2026-10-18T12:00:00.000Z' };
  const futureCard = { nextReview: '2026-10-18T14:00:00.000Z' };
  const cardWithoutDate = {};

  assert.equal(isDue(overdueCard, now), true);
  assert.equal(isDue(exactCard, now), true);
  assert.equal(isDue(futureCard, now), false);
  assert.equal(isDue(cardWithoutDate, now), true);
});

test('getDueCards filters and sorts cards chronologically by nextReview ascending', () => {
  const now = new Date('2026-10-18T12:00:00.000Z');

  const card1 = { questionId: 'c1', nextReview: '2026-10-18T08:00:00.000Z' };
  const card2 = { questionId: 'c2', nextReview: '2026-10-18T15:00:00.000Z' }; // future, not due
  const card3 = { questionId: 'c3', nextReview: '2026-10-18T04:00:00.000Z' }; // most overdue

  const due = getDueCards([card1, card2, card3], now);

  assert.equal(due.length, 2);
  assert.equal(due[0].questionId, 'c3'); // Earlier time first
  assert.equal(due[1].questionId, 'c1');
});

test('updateMemoryCard updates correctCount and wrongCount correctly', () => {
  const card = createMemoryCard('q1', 'science', 'cells');
  const updated1 = updateMemoryCard(card, RATINGS.GOOD, true);
  assert.equal(updated1.correctCount, 1);
  assert.equal(updated1.wrongCount, 0);

  const updated2 = updateMemoryCard(updated1, RATINGS.AGAIN, false);
  assert.equal(updated2.correctCount, 1);
  assert.equal(updated2.wrongCount, 1);
});

test('updateMemoryCard increments lapseCount on AGAIN rating or incorrect answers', () => {
  const card = {
    questionId: 'q1',
    subject: 'math',
    topic: 'algebra',
    level: 3,
    correctCount: 5,
    wrongCount: 0,
    lapseCount: 0,
    lastReviewed: null,
    nextReview: new Date().toISOString(),
    history: [],
  };

  const lapsed = updateMemoryCard(card, RATINGS.AGAIN, false);
  assert.equal(lapsed.lapseCount, 1);
  assert.equal(lapsed.level, 1); // 3 - 2 = 1

  const lapsed2 = updateMemoryCard(lapsed, RATINGS.AGAIN, true);
  assert.equal(lapsed2.lapseCount, 2); // AGAIN is a lapse even if technically correct
});

test('updateMemoryCard caps history to the 10 most recent reviews', () => {
  let card = createMemoryCard('q-hist', 'math', 'algebra');

  for (let i = 0; i < 15; i++) {
    card = updateMemoryCard(card, RATINGS.GOOD, true, {
      now: new Date(`2026-10-01T${String(i).padStart(2, '0')}:00:00.000Z`),
    });
  }

  assert.equal(card.history.length, 10);
  assert.equal(card.history[9].reviewedAt, '2026-10-01T14:00:00.000Z');
});

test('Multiple consecutive GOOD ratings progressively advance levels up to MAX_LEVEL', () => {
  let card = createMemoryCard('q-prog', 'cs', 'binary');
  assert.equal(card.level, 0);

  const expectedLevels = [1, 2, 3, 4, 5, 6, 7, 7];
  for (const expected of expectedLevels) {
    card = updateMemoryCard(card, RATINGS.GOOD, true);
    assert.equal(card.level, expected);
  }
});

test('Timestamps generated by getNextReview and updateMemoryCard are valid UTC ISO strings', () => {
  const base = new Date('2026-10-18T14:30:00.000Z');
  const review = getNextReview(2, RATINGS.GOOD, { now: base });

  assert.ok(review.nextReviewDate.endsWith('Z'));
  assert.equal(new Date(review.nextReviewDate).toISOString(), review.nextReviewDate);

  const card = createMemoryCard('q-utc', 'gk', 'history', { now: base });
  const updated = updateMemoryCard(card, RATINGS.GOOD, true, { now: base });

  assert.ok(updated.nextReview.endsWith('Z'));
  assert.ok(updated.lastReviewed.endsWith('Z'));
});
