// BrainForge V2 — Main Application Entry Point
// Wires together all modules, handles routing, and initializes the app.

import { openDB, getAll, put, get, clearStore, deleteRecord } from './db.js';
import { QUESTIONS, LESSONS, SUBJECTS, getQuestionById, getTopicsForSubject, getQuestionsByTopic } from './questions.js';
import { getDueCards, updateMemoryCard, createMemoryCard, RATINGS } from './srs.js';
import { validateAnswer } from './validator.js';
import { generateMathQuestion, generateMathSession } from './math-engine.js';
import {
  getConceptMastery, getRecommendedDifficulty, shouldIncreaseDifficulty,
  selectNextQuestion
} from './adaptive.js';
import { escapeHTML, createEl, todayKeyUTC, normalize, debounce, toast, formatDuration, clamp } from './utils.js';

// ── Application State ──────────────────────────────────────────────────
const state = {
  db: null,
  session: [],
  sessionIndex: 0,
  questionStart: 0,
  currentQuestion: null,
  answered: false,
  reviewMode: false,
  listenIndex: 0,
  sentenceIndex: 0,
  speech: null,
  currentView: 'home',
  submitting: false, // debounce submission guard
  sessionStats: { total: 0, correct: 0, times: [] },

  // Focus mode sub-state
  focus: {
    active: false,
    timer: null,
    secondsLeft: 25 * 60,
    totalSeconds: 25 * 60,
    isRunning: false,
    session: [],
    sessionIndex: 0,
    currentQuestion: null,
    answered: false,
    questionStart: 0,
    submitting: false
  }
};

// ── DOM Helpers ────────────────────────────────────────────────────────
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

function setText(selector, text) {
  const el = $(selector);
  if (el) el.textContent = text;
}

function createEmptyState(text) {
  return createEl('div', { className: 'empty-state' }, [document.createTextNode(text)]);
}

// ── Navigation / Routing ───────────────────────────────────────────────
function showView(name) {
  state.currentView = name;
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + name));
  $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.view === name));

  const labels = {
    home: 'Dashboard', train: 'Daily Training', subjects: 'Subjects',
    review: 'Memory Review', listen: 'Listening Mode', focus: 'Focus Mode',
    progress: 'Progress', planner: 'Study Planner', library: 'Content Library',
    settings: 'Settings'
  };
  setText('#pageTitle', labels[name] || 'BrainForge');

  const sidebar = $('#sidebar');
  if (sidebar) sidebar.classList.remove('open');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Stop any active TTS if switching away from listen
  if (name !== 'listen' && typeof speechSynthesis !== 'undefined') {
    speechSynthesis.cancel();
  }

  // Trigger view-specific refreshes
  if (name === 'home') refreshDashboard();
  if (name === 'review') refreshReviewView();
  if (name === 'progress') refreshProgressView();
  if (name === 'subjects') refreshSubjectsView();
  if (name === 'listen') setupListening();
  if (name === 'library') refreshLibraryView();
  if (name === 'planner') refreshPlannerView();
  if (name === 'focus') initFocusView();
}

// ── Theme System ───────────────────────────────────────────────────────
function getThemePref() {
  try {
    const s = JSON.parse(localStorage.getItem('brainforge-settings-v1') || '{}');
    return s.theme || 'system';
  } catch { return 'system'; }
}

function applyTheme(pref) {
  const root = document.documentElement;
  if (pref === 'system') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', pref);
  }
}

function cycleTheme() {
  const order = ['system', 'dark', 'light'];
  const current = getThemePref();
  const next = order[(order.indexOf(current) + 1) % order.length];
  saveSettings({ theme: next });
  applyTheme(next);
  const labels = { system: 'System theme', dark: 'Dark theme', light: 'Light theme' };
  toast(labels[next]);
}

// ── Settings ───────────────────────────────────────────────────────────
const SETTINGS_KEY = 'brainforge-settings-v1';

function settings() {
  try { return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}'); }
  catch { return {}; }
}

function saveSettings(patch) {
  const next = { ...settings(), ...patch };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  applyAllSettings();
}

function applyAllSettings() {
  const s = settings();
  document.documentElement.classList.toggle('grayscale', !!s.grayscale);
  document.documentElement.classList.toggle('reduce-motion', !!s.reduceMotion);
  applyTheme(s.theme || 'system');

  const gs = $('#grayscaleSetting');
  const ms = $('#motionSetting');
  const ts = $('#themeSetting');
  const sl = $('#sessionLengthSetting');
  if (gs) gs.checked = !!s.grayscale;
  if (ms) ms.checked = !!s.reduceMotion;
  if (ts) ts.value = s.theme || 'system';
  if (sl) sl.value = String(s.sessionLength || 10);
}

// ── Dashboard ──────────────────────────────────────────────────────────
async function refreshDashboard() {
  if (!state.db) return;
  const attempts = await getAll('attempts');
  const mem = await getAll('memory');
  const due = getDueCards(mem);
  const today = attempts.filter(a => a.day === todayKeyUTC());
  const correct = attempts.filter(a => a.correct);
  const avg = correct.length
    ? Math.round(correct.reduce((s, a) => s + (a.ms || 0), 0) / correct.length / 100) / 10
    : null;
  const streak = await computeStreak(attempts);
  const best = ((await getAll('meta')).find(x => x.key === 'bestStreak') || {}).value || streak;
  const accuracy = attempts.length ? Math.round(correct.length / attempts.length * 100) : 0;
  const memory = mem.length
    ? Math.round(mem.reduce((s, m) => s + Math.min((m.level || 0) / 5, 1), 0) / mem.length * 100)
    : 0;

  setText('#streakStat', streak + ' day' + (streak === 1 ? '' : 's'));
  setText('#memoryStat', memory + '%');
  setText('#todayStat', today.length + ' question' + (today.length === 1 ? '' : 's'));
  setText('#speedStat', avg ? avg + 's' : '—');
  setText('#dailyRing', Math.min(100, today.length * 10) + '%');
  setText('#overallLevel', String(Math.max(1, Math.floor(correct.length / 25) + 1)));
  setText('#dueCount', due.length + ' concept' + (due.length === 1 ? '' : 's'));

  renderDuePreview(due);
}

