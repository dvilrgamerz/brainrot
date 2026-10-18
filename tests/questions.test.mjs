import test from 'node:test';
import assert from 'node:assert/strict';
import {
  SUBJECTS,
  QUESTIONS,
  LESSONS,
  getQuestionsBySubject,
  getQuestionsByTopic,
  getQuestionById,
  getTopicsForSubject
} from '../js/questions.js';

test('Questions bank has 250+ questions and valid schema', () => {
  assert.ok(QUESTIONS.length >= 250, `Expected at least 250 questions, got ${QUESTIONS.length}`);
  
  const ids = new Set();
  for (const q of QUESTIONS) {
    assert.ok(q.id && typeof q.id === 'string', 'Question must have a string id');
    assert.ok(!ids.has(q.id), `Duplicate ID detected: ${q.id}`);
    ids.add(q.id);

    assert.ok(['math', 'science', 'gk', 'cs', 'coding'].includes(q.subject), `Invalid subject: ${q.subject}`);
    assert.ok(q.topic && typeof q.topic === 'string', `Question ${q.id} missing topic`);
    assert.ok(q.subtopic && typeof q.subtopic === 'string', `Question ${q.id} missing subtopic`);
    assert.ok(Number.isInteger(q.difficulty) && q.difficulty >= 1 && q.difficulty <= 5, `Question ${q.id} invalid difficulty`);
    assert.ok(['short-answer', 'mcq', 'code-trace', 'fill-blank'].includes(q.type), `Question ${q.id} invalid type`);
    assert.ok(q.q && typeof q.q === 'string', `Question ${q.id} missing q string`);
    assert.ok(Array.isArray(q.answers) && q.answers.length > 0, `Question ${q.id} missing answers array`);
    assert.ok(q.explain && typeof q.explain === 'string', `Question ${q.id} missing explain`);
    assert.ok(Array.isArray(q.hints), `Question ${q.id} hints must be array`);
    assert.ok(Array.isArray(q.tags), `Question ${q.id} tags must be array`);
    assert.equal(typeof q.fuzzy, 'boolean', `Question ${q.id} fuzzy must be boolean`);
    assert.equal(typeof q.volatile, 'boolean', `Question ${q.id} volatile must be boolean`);
    assert.equal(typeof q.code, 'string', `Question ${q.id} code must be string`);
    assert.ok(q.metadata && typeof q.metadata === 'object', `Question ${q.id} metadata must be object`);

    if (q.type === 'mcq') {
      assert.ok(Array.isArray(q.choices) && q.choices.length >= 2, `MCQ ${q.id} must have >= 2 choices`);
      assert.ok(Number.isInteger(q.correctIndex) && q.correctIndex >= 0 && q.correctIndex < q.choices.length, `MCQ ${q.id} invalid correctIndex`);
    }

    if (q.subject === 'coding') {
      assert.ok(q.code.length > 0, `Coding question ${q.id} must include code snippet in code property`);
    }
  }
});

test('Subject question count thresholds are met', () => {
  const science = getQuestionsBySubject('science');
  const gk = getQuestionsBySubject('gk');
  const cs = getQuestionsBySubject('cs');
  const coding = getQuestionsBySubject('coding');
  const math = getQuestionsBySubject('math');

  assert.ok(science.length >= 50, `Expected science >= 50, got ${science.length}`);
  assert.ok(gk.length >= 50, `Expected gk >= 50, got ${gk.length}`);
  assert.ok(cs.length >= 50, `Expected cs >= 50, got ${cs.length}`);
  assert.ok(coding.length >= 50, `Expected coding >= 50, got ${coding.length}`);
  assert.ok(math.length >= 30, `Expected math >= 30, got ${math.length}`);
});

test('All 23 V1 question IDs are preserved with exact answers', () => {
  const v1Expected = {
    's-photo-in': 'What 3 things go into photosynthesis?',
    's-photo-out': 'What 2 main products come out of photosynthesis?',
    's-chloroplast': 'Where does photosynthesis happen inside a plant cell?',
    's-chlorophyll': 'What green pigment absorbs light for photosynthesis?',
    's-mito': 'Which organelle releases usable energy from food?',
    's-force': 'What is the SI unit of force?',
    's-atom': 'What particle has a negative electric charge?',
    'gk-france': 'What is the capital of France?',
    'gk-ocean': 'What is the largest ocean on Earth?',
    'gk-cont': 'How many continents are commonly taught in the 7-continent model?',
    'gk-moon': 'In what year did humans first land on the Moon?',
    'gk-currency': 'What is inflation?',
    'cs-ram': 'What computer component stores data temporarily while programs are running?',
    'cs-cpu': 'What does CPU stand for?',
    'cs-bit': 'How many possible values can one bit represent?',
    'cs-byte': 'How many bits are in one byte?',
    'cs-http': 'What protocol is commonly used to transfer web pages?',
    'cs-db': 'What language is commonly used to query relational databases?',
    'c-loop': 'Which Python keyword starts a loop over items in a sequence?',
    'c-fn': 'Which Python keyword defines a function?',
    'c-list': 'Which brackets create a Python list?',
    'c-js': 'Which keyword declares a block-scoped variable that can be reassigned in JavaScript?',
    'c-bool': 'What data type has only true and false values?'
  };

  for (const [id, expectedQ] of Object.entries(v1Expected)) {
    const q = getQuestionById(id);
    assert.ok(q, `V1 Question ${id} not found`);
    assert.equal(q.q, expectedQ, `V1 Question ${id} prompt mismatch`);
    assert.ok(q.answers.length > 0, `V1 Question ${id} has no answers`);
  }
});

test('Listening lesson library has 15+ lessons including 4 V1 lessons', () => {
  assert.ok(LESSONS.length >= 15, `Expected >= 15 lessons, got ${LESSONS.length}`);
  
  const v1Lessons = ['photosynthesis', 'computer-memory', 'binary', 'functions'];
  for (const lid of v1Lessons) {
    const lesson = LESSONS.find(l => l.id === lid);
    assert.ok(lesson, `V1 lesson ${lid} not found`);
    assert.ok(lesson.text.length > 20, `V1 lesson ${lid} text too short`);
    assert.ok(lesson.question.length > 5, `V1 lesson ${lid} question too short`);
    assert.ok(lesson.answer.length > 5, `V1 lesson ${lid} answer too short`);
  }
});

test('Helper functions getTopicsForSubject and getQuestionsByTopic work correctly', () => {
  const scienceTopics = getTopicsForSubject('science');
  assert.ok(scienceTopics.length >= 4, `Expected at least 4 science topics, got ${scienceTopics.length}`);
  assert.ok(scienceTopics.includes('Physics'), 'Expected Physics topic in science');
  
  const physicsQuestions = getQuestionsByTopic('science', 'Physics');
  assert.ok(physicsQuestions.length >= 15, `Expected >= 15 physics questions, got ${physicsQuestions.length}`);

  const unknownTopic = getQuestionsByTopic('science', 'NonExistent');
  assert.deepEqual(unknownTopic, []);

  const nullId = getQuestionById('non-existent-id');
  assert.equal(nullId, null);
});
