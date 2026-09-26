# BrainForge 🧠

**Train. Learn. Remember.**

BrainForge is a local-first learning and brain-training web app focused on real recall instead of fake “mark complete” progress.

## V1 features

- Math mental-speed practice
- Science active recall
- GK / general knowledge
- Computer Science fundamentals
- Coding questions
- Spaced-repetition memory queue
- Listening Mode using the browser's built-in Text-to-Speech
- Sentence-by-sentence playback with speed and voice controls
- No-looking recall after listening
- Local progress using IndexedDB
- Local settings using localStorage
- Export / import JSON backups
- Grayscale focus mode
- Offline PWA caching
- Responsive mobile UI

## Memory schedule

Correct recalls move farther apart: today → 1 day → 3 days → 7 days → 14 days → 30 days → 60 days → 90 days.

A missed answer lowers the memory level and brings the concept back sooner.

## Run locally

No build step is required. Clone the repository and serve the folder with any local static server.

Example: `python -m http.server 5173`

Then open `http://localhost:5173`.

Text-to-Speech uses voices installed by your browser/device, so available voices vary by device.

## Data and privacy

BrainForge does not require an account. Progress is stored in IndexedDB on the current browser/device. Settings are stored in localStorage. Use Settings → Export backup if you want a copy of your progress.

Clearing browser site data can erase local progress.

## Project goal

BrainForge is built around active recall, spaced repetition, focused single-task sessions, accuracy before speed, listening plus recall, and real practice instead of completion buttons.

Built as a dependency-free static web app for GitHub Pages, Netlify, Vercel, or any static host.