function renderDuePreview(due) {
  const list = $('#reviewList');
  const preview = $('#duePreview');
  if (!due.length) {
    if (list) { list.innerHTML = ''; list.appendChild(createEmptyState('Nothing due right now. Practice any subject to build your review schedule.')); }
    if (preview) { preview.innerHTML = ''; preview.appendChild(createEmptyState('No reviews yet. Start a training session.')); }
    return;
  }
  const fragment = document.createDocumentFragment();
  due.slice(0, 8).forEach(m => {
    const q = getQuestionById(m.questionId);
    const title = q ? (q.topic || q.skill || '') : (m.topic || m.questionId);
    const subtitle = q ? q.q : ('Concept: ' + m.questionId);

    const row = createEl('div', { className: 'review-item' });
    const info = createEl('span', {});
    info.appendChild(createEl('b', {}, [document.createTextNode(title)]));
    info.appendChild(createEl('small', {}, [document.createTextNode(subtitle)]));
    row.appendChild(info);
    row.appendChild(createEl('em', {}, [document.createTextNode('Level ' + (m.level || 0))]));
    fragment.appendChild(row);
  });
  if (list) { list.innerHTML = ''; list.appendChild(fragment.cloneNode(true)); }
  if (preview) { preview.innerHTML = ''; preview.appendChild(fragment); }
}

// ── Streak Calculation ─────────────────────────────────────────────────
async function computeStreak(attempts) {
  if (!attempts) attempts = await getAll('attempts');
  const daySet = new Set(attempts.map(a => a.day));
  let streak = 0;
  const cursor = new Date();
  for (let i = 0; i < 400; i++) {
    const key = cursor.toISOString().slice(0, 10);
    if (daySet.has(key)) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else if (i === 0) {
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }
  const meta = await getAll('meta');
  const old = (meta.find(x => x.key === 'bestStreak') || {}).value || 0;
  if (streak > old) {
    await put('meta', { key: 'bestStreak', value: streak });
  }
  return streak;
}

// ── Training Sessions ──────────────────────────────────────────────────
function getSessionQuestionCount() {
  return Number(settings().sessionLength) || 10;
}

function startSession(subject) {
  state.reviewMode = false;
  state.answered = false;
  state.sessionStats = { total: 0, correct: 0, times: [] };
  const targetCount = getSessionQuestionCount();

  let pool;
  if (subject === 'math') {
    state.session = generateMathSession(['addition', 'subtraction', 'multiplication', 'division', 'percentages', 'algebra'], 2, targetCount);
  } else if (!subject || subject === 'mixed') {
    const mathCount = Math.max(2, Math.floor(targetCount * 0.3));
    const otherCount = targetCount - mathCount;
    const mathQs = generateMathSession(['addition', 'multiplication', 'percentages'], 2, mathCount);
    pool = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, otherCount);
    state.session = [...mathQs, ...pool].sort(() => Math.random() - 0.5);
  } else {
    pool = QUESTIONS.filter(q => q.subject === subject).sort(() => Math.random() - 0.5).slice(0, targetCount);
    if (pool.length < targetCount) {
      const extra = generateMathSession(['addition', 'multiplication'], 2, targetCount - pool.length);
      pool = [...pool, ...extra];
    }
    state.session = pool;
  }
  state.sessionIndex = 0;
  showView('train');
  loadQuestion();
}

async function startReview() {
  const mem = await getAll('memory');
  const due = getDueCards(mem);
  const targetCount = getSessionQuestionCount();

  const qs = due.map(m => {
    const found = getQuestionById(m.questionId);
    if (found) return found;
    // For math concept cards
    if (m.questionId.startsWith('math-')) {
      const parts = m.questionId.split('-');
      const topic = parts[1] || 'addition';
      const diff = parseInt(parts[2]?.replace('d', '')) || 2;
      return generateMathQuestion(topic, diff);
    }
    return null;
  }).filter(Boolean);

  if (!qs.length) {
    toast('Nothing due right now — starting mixed practice.');
    startSession('mixed');
    return;
  }
  state.reviewMode = true;
  state.session = qs.slice(0, targetCount);
  state.sessionIndex = 0;
  state.sessionStats = { total: 0, correct: 0, times: [] };
  showView('train');
  loadQuestion();
}

function loadQuestion() {
  const q = state.session[state.sessionIndex];
  if (!q) return;
  state.currentQuestion = q;
  state.questionStart = performance.now();
  state.answered = false;
  state.submitting = false;

  // Reset summary view
  const summaryEl = $('#sessionSummary');
  if (summaryEl) { summaryEl.innerHTML = ''; summaryEl.classList.add('hidden'); }

  setText('#trainerSubject', (SUBJECTS[q.subject]?.name || q.subject).toUpperCase());
  setText('#trainerCounter', (state.sessionIndex + 1) + ' / ' + state.session.length);
  const progress = $('#trainerProgress');
  if (progress) progress.style.width = ((state.sessionIndex / state.session.length) * 100) + '%';
  setText('#questionSkill', (q.topic || q.skill || 'ACTIVE RECALL').toUpperCase());
  setText('#questionText', q.q || q.question);

  // Show code block if question has code
  const codeBlock = $('#codeBlock');
  const codeContainer = $('#codeContainer');
  if (codeContainer) {
    if (q.code) {
      codeContainer.classList.remove('hidden');
      if (codeBlock) codeBlock.textContent = q.code;
    } else {
      codeContainer.classList.add('hidden');
    }
  }

  // Show MCQ choices or text input
  const choicesGrid = $('#choicesGrid');
  const answerForm = $('#answerForm');
  const srsButtons = $('#srsButtons');

  if (q.type === 'mcq' && q.choices) {
    if (choicesGrid) {
      choicesGrid.classList.remove('hidden');
      choicesGrid.innerHTML = '';
      q.choices.forEach((choice, i) => {
        const btn = createEl('button', {
          className: 'choice-btn',
          type: 'button'
        }, [document.createTextNode(choice)]);
        btn.dataset.index = i;
        btn.addEventListener('click', () => selectChoice(i));
        choicesGrid.appendChild(btn);
      });
    }
    if (answerForm) answerForm.classList.add('hidden');
  } else {
    if (choicesGrid) choicesGrid.classList.add('hidden');
    if (answerForm) answerForm.classList.remove('hidden');
    const input = $('#answerInput');
    if (input) { input.value = ''; input.disabled = false; input.focus(); }
    const submit = $('#submitAnswer');
    if (submit) submit.disabled = false;
  }

  // Hide feedback and SRS buttons
  const fb = $('#feedback');
  if (fb) fb.className = 'feedback hidden';
  if (srsButtons) srsButtons.classList.add('hidden');
  const nextBtn = $('#nextQuestionBtn');
  if (nextBtn) nextBtn.classList.add('hidden');
  const startBtn = $('#startSessionBtn');
  if (startBtn) startBtn.classList.add('hidden');
}

function selectChoice(index) {
  if (state.answered || state.submitting) return;
  $$('.choice-btn').forEach((btn, i) => {
    btn.classList.toggle('selected', i === index);
  });
  gradeAnswer(String(index));
}

