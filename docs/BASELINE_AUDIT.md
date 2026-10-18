# BrainForge V1 — Baseline Audit

**Audited:** 2026-10-17  
**Repository:** https://github.com/dvilrgamerz/brainrot.git  
**Commit:** `8ee6c13`

---

## 1. Existing Capabilities

### Working Features
| Feature | Status | Notes |
|---------|--------|-------|
| Math mental-speed practice | ✅ Working | 5 procedural levels (addition, subtraction, multiplication, percentage) |
| Science active recall | ✅ Working | 7 static questions (photo, cells, physics, chemistry) |
| General Knowledge | ✅ Working | 5 static questions (geography, space, economics) |
| Computer Science | ✅ Working | 6 static questions (hardware, binary, networking, databases) |
| Coding questions | ✅ Working | 5 static questions (Python, JavaScript, logic) |
| Spaced repetition memory queue | ✅ Working | 8-level schedule: 0→1→3→7→14→30→60→90 days |
| Listening Mode (TTS) | ✅ Working | Sentence-by-sentence, speed, voice selection |
| No-looking recall after listening | ✅ Working | Self-graded only |
| IndexedDB persistence | ✅ Working | 3 stores: attempts, memory, meta |
| localStorage settings | ✅ Working | Grayscale, reduce-motion |
| Export/Import JSON backup | ✅ Working | Full data round-trip |
| Grayscale focus mode | ✅ Working | Toggle in topbar + settings |
| Offline PWA caching | ✅ Working | Same-origin, stale-cache purge |
| Responsive mobile UI | ✅ Working | Breakpoints at 980px and 620px |

### Content Inventory
- **Static questions:** 23 total (7 science, 5 GK, 6 CS, 5 coding)
- **Dynamic questions:** Math only (procedurally generated)
- **Listening lessons:** 4 (photosynthesis, RAM vs storage, binary, functions)

---

## 2. Architecture Overview

### File Structure (10 files)
```
index.html          — Single-page app shell (137 lines)
app.js              — All application logic in one IIFE (462 lines)
styles.css          — All styles in one minified file (11 lines, 11KB)
sw.js               — Service worker with cache-first strategy (46 lines)
manifest.webmanifest— PWA manifest (no icons)
netlify.toml        — Netlify deployment config
README.md           — Project documentation
assets/             — SVG banner only
tests/              — 1 test file (service-worker.test.mjs)
.github/workflows/  — CI: syntax check + tests
```

### Data Layer
- **IndexedDB** (`brainforge-db` v1):
  - `attempts` — keyPath: `id` (autoIncrement), fields: questionId, subject, skill, answer, correct, ms, at, day
  - `memory` — keyPath: `questionId`, fields: subject, skill, level, correct, wrong, lastReviewed, nextReview
  - `meta` — keyPath: `key`, stores bestStreak
- **localStorage**: `brainforge-settings-v1` (JSON: grayscale, reduceMotion)

### Spaced Repetition Logic
- Schedule: `[0, 1, 3, 7, 14, 30, 60, 90]` days per level 0–7
- Correct → level + 1 (max 7), interval from `intervalFor(oldLevel, true)`
- Incorrect → level - 1 (min 0), interval = 0 (immediate rescheduling)
- No "Again/Hard/Good/Easy" ratings — binary correct/incorrect only

---

## 3. Bugs and Limitations

### Bugs
1. **Math dynamic questions bypass memory tracking** — `recordAttempt()` is skipped for `dynamic: true` questions, so math never enters the spaced repetition queue
2. **Streak calculation scans all 400 days on every submit** — O(n) scan of all attempts with no index; will slow down as data grows
3. **No input sanitization in innerHTML** — `renderDue()`, `renderSubjectCards()`, `renderMastery()` inject data via `innerHTML` without escaping; XSS risk from imported backups
4. **`todayKey()` uses local timezone but `nextReview` stores UTC ISO strings** — DST changes can cause scheduling mismatches
5. **Duplicate review records possible** — No debounce on submit button; rapid double-click can fire `submitCurrent()` twice before disable takes effect
6. **PWA manifest has no icons** — Install prompt won't show on most browsers

