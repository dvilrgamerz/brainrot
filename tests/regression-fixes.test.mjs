import test from 'node:test';
import assert from 'node:assert/strict';
import { generateMathQuestion, generateMathSession } from '../js/math-engine.js';
import { QUESTIONS } from '../js/questions.js';

test('Regression: Procedural math questions provide q/question and explain/explanation aliases', () => {
  const q = generateMathQuestion('addition', 2, 999);
  assert.ok(q.q, 'Question must have .q property');
  assert.ok(q.question, 'Question must have .question property');
  assert.equal(q.q, q.question);

  assert.ok(q.explain, 'Question must have .explain property');
  assert.ok(q.explanation, 'Question must have .explanation property');
  assert.equal(q.explain, q.explanation);

  assert.equal(q.type, 'short-answer', 'Type must be short-answer');
});

test('Regression: Full math session questions adhere to common curriculum question contract', () => {
  const session = generateMathSession(['addition', 'multiplication', 'percentages'], 2, 10);
  assert.equal(session.length, 10);
  session.forEach((q, idx) => {
    assert.ok(q.id, `Question ${idx} must have an ID`);
    assert.ok(q.q && q.q.length > 5, `Question ${idx} must have non-empty prompt text`);
    assert.ok(Array.isArray(q.answers) && q.answers.length > 0, `Question ${idx} must have valid answers`);
    assert.ok(q.explain && q.explain.length > 0, `Question ${idx} must have explanation`);
  });
});

test('Regression: Curriculum questions in questions.js conform to schema without missing fields', () => {
  QUESTIONS.forEach((q) => {
    assert.ok(q.id, `Missing ID on question: ${JSON.stringify(q)}`);
    assert.ok(q.q && q.q.length > 0, `Missing prompt on question: ${q.id}`);
    assert.ok(q.subject, `Missing subject on question: ${q.id}`);
    assert.ok(q.topic, `Missing topic on question: ${q.id}`);
    assert.ok(q.difficulty >= 1 && q.difficulty <= 5, `Invalid difficulty on question: ${q.id}`);
    assert.ok(q.explain && q.explain.length > 0, `Missing explain on question: ${q.id}`);
  });
});