async function submitTextAnswer(e) {
  if (e) e.preventDefault();
  if (state.answered || state.submitting) return;
  const input = $('#answerInput');
  const answer = input ? input.value.trim() : '';
  if (!answer) return;
  gradeAnswer(answer);
}

async function gradeAnswer(answer) {
  if (state.answered || state.submitting) return;
  state.submitting = true;
  state.answered = true;

  const q = state.currentQuestion;
  const ms = Math.max(50, performance.now() - state.questionStart);

  let result;
  if (q.type === 'mcq') {
    const selected = parseInt(answer);
    result = { correct: selected === q.correctIndex, match: q.choices?.[q.correctIndex] || '' };
  } else {
    result = validateAnswer(q, answer);
  }

  const correct = result.correct;

  // Track session metrics
  state.sessionStats.total++;
  if (correct) state.sessionStats.correct++;
  state.sessionStats.times.push(ms);

  // Record attempt
  await put('attempts', {
    questionId: q.id,
    subject: q.subject,
    skill: q.topic || q.skill || '',
    answer: answer,
    correct: correct,
    ms: ms,
    at: new Date().toISOString(),
    day: todayKeyUTC()
  });

  // Handle memory card staging
  const cardId = q.conceptId || (q.dynamic ? null : q.id);
  if (cardId) {
    const existing = await get('memory', cardId);
    if (existing) {
      state._pendingMemoryCard = existing;
    } else {
      state._pendingMemoryCard = createMemoryCard(cardId, q.subject, q.topic || q.skill || '');
    }
    state._pendingCorrect = correct;
  } else {
    state._pendingMemoryCard = null;
  }

  // Render feedback safely
  const fb = $('#feedback');
  if (fb) {
    fb.className = 'feedback ' + (correct ? 'correct' : 'wrong');
    fb.innerHTML = '';
    const label = createEl('b', {}, [document.createTextNode(correct ? '✓ Correct.' : '✗ Not quite.')]);
    fb.appendChild(label);
    fb.appendChild(document.createTextNode(' ' + (q.explain || '')));
    fb.appendChild(createEl('br'));
    fb.appendChild(createEl('small', {}, [document.createTextNode('Response time: ' + formatDuration(ms))]));
  }

  // Highlight MCQ buttons
  if (q.type === 'mcq') {
    $$('.choice-btn').forEach((btn, i) => {
      if (i === q.correctIndex) btn.classList.add('choice-correct');
      else if (i === parseInt(answer)) btn.classList.add('choice-wrong');
      btn.disabled = true;
    });
  } else {
    const input = $('#answerInput');
    if (input) input.disabled = true;
    const submit = $('#submitAnswer');
    if (submit) submit.disabled = true;
  }

  // Show SRS ratings for concept/static cards
  const srsButtons = $('#srsButtons');
  if (srsButtons && state._pendingMemoryCard) {
    srsButtons.classList.remove('hidden');
  } else {
    const nextBtn = $('#nextQuestionBtn');
    if (nextBtn) nextBtn.classList.remove('hidden');
  }

  const progress = $('#trainerProgress');
  if (progress) progress.style.width = (((state.sessionIndex + 1) / state.session.length) * 100) + '%';

  await computeStreak();
  state.submitting = false;
}

async function rateSRS(rating) {
  if (!state._pendingMemoryCard) return;
  const updated = updateMemoryCard(state._pendingMemoryCard, rating, state._pendingCorrect);
  await put('memory', updated);
  state._pendingMemoryCard = null;

  const srsButtons = $('#srsButtons');
  if (srsButtons) srsButtons.classList.add('hidden');
  const nextBtn = $('#nextQuestionBtn');
  if (nextBtn) nextBtn.classList.remove('hidden');
}

function nextQuestion() {
  if (state._pendingMemoryCard) {
    rateSRS(state._pendingCorrect ? RATINGS.GOOD : RATINGS.AGAIN);
  }

  state.sessionIndex++;
  if (state.sessionIndex >= state.session.length) {
    showSessionComplete();
    return;
  }
  loadQuestion();
}

function showSessionComplete() {
  setText('#questionSkill', 'SESSION COMPLETE');
  setText('#questionText', 'Nice work! Your reps are saved locally.');

  const fb = $('#feedback');
  if (fb) {
    fb.className = 'feedback correct';
    fb.innerHTML = '';
    fb.appendChild(createEl('b', {}, [document.createTextNode('Memory Consolidation Phase: ')]));
    fb.appendChild(document.createTextNode('Rest allows your neural synapses to solidify recalled information. Return tomorrow for spaced intervals.'));
  }

  const input = $('#answerInput');
  if (input) input.disabled = true;
  const submit = $('#submitAnswer');
  if (submit) submit.disabled = true;
  const nextBtn = $('#nextQuestionBtn');
  if (nextBtn) nextBtn.classList.add('hidden');
  const startBtn = $('#startSessionBtn');
  if (startBtn) startBtn.classList.remove('hidden');
  const srsButtons = $('#srsButtons');
  if (srsButtons) srsButtons.classList.add('hidden');
  const choicesGrid = $('#choicesGrid');
  if (choicesGrid) choicesGrid.classList.add('hidden');
  const codeContainer = $('#codeContainer');
  if (codeContainer) codeContainer.classList.add('hidden');

  // Render comprehensive session summary
  const summaryEl = $('#sessionSummary');
  if (summaryEl) {
    summaryEl.innerHTML = '';
    summaryEl.classList.remove('hidden');

    const total = state.sessionStats.total || state.session.length;
    const correct = state.sessionStats.correct;
    const pct = total ? Math.round((correct / total) * 100) : 0;
    const avgMs = state.sessionStats.times.length
      ? Math.round(state.sessionStats.times.reduce((a, b) => a + b, 0) / state.sessionStats.times.length)
      : 0;

    const summaryCard = createEl('div', { className: 'card panel' });
    const title = createEl('h3', {}, [document.createTextNode('Session Performance Report')]);
    summaryCard.appendChild(title);

    const statsGrid = createEl('div', { className: 'stats-grid' });

    const repStat = createEl('article', { className: 'stat card' });
    repStat.appendChild(createEl('span', {}, [document.createTextNode('Reps Completed')]));
    repStat.appendChild(createEl('strong', {}, [document.createTextNode(String(total))]));
    statsGrid.appendChild(repStat);

    const accStat = createEl('article', { className: 'stat card' });
    accStat.appendChild(createEl('span', {}, [document.createTextNode('Accuracy')]));
    accStat.appendChild(createEl('strong', {}, [document.createTextNode(pct + '%')]));
    statsGrid.appendChild(accStat);

    const timeStat = createEl('article', { className: 'stat card' });
    timeStat.appendChild(createEl('span', {}, [document.createTextNode('Avg Speed')]));
    timeStat.appendChild(createEl('strong', {}, [document.createTextNode(formatDuration(avgMs))]));
    statsGrid.appendChild(timeStat);

    summaryCard.appendChild(statsGrid);
    summaryEl.appendChild(summaryCard);
  }

  refreshDashboard();
}

