import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MATH_TOPICS,
  generateMathQuestion,
  generateMathSession,
} from '../js/math-engine.js';
import { validateAnswer } from '../js/validator.js';

test('All 14 topics generate valid questions with expected structure', () => {
  for (const topic of MATH_TOPICS) {
    for (let diff = 1; diff <= 5; diff++) {
      const q = generateMathQuestion(topic, diff, 12345);
      assert.equal(q.subject, 'math');
      assert.equal(q.topic, topic);
      assert.equal(q.difficulty, diff);
      assert.equal(q.dynamic, true);
      assert.equal(typeof q.question, 'string');
      assert.ok(q.question.length > 5);
      assert.ok(Array.isArray(q.answers));
      assert.ok(q.answers.length > 0);
      assert.equal(typeof q.explanation, 'string');
      assert.ok(q.explanation.length > 10);
    }
  }
});

test('Concept IDs are deterministic per topic+difficulty', () => {
  const q1 = generateMathQuestion('multiplication', 3, 100);
  const q2 = generateMathQuestion('multiplication', 3, 200);

  // Both map to the same concept ID for SRS tracking
  assert.equal(q1.id, 'math-multiplication-d3');
  assert.equal(q2.id, 'math-multiplication-d3');
  assert.equal(q1.conceptId, 'math-multiplication-d3');

  const qAdd = generateMathQuestion('addition', 1);
  assert.equal(qAdd.id, 'math-addition-d1');
});

test('Generated questions have valid answers verifiable by validator', () => {
  for (const topic of MATH_TOPICS) {
    const q = generateMathQuestion(topic, 2, 42);
    const primaryAns = q.answers[0];
    const validation = validateAnswer(q, primaryAns);
    assert.equal(validation.correct, true, `Answer for topic ${topic} should validate`);
  }
});

test('Difficulty affects number ranges in addition', () => {
  const d1 = generateMathQuestion('addition', 1, 99);
  const d4 = generateMathQuestion('addition', 4, 99);

  const numD1 = Number(d1.answers[0]);
  const numD4 = Number(d4.answers[0]);

  assert.ok(numD1 <= 20, `d1 sum should be <= 20, got ${numD1}`);
  assert.ok(numD4 >= 200, `d4 sum should be >= 200, got ${numD4}`);
});

test('Difficulty affects number ranges in multiplication', () => {
  const d1 = generateMathQuestion('multiplication', 1, 88);
  const d4 = generateMathQuestion('multiplication', 4, 88);

  const prodD1 = Number(d1.answers[0]);
  const prodD4 = Number(d4.answers[0]);

  assert.ok(prodD1 <= 50, `d1 product should be <= 50, got ${prodD1}`);
  assert.ok(prodD4 >= 150, `d4 product should be >= 150, got ${prodD4}`);
});

test('Division questions never divide by zero and yield integer quotients', () => {
  for (let seed = 1; seed <= 50; seed++) {
    for (let diff = 1; diff <= 5; diff++) {
      const q = generateMathQuestion('division', diff, seed);
      const quotient = Number(q.answers[0]);
      assert.ok(Number.isInteger(quotient));
      assert.ok(quotient > 0);
      assert.ok(!q.question.includes('÷ 0'));
    }
  }
});

test('Fractions questions never have zero denominators', () => {
  for (let seed = 1; seed <= 50; seed++) {
    for (let diff = 1; diff <= 5; diff++) {
      const q = generateMathQuestion('fractions', diff, seed);
      assert.ok(!q.question.includes('/0'));
      for (const ans of q.answers) {
        assert.ok(!ans.includes('/0'));
      }
    }
  }
});

test('Step-by-step explanations are present and well-structured for all questions', () => {
  for (const topic of MATH_TOPICS) {
    const q = generateMathQuestion(topic, 3, 555);
    assert.ok(q.explanation.includes('Step 1:'), `Topic ${topic} should contain Step 1:`);
  }
});

test('Deterministic PRNG: identical seeds produce identical questions', () => {
  const qA1 = generateMathQuestion('algebra', 3, 'seed-xyz');
  const qA2 = generateMathQuestion('algebra', 3, 'seed-xyz');

  assert.equal(qA1.question, qA2.question);
  assert.deepEqual(qA1.answers, qA2.answers);
  assert.equal(qA1.explanation, qA2.explanation);
});

test('generateMathSession generates expected count across requested topics', () => {
  const session = generateMathSession(['addition', 'multiplication'], 2, 6, 777);
  assert.equal(session.length, 6);

  assert.equal(session[0].topic, 'addition');
  assert.equal(session[1].topic, 'multiplication');
  assert.equal(session[2].topic, 'addition');
  assert.equal(session[3].topic, 'multiplication');
});

test('Geometry questions generate valid answers for perimeter, area, and angles', () => {
  const d1 = generateMathQuestion('geometry', 1, 10);
  assert.ok(Number(d1.answers[0]) > 0);

  const d2 = generateMathQuestion('geometry', 2, 10);
  assert.ok(Number(d2.answers[0]) > 0);

  const d5 = generateMathQuestion('geometry', 5, 10);
  const angle = Number(d5.answers[0]);
  assert.ok(angle > 0 && angle < 180, 'Triangle angle must be between 0 and 180');
});
