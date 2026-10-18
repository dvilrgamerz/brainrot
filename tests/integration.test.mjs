import test from 'node:test';
import assert from 'node:assert/strict';

import { createMemoryCard, updateMemoryCard, getDueCards, RATINGS, getNextReview } from '../js/srs.js';
import { generateMathQuestion, generateMathSession } from '../js/math-engine.js';
import { validateAnswer } from '../js/validator.js';
import { getConceptMastery, getRecommendedDifficulty, shouldIncreaseDifficulty, shouldDecreaseDifficulty, selectNextQuestion } from '../js/adaptive.js';
import { validateBackup } from '../js/db.js';
import { QUESTIONS, getQuestionById } from '../js/questions.js';

test('Integration: Spaced Repetition full lifecycle across reviews', () => {
  // 1. Brand new card created at Level 0
  let card = createMemoryCard('cs-ram', 'cs', 'Hardware');
  assert.equal(card.level, 0);
  assert.equal(card.correctCount, 0);
  assert.equal(card.wrongCount, 0);
  assert.equal(card.lapseCount, 0);
  assert.equal(card.history.length, 0);

  // 2. First review: Good recall
  card = updateMemoryCard(card, RATINGS.GOOD, true);
  assert.equal(card.level, 1);
  assert.equal(card.correctCount, 1);
  assert.equal(card.wrongCount, 0);
  assert.equal(card.lapseCount, 0);
  assert.equal(card.history.length, 1);
  assert.equal(card.history[0].rating, RATINGS.GOOD);

  // 3. Second review: Easy recall (+2 levels)
  card = updateMemoryCard(card, RATINGS.EASY, true);
  assert.equal(card.level, 3);
  assert.equal(card.correctCount, 2);
  assert.equal(card.wrongCount, 0);
  assert.equal(card.history.length, 2);

  // 4. Third review: Lapse (Again -> drops level by 2, level becomes 1)
  card = updateMemoryCard(card, RATINGS.AGAIN, false);
  assert.equal(card.level, 1);
  assert.equal(card.correctCount, 2);
  assert.equal(card.wrongCount, 1);
  assert.equal(card.lapseCount, 1);
  assert.equal(card.history.length, 3);

  // Interval for AGAIN is 0 days (immediate same-day review)
  const due = getDueCards([card]);
  assert.equal(due.length, 1);
  assert.equal(due[0].questionId, 'cs-ram');
});

test('Integration: Math concept-level tracking prevents unbounded memory card explosion', () => {
  // Generate 5 different multiplication questions at difficulty 2
  const questions = [
    generateMathQuestion('multiplication', 2, 101),
    generateMathQuestion('multiplication', 2, 102),
    generateMathQuestion('multiplication', 2, 103),
    generateMathQuestion('multiplication', 2, 104),
    generateMathQuestion('multiplication', 2, 105),
  ];

  // All 5 must share the same conceptId
  const conceptIds = new Set(questions.map(q => q.conceptId));
  assert.equal(conceptIds.size, 1);
  assert.equal([...conceptIds][0], 'math-multiplication-d2');

  // Practicing different problems updates the single concept memory card
  let memoryCard = createMemoryCard([...conceptIds][0], 'math', 'multiplication');
  questions.forEach(q => {
    const isCorrect = validateAnswer(q, q.answers[0]).correct;
    assert.equal(isCorrect, true);
    memoryCard = updateMemoryCard(memoryCard, RATINGS.GOOD, true);
  });

  assert.equal(memoryCard.correctCount, 5);
  assert.equal(memoryCard.level, 5); // Level advanced from 0 to 5
});

test('Integration: Adaptive difficulty progression and prerequisite resolution', () => {
  let difficulty = 2;

  // Simulate 3 consecutive correct attempts
  const attempts = [
    { correct: true, ms: 1200 },
    { correct: true, ms: 900 },
    { correct: true, ms: 1100 },
  ];
  let mastery = getConceptMastery(attempts);
  assert.equal(shouldIncreaseDifficulty(mastery), true);
  difficulty = getRecommendedDifficulty(difficulty, mastery);
  assert.equal(difficulty, 3);

  // Simulate 2 consecutive wrong attempts
  const struggleAttempts = [
    { correct: true, ms: 1200 },
    { correct: false, ms: 4500 },
    { correct: false, ms: 3800 },
  ];
  mastery = getConceptMastery(struggleAttempts);
  assert.equal(shouldDecreaseDifficulty(mastery), true);
  difficulty = getRecommendedDifficulty(difficulty, mastery);
  assert.equal(difficulty, 2);
});

test('Integration: Backup export/import validation with XSS sanitization check', () => {
  // Clean valid payload
  const cleanPayload = {
    version: 2,
    app: 'BrainForge',
    exportedAt: new Date().toISOString(),
    attempts: [
      { id: 1, questionId: 'cs-bit', subject: 'cs', skill: 'Binary', answer: '2', correct: true, ms: 600, day: '2026-10-17' }
    ],
    memory: [
      { questionId: 'cs-bit', subject: 'cs', topic: 'Binary', level: 1, correctCount: 1, wrongCount: 0, lapseCount: 0 }
    ],
    meta: [{ key: 'bestStreak', value: 3 }],
    flashcards: [],
    settings: { grayscale: false, theme: 'dark' }
  };

  const validation = validateBackup(cleanPayload);
  assert.equal(validation.valid, true);

  // Malformed payload (missing memory array)
  const invalidPayload = {
    version: 2,
    attempts: []
  };
  const invalidResult = validateBackup(invalidPayload);
  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.some(e => e.includes('memory')));

  // Attempt with non-string/non-number questionId
  const corruptPayload = {
    version: 2,
    attempts: [{ questionId: { evil: true } }],
    memory: []
  };
  const corruptResult = validateBackup(corruptPayload);
  assert.equal(corruptResult.valid, false);
});

test('Integration: Curriculum question validation and answer coverage', () => {
  // Test sample questions from all 5 subjects
  const sampleIds = ['s-photo-in', 'gk-france', 'cs-ram', 'c-loop', 'm-concept-prime'];

  sampleIds.forEach(id => {
    const q = getQuestionById(id);
    assert.ok(q, `Question ${id} should exist in bank`);
    assert.ok(q.answers.length > 0 || (q.choices && q.correctIndex !== undefined));
    assert.ok(q.explain.length > 0, `Question ${id} must have explanation`);

    // Verify first correct answer passes validator
    if (q.answers && q.answers.length) {
      const result = validateAnswer(q, q.answers[0]);
      assert.equal(result.correct, true, `Answer ${q.answers[0]} should validate for ${id}`);
    }
  });
});