// ── Subjects View ──────────────────────────────────────────────────────
async function refreshSubjectsView() {
  const stats = await subjectStats();
  const grid = $('#subjectGrid');
  if (!grid) return;
  grid.innerHTML = '';
  Object.entries(SUBJECTS).forEach(([key, s]) => {
    const st = stats[key] || { attempts: 0, correct: 0, accuracy: 0 };
    const card = createEl('article', { className: 'card subject-card', 'data-subject': key });
    card.appendChild(createEl('div', { className: 'big-icon' }, [document.createTextNode(s.icon)]));
    card.appendChild(createEl('h3', {}, [document.createTextNode(s.name)]));
    card.appendChild(createEl('p', {}, [document.createTextNode(s.desc)]));
    const meta = createEl('div', { className: 'subject-meta' });
    meta.appendChild(createEl('span', {}, [document.createTextNode(st.attempts + ' attempts')]));
    meta.appendChild(createEl('b', {}, [document.createTextNode(st.accuracy + '%')]));
    card.appendChild(meta);
    card.addEventListener('click', () => startSession(key));
    grid.appendChild(card);
  });
}

async function subjectStats() {
  const attempts = await getAll('attempts');
  const out = {};
  Object.keys(SUBJECTS).forEach(k => out[k] = { attempts: 0, correct: 0, accuracy: 0 });
  attempts.forEach(a => {
    if (!out[a.subject]) return;
    out[a.subject].attempts++;
    if (a.correct) out[a.subject].correct++;
  });
  Object.values(out).forEach(s => s.accuracy = s.attempts ? Math.round((s.correct / s.attempts) * 100) : 0);
  return out;
}

// ── Memory Review View ─────────────────────────────────────────────────
async function refreshReviewView() {
  const mem = await getAll('memory');
  const due = getDueCards(mem);
  setText('#dueCount', due.length + ' concept' + (due.length === 1 ? '' : 's'));
  renderDuePreview(due);
}

// ── Progress View ──────────────────────────────────────────────────────
async function refreshProgressView() {
  const attempts = await getAll('attempts');
  const correct = attempts.filter(a => a.correct);
  const accuracy = attempts.length ? Math.round(correct.length / attempts.length * 100) : 0;
  const streak = await computeStreak(attempts);
  const meta = await getAll('meta');
  const best = (meta.find(x => x.key === 'bestStreak') || {}).value || streak;

  setText('#totalAttempts', String(attempts.length));
  setText('#totalCorrect', String(correct.length));
  setText('#overallAccuracy', accuracy + '%');
  setText('#bestStreak', best + ' day' + (best === 1 ? '' : 's'));

  // Mastery bars
  const stats = await subjectStats();
  const masteryBars = $('#masteryBars');
  if (masteryBars) {
    masteryBars.innerHTML = '';
    Object.entries(SUBJECTS).forEach(([key, s]) => {
      const p = (stats[key] || {}).accuracy || 0;
      const row = createEl('div', { className: 'mastery-row' });
      row.appendChild(createEl('b', {}, [document.createTextNode(s.name)]));
      const bar = createEl('div', { className: 'bar' });
      const fill = createEl('span');
      fill.style.width = p + '%';
      bar.appendChild(fill);
      row.appendChild(bar);
      row.appendChild(createEl('strong', {}, [document.createTextNode(p + '%')]));
      masteryBars.appendChild(row);
    });
  }

  renderActivityChart(attempts);
  renderAccuracyChart(attempts);
  renderRecentMistakes(attempts);
}

function renderActivityChart(attempts) {
  const container = $('#activityChart');
  if (!container) return;
  container.innerHTML = '';

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  const counts = days.map(day => attempts.filter(a => a.day === day).length);
  const max = Math.max(...counts, 1);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 280 120');
  svg.setAttribute('class', 'chart');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Activity over the last 7 days');

  days.forEach((day, i) => {
    const x = 10 + i * 38;
    const h = Math.max(4, (counts[i] / max) * 80);
    const y = 90 - h;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', '28');
    rect.setAttribute('height', h);
    rect.setAttribute('rx', '4');
    rect.setAttribute('class', 'chart-bar');
    svg.appendChild(rect);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x + 14);
    label.setAttribute('y', 105);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'chart-label');
    label.textContent = day.slice(5);
    svg.appendChild(label);

    const countLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    countLabel.setAttribute('x', x + 14);
    countLabel.setAttribute('y', y - 4);
    countLabel.setAttribute('text-anchor', 'middle');
    countLabel.setAttribute('class', 'chart-value');
    countLabel.textContent = counts[i] || '';
    svg.appendChild(countLabel);
  });

  container.appendChild(svg);
}

function renderAccuracyChart(attempts) {
  const container = $('#accuracyChart');
  if (!container) return;
  container.innerHTML = '';

  const subjectKeys = Object.keys(SUBJECTS);
  const data = {};
  subjectKeys.forEach(s => data[s] = { total: 0, correct: 0 });
  attempts.forEach(a => { if (data[a.subject]) { data[a.subject].total++; if (a.correct) data[a.subject].correct++; } });

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 280 120');
  svg.setAttribute('class', 'chart');
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', 'Accuracy by subject');

  subjectKeys.forEach((s, i) => {
    const x = 5 + i * 55;
    const acc = data[s].total ? Math.round(data[s].correct / data[s].total * 100) : 0;
    const h = Math.max(4, acc * 0.8);
    const y = 90 - h;

    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', '45');
    rect.setAttribute('height', h);
    rect.setAttribute('rx', '4');
    rect.setAttribute('class', 'chart-bar');
    svg.appendChild(rect);

    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    label.setAttribute('x', x + 22);
    label.setAttribute('y', 105);
    label.setAttribute('text-anchor', 'middle');
    label.setAttribute('class', 'chart-label');
    label.textContent = SUBJECTS[s].name.slice(0, 5);
    svg.appendChild(label);

    const val = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    val.setAttribute('x', x + 22);
    val.setAttribute('y', y - 4);
    val.setAttribute('text-anchor', 'middle');
    val.setAttribute('class', 'chart-value');
    val.textContent = acc + '%';
    svg.appendChild(val);
  });

  container.appendChild(svg);
}