### Limitations
1. **Only 23 static questions** — Far too few for meaningful practice
2. **No difficulty levels** — All questions are flat difficulty
3. **No topic/concept tracking** — Only subject-level stats, not per-concept mastery
4. **No multiple-choice questions** — All questions require typed answers
5. **Answer matching is primitive** — Exact string match (with optional fuzzy for one question)
6. **No session timer or focus mode** — Only grayscale toggle
7. **No study planner** — Hardcoded "20-minute brain workout"
8. **No analytics charts** — Only raw numbers
9. **No custom flashcards** — No user-created content
10. **No dark/light theme toggle** — Dark mode only
11. **Listening mode: no pitch control** — Only speed and voice
12. **No keyboard shortcuts** — No accessibility keyboard navigation
13. **No error boundaries** — If IndexedDB fails, app shows toast but is unusable
14. **Single monolithic file** — All 462 lines of JS in one IIFE, no modules

---

## 4. Risks to Existing Data

| Risk | Mitigation |
|------|------------|
| IndexedDB schema change will lose data | Implement version migration in `onupgradeneeded` |
| Import backup may contain malicious HTML | Escape all user-sourced content before innerHTML |
| localStorage key collision | Keep `brainforge-settings-v1` key; add v2 settings separately |
| V1 question IDs are hardcoded strings | Preserve all V1 question IDs in V2 question bank |
| V1 `memory` store uses `questionId` as key | V2 must keep same keyPath or migrate existing records |

---

## 5. Performance Baseline

- **Total JS:** 26.5 KB (unminified, single file)
- **Total CSS:** 11.2 KB (minified)
- **Total HTML:** 10.9 KB
- **Service worker:** 1.7 KB
- **No external dependencies** — Zero network requests after first load
- **Test suite:** 3 tests, 146ms execution

---

## 6. Testing Gaps

- **No app logic tests** — Only service worker is tested
- **No question validation tests** — `isCorrect()` is untested
- **No spaced repetition tests** — `intervalFor()`, `recordAttempt()` untested
- **No math generation tests** — `mathQuestion()` untested
- **No import/export round-trip tests**
- **No accessibility audit**
- **No mobile interaction tests**

---

## 7. Prioritized Implementation Plan

### Phase 1: Foundation (Preserve V1 + Modularize)
1. Modularize app.js into ES modules
2. Implement IndexedDB v2 migration (preserve all v1 data)
3. Add system-adaptive dark/light theme
4. Fix all V1 bugs (innerHTML XSS, duplicate submits, timezone, math tracking)
5. Add comprehensive unit tests for core engine

### Phase 2: Core Engine
1. Build adaptive difficulty engine with concept-level tracking
2. Expand spaced repetition with Again/Hard/Good/Easy ratings
3. Build question bank architecture (250+ questions across 5 subjects)
4. Implement deterministic answer validation (math equivalence, fuzzy matching)

### Phase 3: Learning Experiences
1. Expand all 5 subjects with 50+ questions each
2. Build multiple-choice + code-tracing question types
3. Enhanced listening mode (pitch, progress indicator, keyboard controls)
4. Focus mode (timer, minimal UI, session management)
5. Study planner (5/10/15/25/45 min targets)

### Phase 4: Dashboard & Analytics
1. Redesign dashboard with real data widgets
2. Build SVG/Canvas charts (accuracy trends, retention, activity)
3. Content library with search and filtering
4. Custom flashcard creation

### Phase 5: Polish & PWA
1. PWA icons and splash screens
2. Keyboard shortcuts and accessibility audit
3. Performance optimization
4. Error boundaries and offline resilience

### Phase 6: Verification
1. Full test suite (unit + integration)
2. CI pipeline expansion
3. Documentation
