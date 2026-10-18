import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getConceptMastery,
  shouldIncreaseDifficulty,
  shouldDecreaseDifficulty,
  getRecommendedDifficulty,
  getPrerequisites,
  selectNextQuestion,
} from '../js/adaptive.js';

test('3+ consecutive correct responses make learner eligible for difficulty increase', () => {
  const mastery3 = { streak: 3, lastResults: [true, true, true] };
  assert.equal(shouldIncreaseDifficulty(mastery3), true);

  const mastery4 = { streak: 4, lastResults: [false, true, true, true, true] };
  assert.equal(shouldIncreaseDifficulty(mastery4), true);
});

test('Fewer than 3 consecutive correct responses are not eligible for difficulty increase', () => {
  const mastery0 = { streak: 0, lastResults: [false] };
  const mastery1 = { streak: 1, lastResults: [true] };
  const mastery2 = { streak: 2, lastResults: [false, true, true] };

  assert.equal(shouldIncreaseDifficulty(mastery0), false);
  assert.equal(shouldIncreaseDifficulty(mastery1), false);
  assert.equal(shouldIncreaseDifficulty(mastery2), false);
});

test('Single correct answer NEVER increases difficulty', () => {
  const singleCorrectMastery = { streak: 1, lastResults: [false, true] };
  assert.equal(shouldIncreaseDifficulty(singleCorrectMastery), false);

  const rec = getRecommendedDifficulty(2, singleCorrectMastery);
  assert.equal(rec, 2, 'Difficulty must remain 2 after only 1 correct response');
});

test('2+ consecutive wrong responses trigger difficulty decrease', () => {
  const mastery2Wrong = { lastResults: [true, false, false] };
  assert.equal(shouldDecreaseDifficulty(mastery2Wrong), true);

  const mastery3Wrong = { lastResults: [false, false, false] };
  assert.equal(shouldDecreaseDifficulty(mastery3Wrong), true);
});

test('Isolated single incorrect response does NOT decrease difficulty', () => {
  const mastery1Wrong = { lastResults: [true, true, false] };
  assert.equal(shouldDecreaseDifficulty(mastery1Wrong), false);

  const interspersed = { lastResults: [false, true, false] };
  assert.equal(shouldDecreaseDifficulty(interspersed), false);
});

test('getRecommendedDifficulty scales up by 1 on eligible mastery', () => {
  const mastery = { streak: 3, lastResults: [true, true, true] };
  assert.equal(getRecommendedDifficulty(2, mastery), 3);
  assert.equal(getRecommendedDifficulty(3, mastery), 4);
});

test('getRecommendedDifficulty scales down by 1 on consecutive failures', () => {
  const mastery = { lastResults: [false, false] };
  assert.equal(getRecommendedDifficulty(4, mastery), 3);
  assert.equal(getRecommendedDifficulty(2, mastery), 1);
});

test('Difficulty is strictly clamped to upper bound 5', () => {
  const mastery = { streak: 5, lastResults: [true, true, true, true, true] };
  assert.equal(getRecommendedDifficulty(5, mastery), 5);
  assert.equal(getRecommendedDifficulty(10, mastery), 5);
});

test('Difficulty is strictly clamped to lower bound 1', () => {
  const mastery = { lastResults: [false, false] };
  assert.equal(getRecommendedDifficulty(1, mastery), 1);
  assert.equal(getRecommendedDifficulty(0, mastery), 1);
});

test('getConceptMastery calculates accuracy, streak, and latency accurately', () => {
  const attempts = [
    { correct: true, ms: 1200 },
    { correct: false, ms: 2500 },
    { correct: true, ms: 1100 },
    { correct: true, ms: 1300 },
  ];

  const mastery = getConceptMastery(attempts);
  assert.equal(mastery.accuracy, 75); // 3 of 4 = 75%
  assert.equal(mastery.streak, 2); // last two are correct
  assert.equal(mastery.avgLatency, Math.round((1200 + 2500 + 1100 + 1300) / 4)); // 1525
  assert.deepEqual(mastery.lastResults, [true, false, true, true]);
});

test('Prerequisite lookup returns valid dependencies for subjects and topics', () => {
  const subPrereqs = getPrerequisites('math', 'subtraction');
  assert.deepEqual(subPrereqs, ['addition']);

  const divPrereqs = getPrerequisites('math', 'division');
  assert.deepEqual(divPrereqs, ['multiplication', 'subtraction']);

  const binPrereqs = getPrerequisites('cs', 'binary');
  assert.deepEqual(binPrereqs, ['hardware']);
});

test('Prerequisite lookup returns empty array for root topics and unknown subjects', () => {
  assert.deepEqual(getPrerequisites('math', 'addition'), []);
  assert.deepEqual(getPrerequisites('nonexistent', 'topic'), []);
  assert.deepEqual(getPrerequisites(null, null), []);
});

test('selectNextQuestion avoids just-answered question when alternatives exist', () => {
  const questions = [
    { id: 'q1', topic: 'addition', difficulty: 1 },
    { id: 'q2', topic: 'subtraction', difficulty: 1 },
    { id: 'q3', topic: 'multiplication', difficulty: 1 },
  ];

  const selected = selectNextQuestion(questions, {}, 1, { lastQuestionId: 'q1' });
  assert.notEqual(selected.id, 'q1', 'Should avoid just-answered question q1');
});

test('selectNextQuestion prioritizes due questions over new or mastered ones', () => {
  const questions = [
    { id: 'q-new', topic: 'addition', difficulty: 2 },
    { id: 'q-due', topic: 'multiplication', difficulty: 2 },
    { id: 'q-regular', topic: 'division', difficulty: 2 },
  ];

  const selected = selectNextQuestion(questions, {}, 2, { dueQuestionIds: ['q-due'] });
  assert.equal(selected.id, 'q-due');
});

test('selectNextQuestion prioritizes weak topics (accuracy < 60%)', () => {
  const questions = [
    { id: 'q-strong', topic: 'addition', difficulty: 2 },
    { id: 'q-weak', topic: 'fractions', difficulty: 2 },
  ];

  const history = {
    addition: { accuracy: 95, streak: 5 },
    fractions: { accuracy: 40, streak: 0 },
  };

  const selected = selectNextQuestion(questions, history, 2);
  assert.equal(selected.id, 'q-weak');
});