function renderRecentMistakes(attempts) {
  const container = $('#recentMistakes');
  if (!container) return;
  container.innerHTML = '';

  const mistakes = attempts.filter(a => !a.correct).slice(-10).reverse();
  if (!mistakes.length) {
    container.appendChild(createEmptyState('No mistakes recorded yet. Train to test your limits.'));
    return;
  }

  mistakes.forEach(m => {
    const q = getQuestionById(m.questionId);
    const row = createEl('div', { className: 'review-item' });
    const info = createEl('span');
    info.appendChild(createEl('b', {}, [document.createTextNode(m.skill || '')]));
    info.appendChild(createEl('small', {}, [document.createTextNode(q ? q.q : m.questionId)]));
    row.appendChild(info);
    row.appendChild(createEl('em', {}, [document.createTextNode('Your answer: ' + (m.answer || '—'))]));
    container.appendChild(row);
  });
}

// ── Listening Mode ─────────────────────────────────────────────────────
function setupListening() {
  const topic = $('#listenTopic');
  if (!topic) return;

  if (topic.children.length === 0) {
    LESSONS.forEach((l, i) => {
      const opt = createEl('option', { value: i }, [document.createTextNode(l.subject + ' — ' + l.title)]);
      topic.appendChild(opt);
    });
    topic.addEventListener('change', () => {
      state.listenIndex = Number(topic.value);
      renderLesson();
    });
  }

  renderVoices();
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.onvoiceschanged = renderVoices;
  }
  renderLesson();
}

function renderVoices() {
  if (typeof speechSynthesis === 'undefined') return;
  const voices = speechSynthesis.getVoices();
  const select = $('#voiceSelect');
  if (!select) return;
  select.innerHTML = '';
  if (!voices.length) {
    select.appendChild(createEl('option', {}, [document.createTextNode('Standard Device Voice')]));
    return;
  }
  voices.forEach((v, i) => {
    select.appendChild(createEl('option', { value: i },
      [document.createTextNode(v.name + ' (' + v.lang + ')')]));
  });
}

function splitSentences(text) {
  return text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(s => s.trim()) || [text];
}

function renderLesson() {
  if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel();
  state.sentenceIndex = 0;
  const l = LESSONS[state.listenIndex];
  if (!l) return;

  const listenText = $('#listenText');
  if (listenText) {
    listenText.innerHTML = '';
    listenText.appendChild(createEl('h3', {}, [document.createTextNode(l.title)]));
    const p = createEl('p');
    splitSentences(l.text).forEach((s, i) => {
      const span = createEl('span', { className: 'sentence', 'data-i': i }, [document.createTextNode(s + ' ')]);
      p.appendChild(span);
    });
    listenText.appendChild(p);
  }

  setText('#listenRecallQuestion', l.question);
  const ta = $('#listenRecallAnswer');
  if (ta) ta.value = '';
  const fb = $('#listenRecallFeedback');
  if (fb) fb.className = 'feedback hidden';

  updateListenProgress();
}

function updateListenProgress() {
  const l = LESSONS[state.listenIndex];
  if (!l) return;
  const total = splitSentences(l.text).length;
  const pct = Math.round(((state.sentenceIndex + 1) / total) * 100);
  const progBar = $('#listenProgress');
  if (progBar) progBar.style.width = pct + '%';
  setText('#listenProgressText', 'Sentence ' + (state.sentenceIndex + 1) + ' / ' + total);
}

function speakSentence(index) {
  if (typeof speechSynthesis === 'undefined') {
    toast('Speech synthesis not available in this browser.');
    return;
  }
  speechSynthesis.cancel();
  const l = LESSONS[state.listenIndex];
  if (!l) return;
  const sentences = splitSentences(l.text);
  state.sentenceIndex = clamp(index, 0, sentences.length - 1);

  $$('.sentence').forEach((el, i) => el.classList.toggle('active', i === state.sentenceIndex));
  updateListenProgress();

  const utter = new SpeechSynthesisUtterance(sentences[state.sentenceIndex]);
  const voices = speechSynthesis.getVoices();
  const voiceSelect = $('#voiceSelect');
  const voice = voices[Number(voiceSelect?.value)];
  if (voice) utter.voice = voice;
  utter.rate = Number($('#speechRate')?.value) || 1.0;
  utter.pitch = Number($('#speechPitch')?.value) || 1.0;

  utter.onend = () => {
    if (state.sentenceIndex < sentences.length - 1) {
      speakSentence(state.sentenceIndex + 1);
    }
  };
  state.speech = utter;
  speechSynthesis.speak(utter);
}

function checkListenRecall() {
  const l = LESSONS[state.listenIndex];
  if (!l) return;
  const fb = $('#listenRecallFeedback');
  if (!fb) return;
  fb.className = 'feedback correct';
  fb.innerHTML = '';
  fb.appendChild(createEl('b', {}, [document.createTextNode('Compare with this:')]));
  fb.appendChild(document.createTextNode(' ' + l.answer));
  fb.appendChild(createEl('br'));
  fb.appendChild(createEl('small', {}, [document.createTextNode('Try to explain the idea in your own words, not memorize one sentence.')]));
}

// ── Focus Mode Implementation ──────────────────────────────────────────
function initFocusView() {
  updateFocusTimerDisplay();
  if (!state.focus.session.length) {
    state.focus.session = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 15);
    state.focus.sessionIndex = 0;
    setText('#focusQuestionText', 'Enter the zone. Press Start to initiate focus reps.');
  }
}

function updateFocusTimerDisplay() {
  const mins = Math.floor(state.focus.secondsLeft / 60);
  const secs = state.focus.secondsLeft % 60;
  const formatted = String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
  setText('#focusTimer', formatted);
}

function startFocusTimer() {
  if (state.focus.isRunning) return;
  state.focus.isRunning = true;
  state.focus.timer = setInterval(() => {
    if (state.focus.secondsLeft > 0) {
      state.focus.secondsLeft--;
      updateFocusTimerDisplay();
    } else {
      pauseFocusTimer();
      toast('Focus session timer finished! Take a mindful breather.');
    }
  }, 1000);
}

function pauseFocusTimer() {
  if (!state.focus.isRunning) return;
  state.focus.isRunning = false;
  clearInterval(state.focus.timer);
}

function exitFocusMode() {
  pauseFocusTimer();
  state.focus.active = false;
  document.documentElement.classList.remove('focus-mode');
  showView('home');
}

function startFocusSession() {
  if (!state.focus.session.length) {
    state.focus.session = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 15);
    state.focus.sessionIndex = 0;
  }
  startFocusTimer();
  loadFocusQuestion();
}

