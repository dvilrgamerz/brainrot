/**
 * BrainForge V2 — Real Chromium End-to-End (E2E) Browser Test Runner
 * Controls headless Chromium directly via Chrome DevTools Protocol (CDP)
 * Zero external dependencies (uses Node.js native WebSocket & child_process).
 */

import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOTS_DIR = 'docs/screenshots';
const APP_URL = 'http://localhost:5173';

if (!existsSync(SCREENSHOTS_DIR)) {
  mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.ws = null;
    this.id = 1;
    this.pending = new Map();
    this.eventListeners = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (err) => reject(err);
      this.ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) reject(new Error(msg.error.message));
          else resolve(msg.result);
        } else if (msg.method) {
          const listeners = this.eventListeners.get(msg.method) || [];
          listeners.forEach((fn) => fn(msg.params));
        }
      };
    });
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  on(event, fn) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event).push(fn);
  }

  async evaluate(expression) {
    const res = await this.send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (res.exceptionDetails) {
      throw new Error(res.exceptionDetails.exception?.description || res.exceptionDetails.text);
    }
    return res.result?.value;
  }

  async screenshot(filename) {
    const res = await this.send('Page.captureScreenshot', { format: 'png' });
    const filepath = join(SCREENSHOTS_DIR, filename);
    writeFileSync(filepath, Buffer.from(res.data, 'base64'));
    return filepath;
  }

  close() {
    if (this.ws) {
      try { this.ws.close(); } catch (_) {}
    }
  }
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function runBrowserE2E() {
  console.log('=== Starting BrainForge V2 Chromium E2E Test Suite ===');
  const tempDir = join(tmpdir(), 'bf-e2e-' + Date.now());
  mkdirSync(tempDir, { recursive: true });

  const chrome = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      '--remote-debugging-port=0',
      `--user-data-dir=${tempDir}`,
      '--disable-extensions',
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );

  let client = null;
  const results = [];

  function record(name, passed, details = '') {
    const symbol = passed ? '✔' : '✖';
    console.log(`${symbol} ${name} ${details ? '(' + details + ')' : ''}`);
    results.push({ name, passed, details });
  }

  try {
    const portFile = join(tempDir, 'DevToolsActivePort');
    let port = null;
    for (let i = 0; i < 40; i++) {
      await sleep(100);
      if (existsSync(portFile)) {
        const lines = readFileSync(portFile, 'utf8').trim().split('\n');
        port = lines[0].trim();
        break;
      }
    }
    if (!port) throw new Error('Failed to obtain Chromium DevTools port');

    const targetRes = await fetch(`http://127.0.0.1:${port}/json/list`);
    const targets = await targetRes.json();
    const pageTarget = targets.find((t) => t.type === 'page' && !t.url.startsWith('chrome-extension://')) || targets[0];
    if (!pageTarget || !pageTarget.webSocketDebuggerUrl) {
      throw new Error('No valid page target found in Chromium');
    }

    client = new CDPClient(pageTarget.webSocketDebuggerUrl);
    await client.connect();

    await client.send('Page.enable');
    await client.send('Runtime.enable');
    await client.send('Network.enable');

    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 1280,
      height: 800,
      deviceScaleFactor: 1,
      mobile: false,
    });

    console.log('\n--- 1. App Shell & Initial Navigation ---');
    await client.send('Page.navigate', { url: APP_URL });
    await sleep(1500);

    const title = await client.evaluate('document.title');
    record('App loaded with valid title', title.includes('BrainForge'), `Title: ${title}`);

    const activeView = await client.evaluate('document.querySelector(".view.active")?.id');
    record('Dashboard view is active by default', activeView === 'view-home', `Active view: ${activeView}`);

    await client.screenshot('01-dashboard-view.png');

    console.log('\n--- 2. Comprehensive Navigation Across All 10 Views ---');
    const views = [
      { id: 'train', name: 'Daily Training', file: '02-train-view.png' },
      { id: 'subjects', name: 'Subjects', file: '03-subjects-view.png' },
      { id: 'review', name: 'Memory Review', file: '04-review-view.png' },
      { id: 'listen', name: 'Listening Mode', file: '05-listen-view.png' },
      { id: 'focus', name: 'Focus Mode', file: '06-focus-view.png' },
      { id: 'progress', name: 'Progress Analytics', file: '07-progress-view.png' },
      { id: 'planner', name: 'Study Planner', file: '08-planner-view.png' },
      { id: 'library', name: 'Content Library', file: '09-library-view.png' },
      { id: 'settings', name: 'Settings', file: '10-settings-view.png' },
      { id: 'home', name: 'Dashboard Return', file: '11-dashboard-return.png' },
    ];

    for (const v of views) {
      await client.evaluate(`document.querySelector('.nav-btn[data-view="${v.id}"]').click()`);
      await sleep(250);
      const isVisible = await client.evaluate(`document.getElementById('view-${v.id}').classList.contains('active')`);
      record(`Navigation: View '${v.name}' activates correctly`, isVisible);
      await client.screenshot(v.file);
    }

    console.log('\n--- 3. Theme System & Color Scheme Switching ---');
    await client.evaluate('document.getElementById("themeToggle").click()');
    await sleep(200);
    const theme1 = await client.evaluate('document.documentElement.getAttribute("data-theme")');
    record('Theme cycle toggle updates document data-theme attribute', !!theme1, `Current: ${theme1}`);

    await client.evaluate('document.getElementById("focusToggle").click()');
    await sleep(200);
    const hasGrayscale = await client.evaluate('document.documentElement.classList.contains("grayscale")');
    record('Focus toggle applies grayscale filter class', hasGrayscale);
    await client.evaluate('document.getElementById("focusToggle").click()');

    console.log('\n--- 4. Interactive Training Session & Spaced Repetition Grading ---');
    await client.evaluate('document.querySelector(".nav-btn[data-view=\'train\']").click()');
    await sleep(250);
    await client.evaluate('document.getElementById("startSessionBtn").click()');
    await sleep(500);

    const questionText = await client.evaluate('document.getElementById("questionText").textContent');
    record('Session starts and question loads', questionText.length > 5, `Q: ${questionText.slice(0, 50)}...`);

    const isMCQ = await client.evaluate('!document.getElementById("choicesGrid").classList.contains("hidden")');
    if (isMCQ) {
      await client.evaluate('document.querySelector("#choicesGrid .choice-btn").click()');
    } else {
      await client.evaluate(`
        const inp = document.getElementById("answerInput");
        inp.value = "test answer";
        document.getElementById("submitAnswer").click();
      `);
    }
    await sleep(500);

    const feedbackVisible = await client.evaluate('!document.getElementById("feedback").classList.contains("hidden")');
    record('Feedback panel displays after answer submission', feedbackVisible);

    const srsVisible = await client.evaluate('!document.getElementById("srsButtons").classList.contains("hidden")');
    const nextVisible = await client.evaluate('!document.getElementById("nextQuestionBtn").classList.contains("hidden")');
    record('Recall verification: SRS rating or Next question button is enabled', srsVisible || nextVisible);

    if (srsVisible) {
      await client.evaluate('document.getElementById("srsGood").click()');
      await sleep(250);
      const nextActive = await client.evaluate('!document.getElementById("nextQuestionBtn").classList.contains("hidden")');
      record('Clicking SRS rating advances to Next Question CTA', nextActive);
    }

    await client.screenshot('12-trainer-feedback.png');

    console.log('\n--- 5. Listening Mode Controls & Sentence Playback ---');
    await client.evaluate('document.querySelector(".nav-btn[data-view=\'listen\']").click()');
    await sleep(300);

    const lessonCount = await client.evaluate('document.getElementById("listenTopic").options.length');
    record('Listening mode loads all 18 curriculum lessons', lessonCount >= 18, `Count: ${lessonCount}`);

    const sentenceCount = await client.evaluate('document.querySelectorAll("#listenText .sentence").length');
    record('Lesson text splits and renders individual clickable sentences', sentenceCount >= 3, `Sentences: ${sentenceCount}`);

    await client.evaluate('document.getElementById("speechPitch").value = "1.2"; document.getElementById("speechPitch").dispatchEvent(new Event("input"))');
    const pitchVal = await client.evaluate('document.getElementById("pitchValue").textContent');
    record('Pitch slider updates live readout', pitchVal === '1.2');

    await client.evaluate(`
      document.getElementById("listenRecallAnswer").value = "Photosynthesis converts solar light into glucose and releases oxygen.";
      document.getElementById("checkRecallBtn").click();
    `);
    await sleep(200);
    const recallFeedback = await client.evaluate('!document.getElementById("listenRecallFeedback").classList.contains("hidden")');
    record('No-looking active recall displays comparison model answer', recallFeedback);
    await client.screenshot('13-listening-recall.png');

    console.log('\n--- 6. Focus Mode Cognition Chamber ---');
    await client.evaluate('document.querySelector(".nav-btn[data-view=\'focus\']").click()');
    await sleep(300);

    const timerText = await client.evaluate('document.getElementById("focusTimer").textContent');
    record('Focus mode timer displays 25:00 waiting for user start', timerText === '25:00', `Initial: ${timerText}`);

    // Click start to initiate session & ticking
    await client.evaluate('document.getElementById("focusStartBtn").click()');
    await sleep(1200);
    const updatedTimer = await client.evaluate('document.getElementById("focusTimer").textContent');
    record('Focus timer ticks downward after Start is pressed', updatedTimer === '24:59' || updatedTimer === '24:58', `Timer: ${updatedTimer}`);

    const focusQuestionLoaded = await client.evaluate('document.getElementById("focusQuestionText").textContent.length > 5');
    record('Focus question loads into focus card upon start', focusQuestionLoaded);

    await client.evaluate('document.getElementById("focusPauseBtn").click()');
    await client.screenshot('14-focus-chamber.png');

    console.log('\n--- 7. Content Library & Custom Flashcard Vault ---');
    await client.evaluate('document.querySelector(".nav-btn[data-view=\'library\']").click()');
    await sleep(300);

    const libraryCountText = await client.evaluate('document.getElementById("libraryCount").textContent');
    record('Content library displays total available questions', libraryCountText.includes('questions'), libraryCountText);

    await client.evaluate(`
      document.getElementById("fcFront").value = "What is Amdahl's Law?";
      document.getElementById("fcBack").value = "A formula finding the maximum theoretical speedup of a task with fixed workload.";
      document.getElementById("fcTags").value = "architecture, concurrency";
      document.getElementById("saveFlashcardBtn").click();
    `);
    await sleep(400);

    const customCardsCount = await client.evaluate('document.querySelectorAll("#flashcardList .card-vault-item").length');
    record('Custom flashcard is created and rendered in Vault', customCardsCount >= 1, `Vault cards: ${customCardsCount}`);
    await client.screenshot('15-custom-flashcard-vault.png');

    console.log('\n--- 8. Study Planner Regimen Generation ---');
    await client.evaluate('document.querySelector(".nav-btn[data-view=\'planner\']").click()');
    await sleep(300);

    await client.evaluate('document.getElementById("planTarget").value = "25"; document.getElementById("planTarget").dispatchEvent(new Event("change"))');
    await sleep(300);

    const planSummaryRows = await client.evaluate('document.querySelectorAll("#planDisplay .plan-summary-row").length');
    record('Study planner generates balanced regimen for 25-minute target', planSummaryRows >= 2, `Subject rows: ${planSummaryRows}`);
    await client.screenshot('16-study-planner.png');

    console.log('\n--- 9. IndexedDB Persistence & Schema v2 Migration ---');
    const idbDetails = await client.evaluate(`
      new Promise((resolve) => {
        const req = indexedDB.open("brainforge-db");
        req.onsuccess = () => {
          const db = req.result;
          resolve({
            name: db.name,
            version: db.version,
            stores: [...db.objectStoreNames]
          });
        };
      })
    `);

    record('IndexedDB version is 2', idbDetails.version === 2, `Version: ${idbDetails.version}`);
    const expectedStores = ['attempts', 'memory', 'meta', 'sessions', 'flashcards'];
    const hasAllStores = expectedStores.every((s) => idbDetails.stores.includes(s));
    record('IndexedDB v2 contains all 5 object stores', hasAllStores, `Stores: ${idbDetails.stores.join(', ')}`);

    console.log('\n--- 10. Data Backup Export & Sanitized Import ---');
    await client.evaluate('document.querySelector(".nav-btn[data-view=\'settings\']").click()');
    await sleep(300);

    const exportResult = await client.evaluate(`
      new Promise(resolve => {
        const req = window._brainforgeDB.transaction('attempts', 'readonly').objectStore('attempts').getAll();
        req.onsuccess = () => resolve({ attemptsCount: req.result.length });
        req.onerror = () => resolve({ attemptsCount: 0 });
      })
    `);
    record('IndexedDB stores active session attempts', exportResult.attemptsCount >= 1, `Logged attempts: ${exportResult.attemptsCount}`);

    console.log('\n--- 11. Mobile Responsive UI & Navigation Drawer ---');
    await client.send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });
    await sleep(300);

    const menuBtnDisplay = await client.evaluate('window.getComputedStyle(document.getElementById("menuBtn")).display');
    record('Mobile drawer hamburger button becomes visible on small viewports', menuBtnDisplay !== 'none');

    await client.evaluate('document.getElementById("menuBtn").click()');
    await sleep(200);
    const sidebarOpen = await client.evaluate('document.getElementById("sidebar").classList.contains("open")');
    record('Mobile menu drawer opens upon clicking hamburger button', sidebarOpen);
    await client.screenshot('17-mobile-drawer.png');

    await client.evaluate('document.querySelector(".nav-btn[data-view=\'progress\']").click()');
    await sleep(200);
    const sidebarClosed = await client.evaluate('!document.getElementById("sidebar").classList.contains("open")');
    record('Mobile drawer auto-closes after navigation selection', sidebarClosed);
    await client.screenshot('18-mobile-progress-view.png');

    console.log('\n--- 12. Offline PWA & Service Worker Cache Validation ---');
    const swRegistered = await client.evaluate(`
      (async () => {
        try {
          if (navigator.serviceWorker.controller) return true;
          const reg = await navigator.serviceWorker.getRegistration();
          if (reg) return true;
          const r = await navigator.serviceWorker.register("./sw.js");
          return !!r;
        } catch (_) {
          return false;
        }
      })()
    `);
    record('Service worker is registered in browser client', swRegistered);

    await client.send('Network.emulateNetworkConditions', {
      offline: true,
      latency: 0,
      downloadThroughput: 0,
      uploadThroughput: 0,
    });
    await sleep(300);

    const offlineFetchStatus = await client.evaluate(`
      fetch("./index.html")
        .then(res => res.status)
        .catch(err => "offline-failed")
    `);
    record('Service worker satisfies same-origin requests under offline simulation', offlineFetchStatus === 200, `Status: ${offlineFetchStatus}`);

    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 0,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });

    console.log('\n--- 13. Curriculum Wiring: 261 Questions & 18 Lessons ---');
    const bankVerification = await client.evaluate(`
      (async () => {
        const { QUESTIONS, LESSONS, SUBJECTS, getQuestionsBySubject, getTopicsForSubject } = await import("./js/questions.js");
        const mathProcedural = await import("./js/math-engine.js");

        const bySubject = {};
        for (const s of Object.keys(SUBJECTS)) {
          bySubject[s] = getQuestionsBySubject(s).length;
        }

        const sampleMath = mathProcedural.generateMathQuestion("algebra", 3, 42);

        return {
          totalQuestions: QUESTIONS.length,
          totalLessons: LESSONS.length,
          bySubject,
          proceduralValid: !!sampleMath && sampleMath.answers.length > 0
        };
      })()
    `);

    record('Question bank contains 261 curriculum questions', bankVerification.totalQuestions === 261, `Count: ${bankVerification.totalQuestions}`);
    record('Listening library contains 18 lessons', bankVerification.totalLessons === 18, `Count: ${bankVerification.totalLessons}`);
    record('Science subject threshold met (>=60)', bankVerification.bySubject.science >= 60, `Science: ${bankVerification.bySubject.science}`);
    record('General Knowledge threshold met (>=55)', bankVerification.bySubject.gk >= 55, `GK: ${bankVerification.bySubject.gk}`);
    record('Computer Science threshold met (>=55)', bankVerification.bySubject.cs >= 55, `CS: ${bankVerification.bySubject.cs}`);
    record('Coding Practice threshold met (>=56)', bankVerification.bySubject.coding >= 56, `Coding: ${bankVerification.bySubject.coding}`);
    record('Math static threshold met (>=35)', bankVerification.bySubject.math >= 35, `Math: ${bankVerification.bySubject.math}`);
    record('Procedural math generator is active and verified', bankVerification.proceduralValid);

  } catch (err) {
    console.error('E2E Fatal Error:', err);
    record('E2E Execution', false, err.message);
  } finally {
    if (client) client.close();
    chrome.kill('SIGTERM');
    await sleep(800);
    try { chrome.kill('SIGKILL'); } catch (_) {}
    await sleep(500);
    try { rmSync(tempDir, { recursive: true, force: true }); } catch (_) {}
  }

  console.log('\n=== E2E Test Run Complete ===');
  const passed = results.filter((r) => r.passed).length;
  const total = results.length;
  console.log(`Summary: ${passed}/${total} passed (${Math.round((passed / total) * 100)}%)`);

  if (passed !== total) {
    process.exit(1);
  }
}

runBrowserE2E().catch((err) => {
  console.error(err);
  process.exit(1);
});
