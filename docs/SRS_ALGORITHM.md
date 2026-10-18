# BrainForge Spaced Repetition Algorithm

## Overview

BrainForge uses a level-based spaced repetition system inspired by the Leitner system.
Each concept starts at Level 0 and progresses through 8 levels with increasing review intervals.

> **Disclaimer:** This is a transparent, deterministic scheduling heuristic — not a
> scientifically optimized algorithm. It provides a solid baseline that can later be
> compared with FSRS or other evidence-based schedulers.

## Schedule

| Level | Interval | Description |
|-------|----------|-------------|
| 0 | 0 days (same day) | New or reset concept |
| 1 | 1 day | First successful recall |
| 2 | 3 days | Short-term retention |
| 3 | 7 days | ~1 week |
| 4 | 14 days | ~2 weeks |
| 5 | 30 days | ~1 month |
| 6 | 60 days | ~2 months |
| 7 | 90 days | ~3 months (maximum) |

## Ratings

After answering a question, the user rates their recall quality:

### Again (Rating 0)
- **Meaning:** Complete failure to recall, or wrong answer.
- **Level change:** `level = max(0, level - 2)`
- **Next interval:** 0 days (reschedule for same day)
- **Lapse count:** Incremented by 1
- **Use when:** You had no idea, guessed wrong, or want to see it again immediately.

### Hard (Rating 1)
- **Meaning:** Recalled with significant difficulty.
- **Level change:** Level stays the same
- **Next interval:** `schedule[level] × 0.8` (minimum 1 day if level > 0)
- **Lapse count:** Unchanged
- **Use when:** You got it right but it took a long time or you almost forgot.

### Good (Rating 2)
- **Meaning:** Normal successful recall with some effort.
- **Level change:** `level = min(level + 1, 7)`
- **Next interval:** `schedule[level + 1]`
- **Lapse count:** Unchanged
- **Use when:** You recalled it correctly with normal effort.

### Easy (Rating 3)
- **Meaning:** Effortless recall, the answer was obvious.
- **Level change:** `level = min(level + 2, 7)`
- **Next interval:** `schedule[min(level + 2, 7)] × 1.3`
- **Lapse count:** Unchanged
- **Use when:** The answer came instantly and you're confident you won't forget.

## Examples

### New card, rated Good
- Before: Level 0
- After: Level 1, next review in 1 day

### Level 3 card, rated Again
- Before: Level 3 (7-day interval)
- After: Level 1, next review today (interval 0)
- Lapse count: +1

### Level 5 card, rated Easy
- Before: Level 5 (30-day interval)
- After: Level 7, next review in 117 days (90 × 1.3)

### Level 2 card, rated Hard
- Before: Level 2 (3-day interval)
- After: Level 2, next review in 2.4 → 3 days (3 × 0.8, rounded up)

## Auto-Rating

If the user does not explicitly rate, the system auto-rates:
- **Correct answer** → Good
- **Incorrect answer** → Again

## Math Concept-Level Tracking

Math questions use **concept-level IDs** (e.g., `math-multiplication-d3`) rather than
unique IDs per generated question. This means:

- One memory card tracks mastery of "2-digit multiplication at difficulty 3"
- Unlimited practice questions can be generated for that concept
- The SRS schedule tracks when to revisit the concept, not individual problems
- This prevents unlimited growth of the memory card database

## Timestamps

- All timestamps are stored as UTC ISO 8601 strings
- `lastReviewed`: When the card was last practiced
- `nextReview`: When the card should next be reviewed
- Due detection: `nextReview <= current UTC time`
- Day boundaries use UTC for consistency across timezones

## Memory Card Schema

```javascript
{
  questionId: "s-photo-in",       // Links to question bank
  subject: "science",
  topic: "Photosynthesis",
  level: 3,                       // Current SRS level (0-7)
  correctCount: 5,                // Lifetime correct answers
  wrongCount: 1,                  // Lifetime incorrect answers
  lapseCount: 0,                  // Times the card was "Again"ed
  lastReviewed: "2024-01-15T...", // UTC ISO string
  nextReview: "2024-01-22T...",   // UTC ISO string
  history: [                      // Last 10 review events
    { rating: 2, correct: true, at: "2024-01-15T..." }
  ]
}
```