function loadFocusQuestion() {
  const q = state.focus.session[state.focus.sessionIndex];
  if (!q) {
    setText('#focusQuestionText', 'Focus session completed! Great reps.');
    $('#focusNextBtn')?.classList.add('hidden');
    return;
  }
  state.focus.currentQuestion = q;
  state.focus.answered = false;
  state.focus.questionStart = performance.now();
  state.focus.submitting = false;

  setText('#focusSubject', (SUBJECTS[q.subject]?.name || q.subject).toUpperCase());
  setText('#focusCounter', 'Question ' + (state.focus.sessionIndex + 1) + ' / ' + state.focus.session.length);
  setText('#focusQuestionText', q.q || q.question);

  const codeContainer = $('#focusCodeBlockContainer');
  const codeBlock = $('#focusCodeBlock');
  if (codeContainer) {
    if (q.code) {
      codeContainer.classList.remove('hidden');
      if (codeBlock) codeBlock.textContent = q.code;
    } else {
      codeContainer.classList.add('hidden');
    }
  }

  const choicesGrid = $('#focusChoicesGrid');
  const answerForm = $('#focusAnswerForm');

  if (q.type === 'mcq' && q.choices) {
    if (choicesGrid) {
      choicesGrid.classList.remove('hidden');
      choicesGrid.innerHTML = '';
      q.choices.forEach((choice, i) => {
        const btn = createEl('button', {
          className: 'choice-btn',
          type: 'button'
        }, [document.createTextNode(choice)]);
        btn.addEventListener('click', () => gradeFocusAnswer(String(i)));
        choicesGrid.appendChild(btn);
      });
    }
    if (answerForm) answerForm.classList.add('hidden');
  } else {
    if (choicesGrid) choicesGrid.classList.add('hidden');
    if (answerForm) answerForm.classList.remove('hidden');
    const input = $('#focusAnswerInput');
    if (input) { input.value = ''; input.disabled = false; input.focus(); }
    const submit = $('#focusSubmitBtn');
    if (submit) submit.disabled = false;
  }

  const fb = $('#focusFeedback');
  if (fb) fb.className = 'feedback hidden';
  const nextBtn = $('#focusNextBtn');
  if (nextBtn) nextBtn.classList.add('hidden');
}

async function gradeFocusAnswer(answer) {
  if (state.focus.answered || state.focus.submitting) return;
  state.focus.submitting = true;
  state.focus.answered = true;

  const q = state.focus.currentQuestion;
  const ms = Math.max(50, performance.now() - state.focus.questionStart);

  let result;
  if (q.type === 'mcq') {
    const selected = parseInt(answer);
    result = { correct: selected === q.correctIndex };
  } else {
    result = validateAnswer(q, answer);
  }

  const correct = result.correct;

  await put('attempts', {
    questionId: q.id,
    subject: q.subject,
    skill: q.topic || q.skill || '',
    answer: answer,
    correct: correct,
    ms: ms,
    at: new Date().toISOString(),
    day: todayKeyUTC()
  });

  const fb = $('#focusFeedback');
  if (fb) {
    fb.className = 'feedback ' + (correct ? 'correct' : 'wrong');
    fb.innerHTML = '';
    fb.appendChild(createEl('b', {}, [document.createTextNode(correct ? '✓ Correct.' : '✗ Not quite.')]));
    fb.appendChild(document.createTextNode(' ' + (q.explain || '')));
  }

  if (q.type === 'mcq') {
    $$('#focusChoicesGrid .choice-btn').forEach((btn, i) => {
      if (i === q.correctIndex) btn.classList.add('choice-correct');
      else if (i === parseInt(answer)) btn.classList.add('choice-wrong');
      btn.disabled = true;
    });
  } else {
    const input = $('#focusAnswerInput');
    if (input) input.disabled = true;
    const submit = $('#focusSubmitBtn');
    if (submit) submit.disabled = true;
  }

  $('#focusNextBtn')?.classList.remove('hidden');
  state.focus.submitting = false;
}

function nextFocusQuestion() {
  state.focus.sessionIndex++;
  loadFocusQuestion();
}

// ── Study Planner ──────────────────────────────────────────────────────
async function refreshPlannerView() {
  const mem = await getAll('memory');
  const due = getDueCards(mem);

  const planTarget = $('#planTarget');
  const targetMinutes = planTarget ? parseInt(planTarget.value) || 15 : 15;
  const questionCount = Math.max(5, Math.floor(targetMinutes * 2));

  const overrideDueOnly = $('#overrideDueOnly')?.checked || false;
  const overrideIncludeMath = $('#overrideIncludeMath')?.checked !== false;
  const overrideHardOnly = $('#overrideHardOnly')?.checked || false;

  const plan = [];

  // Override: include mental math warmup
  if (overrideIncludeMath) {
    const mathWarmup = generateMathSession(['addition', 'multiplication'], overrideHardOnly ? 4 : 2, 3);
    plan.push(...mathWarmup);
  }

  // Due reviews
  const dueQs = due.map(m => getQuestionById(m.questionId)).filter(Boolean);
  const eligibleDue = overrideHardOnly ? dueQs.filter(q => (q.difficulty || 1) >= 3) : dueQs;
  plan.push(...eligibleDue.slice(0, Math.floor(questionCount * 0.5)));

  if (!overrideDueOnly) {
    // Fill remaining with curriculum questions
    let candidatePool = [...QUESTIONS];
    if (overrideHardOnly) candidatePool = candidatePool.filter(q => (q.difficulty || 1) >= 3);

    const remaining = questionCount - plan.length;
    if (remaining > 0) {
      const extra = candidatePool
        .filter(q => !plan.find(p => p.id === q.id))
        .sort(() => Math.random() - 0.5)
        .slice(0, remaining);
      plan.push(...extra);
    }
  }

  // Display plan breakdown
  const planDisplay = $('#planDisplay');
  if (planDisplay) {
    planDisplay.innerHTML = '';
    const summary = {};
    plan.forEach(q => {
      const s = SUBJECTS[q.subject]?.name || q.subject;
      summary[s] = (summary[s] || 0) + 1;
    });

    Object.entries(summary).forEach(([name, count]) => {
      const row = createEl('div', { className: 'plan-summary-row' });
      row.appendChild(createEl('span', {}, [document.createTextNode(name)]));
      row.appendChild(createEl('b', {}, [document.createTextNode(count + ' questions')]));
      planDisplay.appendChild(row);
    });

    const total = createEl('div', { className: 'plan-summary-row plan-total' });
    total.appendChild(createEl('span', {}, [document.createTextNode('Total Planned Reps')]));
    total.appendChild(createEl('b', {}, [document.createTextNode(plan.length + ' questions (~' + Math.round(plan.length / 2) + ' min)')]));
    planDisplay.appendChild(total);
  }

  state.plannedSession = plan;
}

function startPlannedSession() {
  if (!state.plannedSession || !state.plannedSession.length) {
    toast('Generate a plan first.');
    return;
  }
  state.reviewMode = false;
  state.session = state.plannedSession.slice(0, 25);
  state.sessionIndex = 0;
  state.sessionStats = { total: 0, correct: 0, times: [] };
  showView('train');
  loadQuestion();
}

