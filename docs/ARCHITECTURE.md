# BrainForge V2 — Architecture

## Overview

BrainForge V2 is a dependency-free, static, local-first web application for learning and
memory training. It runs entirely in the browser with no server, no accounts, no analytics
trackers, and no external API calls.

## Module Structure

```
js/
├── app.js          Entry point, routing, state management, event binding
├── db.js           IndexedDB wrapper with v1→v2 migration
├── questions.js    Complete question bank (250+) and listening lessons
├── math-engine.js  Procedural math question generator
├── srs.js          Spaced repetition scheduler
├── adaptive.js     Adaptive difficulty engine
├── validator.js    Answer validation (exact, numeric, fuzzy, MCQ)
├── utils.js        Shared utilities (escapeHTML, DOM, dates, toast)
├── trainer.js      (Future) Training session controller
├── review.js       (Future) Memory review controller
├── listen.js       (Future) Listening mode controller
├── analytics.js    (Future) Analytics and chart rendering
├── planner.js      (Future) Study planner logic
├── focus.js        (Future) Focus mode controller
├── library.js      (Future) Content library and flashcard manager
└── settings.js     (Future) Settings management
```

## Data Flow

```
User Action → app.js → validator.js → db.js → IndexedDB
                ↕              ↕
           srs.js ←→ adaptive.js
                ↕
          math-engine.js ← questions.js
```

## IndexedDB Schema (v2)

### `attempts` store
- **keyPath:** `id` (autoIncrement)
- **Indexes:** `day`
- Records every answer attempt with questionId, subject, skill, answer text,
  correct boolean, response time (ms), UTC timestamp, and UTC day key.

### `memory` store
- **keyPath:** `questionId`
- **Indexes:** `nextReview`, `subject`
- Tracks SRS state for each concept: level, correct/wrong counts, lapse count,
  last reviewed and next review timestamps, and review history.

### `meta` store
- **keyPath:** `key`
- Key-value store for app metadata (bestStreak, etc.)

### `sessions` store (v2 new)
- **keyPath:** `id` (autoIncrement)
- Records completed study sessions with start/end times, question count,
  accuracy, and subjects covered.

### `flashcards` store (v2 new)
- **keyPath:** `id`
- User-created flashcards with front, back, tags, and creation date.

## Security

- **No innerHTML with user data:** All dynamic content uses `textContent` or
  the safe `createEl()` helper from utils.js.
- **Import validation:** Backup files are validated for required fields and
  structure before importing. String fields are length-limited.
- **No eval/Function:** Answer validation never evaluates user input as code.
- **No external requests:** The app makes zero network requests after initial load.
- **CSP-compatible:** No inline scripts or styles.

## Backward Compatibility

- All V1 question IDs are preserved in the V2 question bank.
- V1 IndexedDB data is automatically migrated to v2 schema without loss.
- V1 localStorage settings key is preserved.
- V1 export backups can be imported into V2.

## PWA

- Service worker caches all application shell files.
- Stale-while-revalidate for core assets.
- Network-first for navigation requests with offline fallback.
- SVG icons for install prompt support.