// ── Content Library & Flashcards ───────────────────────────────────────
async function refreshLibraryView() {
  const container = $('#libraryResults');
  if (!container) return;

  const searchInput = $('#librarySearch');
  const subjectFilter = $('#librarySubject');
  const difficultyFilter = $('#libraryDifficulty');
  const topicFilter = $('#filterTopic');
  const typeFilter = $('#filterType');

  const query = (searchInput?.value || '').toLowerCase();
  const subject = subjectFilter?.value || 'all';
  const difficulty = difficultyFilter?.value || 'all';
  const selectedTopic = topicFilter?.value || 'all';
  const selectedType = typeFilter?.value || 'all';

  // Update topics dropdown if needed
  if (topicFilter) {
    const currentVal = topicFilter.value;
    topicFilter.innerHTML = '';
    topicFilter.appendChild(createEl('option', { value: 'all' }, [document.createTextNode('All Topics')]));
    if (subject !== 'all') {
      const topics = getTopicsForSubject(subject);
      topics.forEach(t => {
        const opt = createEl('option', { value: t }, [document.createTextNode(t)]);
        if (t === currentVal) opt.selected = true;
        topicFilter.appendChild(opt);
      });
    }
  }

  let filtered = [...QUESTIONS];
  if (subject !== 'all') filtered = filtered.filter(q => q.subject === subject);
  if (difficulty !== 'all') filtered = filtered.filter(q => q.difficulty === parseInt(difficulty));
  if (selectedTopic !== 'all') filtered = filtered.filter(q => q.topic === selectedTopic);
  if (selectedType !== 'all') {
    if (selectedType === 'recall') filtered = filtered.filter(q => q.type === 'short-answer');
    else if (selectedType === 'mcq') filtered = filtered.filter(q => q.type === 'mcq');
    else if (selectedType === 'code') filtered = filtered.filter(q => q.type === 'code-trace' || !!q.code);
  }
  if (query) {
    filtered = filtered.filter(q =>
      q.q.toLowerCase().includes(query) ||
      (q.topic || '').toLowerCase().includes(query) ||
      (q.explain || '').toLowerCase().includes(query)
    );
  }

  container.innerHTML = '';
  setText('#libraryCount', filtered.length + ' questions');

  filtered.slice(0, 60).forEach(q => {
    const card = createEl('div', { className: 'library-card card' });
    const header = createEl('div', { className: 'library-card-header' });
    header.appendChild(createEl('span', { className: 'chip' }, [document.createTextNode((SUBJECTS[q.subject]?.name || q.subject).toUpperCase())]));
    header.appendChild(createEl('span', { className: 'difficulty-badge diff-' + (q.difficulty || 1) },
      [document.createTextNode('D' + (q.difficulty || 1))]));
    card.appendChild(header);
    card.appendChild(createEl('p', { className: 'library-question' }, [document.createTextNode(q.q)]));
    if (q.topic) {
      card.appendChild(createEl('small', { className: 'library-topic' }, [document.createTextNode(q.topic)]));
    }
    container.appendChild(card);
  });

  if (!filtered.length) {
    container.appendChild(createEmptyState('No questions match your current filters.'));
  }

  // Render Custom Flashcards
  await renderCustomFlashcards();
}

async function renderCustomFlashcards() {
  const listEl = $('#flashcardList');
  if (!listEl) return;
  const cards = await getAll('flashcards');
  listEl.innerHTML = '';

  if (!cards.length) {
    listEl.appendChild(createEmptyState('No custom cards created yet. Create your first card above.'));
    return;
  }

  cards.forEach(card => {
    const row = createEl('div', { className: 'review-item card-vault-item' });
    const content = createEl('div', { className: 'card-vault-content' });
    content.appendChild(createEl('b', {}, [document.createTextNode(card.front)]));
    content.appendChild(createEl('small', {}, [document.createTextNode(card.back)]));
    if (card.tags && card.tags.length) {
      const tagSpan = createEl('small', { className: 'tag-pill' }, [document.createTextNode(card.tags.join(', '))]);
      content.appendChild(tagSpan);
    }
    row.appendChild(content);

    const delBtn = createEl('button', {
      className: 'btn danger btn-sm',
      type: 'button',
      'aria-label': 'Delete card'
    }, [document.createTextNode('Delete')]);
    delBtn.addEventListener('click', async () => {
      await deleteRecord('flashcards', card.id);
      toast('Flashcard deleted.');
      await renderCustomFlashcards();
    });

    row.appendChild(delBtn);
    listEl.appendChild(row);
  });
}

async function handleSaveFlashcard(e) {
  e.preventDefault();
  const front = $('#fcFront')?.value.trim();
  const back = $('#fcBack')?.value.trim();
  const subject = $('#fcSubject')?.value || 'cs';
  const tagsStr = $('#fcTags')?.value || '';

  if (!front || !back) {
    toast('Please provide both front prompt and back answer.');
    return;
  }

  const tags = tagsStr.split(',').map(t => t.trim()).filter(Boolean);
  const card = {
    id: 'fc-' + Date.now() + '-' + Math.random().toString(36).slice(2, 6),
    front: escapeHTML(front),
    back: escapeHTML(back),
    subject,
    tags,
    createdAt: new Date().toISOString()
  };

  await put('flashcards', card);
  toast('Custom flashcard saved to vault!');

  $('#fcFront').value = '';
  $('#fcBack').value = '';
  $('#fcTags').value = '';
  await renderCustomFlashcards();
}

// ── Data Export/Import ─────────────────────────────────────────────────
async function exportData() {
  const payload = {
    version: 2,
    app: 'BrainForge',
    exportedAt: new Date().toISOString(),
    attempts: await getAll('attempts'),
    memory: await getAll('memory'),
    meta: await getAll('meta'),
    flashcards: await getAll('flashcards'),
    settings: settings()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'brainforge-backup-' + todayKeyUTC() + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
  toast('Backup exported.');
}

async function importData(file) {
  try {
    const text = await file.text();
    const data = JSON.parse(text);

    if (!data || typeof data !== 'object') throw new Error('Invalid backup format');
    if (!Array.isArray(data.attempts)) throw new Error('Missing attempts array');
    if (!Array.isArray(data.memory)) throw new Error('Missing memory array');

    for (const a of data.attempts) {
      if (typeof a.questionId !== 'string' && typeof a.questionId !== 'number') {
        throw new Error('Invalid attempt record');
      }
      if (a.answer) a.answer = String(a.answer).slice(0, 1000);
      if (a.skill) a.skill = String(a.skill).slice(0, 200);
    }

    if (!confirm('This will replace your current progress on this device. Continue?')) return;

    await Promise.all(['attempts', 'memory', 'meta'].map(clearStore));
    for (const a of data.attempts) await put('attempts', a);
    for (const m of data.memory) await put('memory', m);
    for (const x of (data.meta || [])) await put('meta', x);
    if (data.flashcards) {
      await clearStore('flashcards');
      for (const f of data.flashcards) await put('flashcards', f);
    }
    if (data.settings) localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings));

    applyAllSettings();
    await refreshDashboard();
    toast('Backup imported successfully.');
  } catch (e) {
    toast('Import failed: ' + (e.message || 'Invalid backup file.'));
    console.error('Import error:', e);
  }
}

async function resetData() {
  if (!confirm('Reset ALL BrainForge progress stored on this device? This cannot be undone.')) return;
  await Promise.all(['attempts', 'memory', 'meta', 'flashcards'].map(clearStore));
  await refreshDashboard();
  toast('All local progress has been reset.');
}

// ── Event Binding ──────────────────────────────────────────────────────
function bindEvents() {
  // Navigation
  $$('.nav-btn').forEach(b => b.addEventListener('click', () => showView(b.dataset.view)));
  $$('[data-jump]').forEach(b => b.addEventListener('click', () => showView(b.dataset.jump)));
  $$('[data-session]').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.session === 'review') startReview();
    else startSession(b.dataset.session);
  }));

  // Dashboard actions
  $('#startDailyBtn')?.addEventListener('click', () => startSession('mixed'));

  // Training
  $('#startSessionBtn')?.addEventListener('click', () => startSession('mixed'));
  $('#answerForm')?.addEventListener('submit', submitTextAnswer);
  $('#nextQuestionBtn')?.addEventListener('click', nextQuestion);

  // Spaced repetition ratings
  $('#srsAgain')?.addEventListener('click', () => rateSRS(RATINGS.AGAIN));
  $('#srsHard')?.addEventListener('click', () => rateSRS(RATINGS.HARD));
  $('#srsGood')?.addEventListener('click', () => rateSRS(RATINGS.GOOD));
  $('#srsEasy')?.addEventListener('click', () => rateSRS(RATINGS.EASY));

  // Review
  $('#startReviewBtn')?.addEventListener('click', startReview);

  // Mobile menu drawer
  $('#menuBtn')?.addEventListener('click', () => $('#sidebar')?.classList.toggle('open'));

  // Topbar toggles
  $('#focusToggle')?.addEventListener('click', () => saveSettings({ grayscale: !settings().grayscale }));
  $('#themeToggle')?.addEventListener('click', cycleTheme);

  // Settings
  $('#grayscaleSetting')?.addEventListener('change', e => saveSettings({ grayscale: e.target.checked }));
  $('#motionSetting')?.addEventListener('change', e => saveSettings({ reduceMotion: e.target.checked }));
  $('#themeSetting')?.addEventListener('change', e => saveSettings({ theme: e.target.value }));
  $('#sessionLengthSetting')?.addEventListener('change', e => saveSettings({ sessionLength: parseInt(e.target.value) || 10 }));

  // Listening controls
  $('#playSpeech')?.addEventListener('click', () => speakSentence(state.sentenceIndex));
  $('#pauseSpeech')?.addEventListener('click', () => {
    if (typeof speechSynthesis === 'undefined') return;
    speechSynthesis.paused ? speechSynthesis.resume() : speechSynthesis.pause();
  });
  $('#prevSentence')?.addEventListener('click', () => speakSentence(state.sentenceIndex - 1));
  $('#nextSentence')?.addEventListener('click', () => speakSentence(state.sentenceIndex + 1));
  $('#repeatSentence')?.addEventListener('click', () => speakSentence(state.sentenceIndex));
  $('#checkRecallBtn')?.addEventListener('click', checkListenRecall);

  // Speech Pitch Slider
  $('#speechPitch')?.addEventListener('input', e => {
    setText('#pitchValue', Number(e.target.value).toFixed(1));
  });

  // Focus mode controls
  $('#focusStartBtn')?.addEventListener('click', startFocusSession);
  $('#focusPauseBtn')?.addEventListener('click', pauseFocusTimer);
  $('#focusExitBtn')?.addEventListener('click', exitFocusMode);
  $('#focusGrayscaleToggle')?.addEventListener('click', () => saveSettings({ grayscale: !settings().grayscale }));
  $('#focusAnswerForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const ans = $('#focusAnswerInput')?.value.trim();
    if (ans) gradeFocusAnswer(ans);
  });
  $('#focusNextBtn')?.addEventListener('click', nextFocusQuestion);

  // Study planner
  $('#planTarget')?.addEventListener('change', refreshPlannerView);
  $('#overrideDueOnly')?.addEventListener('change', refreshPlannerView);
  $('#overrideIncludeMath')?.addEventListener('change', refreshPlannerView);
  $('#overrideHardOnly')?.addEventListener('change', refreshPlannerView);
  $('#startPlanBtn')?.addEventListener('click', startPlannedSession);

  // Library & Flashcards
  $('#librarySearch')?.addEventListener('input', debounce(refreshLibraryView, 250));
  $('#librarySubject')?.addEventListener('change', refreshLibraryView);
  $('#libraryDifficulty')?.addEventListener('change', refreshLibraryView);
  $('#filterTopic')?.addEventListener('change', refreshLibraryView);
  $('#filterType')?.addEventListener('change', refreshLibraryView);
  $('#flashcardForm')?.addEventListener('submit', handleSaveFlashcard);

  // Data management
  $('#exportBtn')?.addEventListener('click', exportData);
  $('#importInput')?.addEventListener('change', e => { if (e.target.files[0]) importData(e.target.files[0]); });
  $('#resetBtn')?.addEventListener('click', resetData);

  // Global Keyboard shortcuts
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
    if (state.currentView === 'listen') {
      if (e.key === ' ') { e.preventDefault(); speakSentence(state.sentenceIndex); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); speakSentence(state.sentenceIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); speakSentence(state.sentenceIndex + 1); }
    }
  });
}

// ── Initialization ─────────────────────────────────────────────────────
async function init() {
  const todayLabel = $('#todayLabel');
  if (todayLabel) {
    todayLabel.textContent = new Intl.DateTimeFormat('en-US', {
      weekday: 'long', month: 'short', day: 'numeric'
    }).format(new Date()).toUpperCase();
  }

  state.db = await openDB();
  window._brainforgeDB = state.db;

  bindEvents();
  applyAllSettings();
  await refreshDashboard();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  console.log('BrainForge V2 online.');
}

init().catch(err => {
  console.error('BrainForge failed to start:', err);
  toast('BrainForge could not initialize local storage. Please reload.');
});
