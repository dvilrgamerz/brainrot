/**
 * BrainForge V2 - Procedural Math Question Engine
 * Generates verified, deterministic procedural math questions across 14 topics and 5 difficulty levels.
 * Questions map to concept-level IDs for Spaced Repetition tracking (e.g. "math-multiplication-d3").
 * Guaranteed zero division by zero and zero eval().
 * @module math-engine
 */

import { clamp } from './utils.js';

/**
 * List of all 14 supported math topics.
 * @type {readonly string[]}
 */
export const MATH_TOPICS = Object.freeze([
  'addition',
  'subtraction',
  'multiplication',
  'division',
  'fractions',
  'decimals',
  'percentages',
  'ratios',
  'algebra',
  'exponents',
  'roots',
  'geometry',
  'trigonometry',
  'mental-calc',
]);

/**
 * Creates a deterministic pseudo-random number generator (Mulberry32).
 * Falls back to Math.random if seed is null/undefined.
 *
 * @param {number|string|null} [seed=null]
 * @returns {() => number} Returns float in [0, 1)
 */
function createRng(seed = null) {
  if (seed == null) {
    return Math.random;
  }

  let s = 0;
  if (typeof seed === 'number') {
    s = seed | 0;
  } else {
    const str = String(seed);
    for (let i = 0; i < str.length; i++) {
      s = (Math.imul(31, s) + str.charCodeAt(i)) | 0;
    }
  }

  return function () {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Returns a random integer between min and max (inclusive) using provided RNG.
 * @param {() => number} rng
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
function randInt(rng, min, max) {
  const low = Math.ceil(min);
  const high = Math.floor(max);
  return Math.floor(rng() * (high - low + 1)) + low;
}

/**
 * Computes greatest common divisor (GCD).
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

/**
 * Topic question builders mapping topic and difficulty to questions.
 * @type {Record<string, (diff: number, rng: () => number) => { subtopic: string, question: string, answers: string[], explanation: string }>}
 */
const GENERATORS = {
  addition(diff, rng) {
    let a, b, c;
    switch (diff) {
      case 1:
        a = randInt(rng, 1, 9);
        b = randInt(rng, 1, 9);
        return {
          subtopic: 'Single-digit addition',
          question: `What is ${a} + ${b}?`,
          answers: [String(a + b)],
          explanation: `Step 1: Add ${a} and ${b}.\n${a} + ${b} = ${a + b}.`,
        };
      case 2:
        a = randInt(rng, 15, 45);
        b = randInt(rng, 10, 35);
        return {
          subtopic: 'Two-digit addition without large regrouping',
          question: `What is ${a} + ${b}?`,
          answers: [String(a + b)],
          explanation: `Step 1: Add tens (${Math.floor(a / 10) * 10} + ${Math.floor(b / 10) * 10} = ${(Math.floor(a / 10) + Math.floor(b / 10)) * 10}).\nStep 2: Add units (${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}).\nTotal = ${a + b}.`,
        };
      case 3:
        a = randInt(rng, 48, 98);
        b = randInt(rng, 36, 89);
        return {
          subtopic: 'Two-digit addition with regrouping',
          question: `What is ${a} + ${b}?`,
          answers: [String(a + b)],
          explanation: `Step 1: Align digits vertically.\nStep 2: Add units ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}, carry over to tens.\nStep 3: Combine with tens to get ${a + b}.`,
        };
      case 4:
        a = randInt(rng, 150, 480);
        b = randInt(rng, 120, 450);
        return {
          subtopic: 'Three-digit addition',
          question: `What is ${a} + ${b}?`,
          answers: [String(a + b)],
          explanation: `Step 1: Add hundreds: ${Math.floor(a / 100) * 100} + ${Math.floor(b / 100) * 100} = ${(Math.floor(a / 100) + Math.floor(b / 100)) * 100}.\nStep 2: Add remaining parts: ${a % 100} + ${b % 100} = ${(a % 100) + (b % 100)}.\nSum = ${a + b}.`,
        };
      case 5:
      default:
        a = randInt(rng, 1200, 4500);
        b = randInt(rng, 1100, 3800);
        c = randInt(rng, 150, 950);
        return {
          subtopic: 'Multi-operand large addition',
          question: `What is ${a} + ${b} + ${c}?`,
          answers: [String(a + b + c)],
          explanation: `Step 1: Add first two terms: ${a} + ${b} = ${a + b}.\nStep 2: Add the third term: ${a + b} + ${c} = ${a + b + c}.`,
        };
    }
  },

  subtraction(diff, rng) {
    let a, b;
    switch (diff) {
      case 1:
        b = randInt(rng, 1, 8);
        a = randInt(rng, b + 1, 10);
        return {
          subtopic: 'Single-digit subtraction',
          question: `What is ${a} - ${b}?`,
          answers: [String(a - b)],
          explanation: `Step 1: Subtract ${b} from ${a}.\n${a} - ${b} = ${a - b}.`,
        };
      case 2:
        b = randInt(rng, 10, 25);
        a = randInt(rng, b + 10, 60);
        return {
          subtopic: 'Two-digit subtraction',
          question: `What is ${a} - ${b}?`,
          answers: [String(a - b)],
          explanation: `Step 1: Subtract tens: ${a} - ${Math.floor(b / 10) * 10} = ${a - Math.floor(b / 10) * 10}.\nStep 2: Subtract units to arrive at ${a - b}.`,
        };
      case 3:
        b = randInt(rng, 28, 59);
        a = randInt(rng, b + 15, 99);
        return {
          subtopic: 'Two-digit subtraction with regrouping',
          question: `What is ${a} - ${b}?`,
          answers: [String(a - b)],
          explanation: `Step 1: Borrow from tens place to subtract units.\nStep 2: Complete tens subtraction.\nResult = ${a - b}.`,
        };
      case 4:
        b = randInt(rng, 120, 380);
        a = randInt(rng, b + 50, 890);
        return {
          subtopic: 'Three-digit subtraction',
          question: `What is ${a} - ${b}?`,
          answers: [String(a - b)],
          explanation: `Step 1: Subtract hundreds, tens, and units systematically.\n${a} - ${b} = ${a - b}.`,
        };
      case 5:
      default:
        // Subtraction from thousands
        a = randInt(rng, 2, 8) * 1000;
        b = randInt(rng, 150, 850);
        return {
          subtopic: 'Subtraction across zeroes',
          question: `What is ${a} - ${b}?`,
          answers: [String(a - b)],
          explanation: `Step 1: Decompose ${a} into ${a - 1000} + 1000.\nStep 2: Calculate 1000 - ${b} = ${1000 - b}.\nStep 3: Combine with remaining thousands: ${a - 1000} + ${1000 - b} = ${a - b}.`,
        };
    }
  },

  multiplication(diff, rng) {
    let a, b;
    switch (diff) {
      case 1:
        a = randInt(rng, 2, 5);
        b = randInt(rng, 2, 9);
        return {
          subtopic: 'Basic multiplication tables (2-5)',
          question: `What is ${a} × ${b}?`,
          answers: [String(a * b)],
          explanation: `Step 1: Multiply ${a} by ${b}.\n${a} × ${b} = ${a * b}.`,
        };
      case 2:
        a = randInt(rng, 6, 12);
        b = randInt(rng, 6, 12);
        return {
          subtopic: 'Multiplication tables (6-12)',
          question: `What is ${a} × ${b}?`,
          answers: [String(a * b)],
          explanation: `Step 1: Recall the multiplication table for ${a}.\n${a} × ${b} = ${a * b}.`,
        };
      case 3:
        a = randInt(rng, 14, 35);
        b = randInt(rng, 3, 9);
        return {
          subtopic: 'Two-digit by one-digit multiplication',
          question: `What is ${a} × ${b}?`,
          answers: [String(a * b)],
          explanation: `Step 1: Multiply tens: ${Math.floor(a / 10) * 10} × ${b} = ${Math.floor(a / 10) * 10 * b}.\nStep 2: Multiply units: ${a % 10} × ${b} = ${(a % 10) * b}.\nStep 3: Add results: ${Math.floor(a / 10) * 10 * b} + ${(a % 10) * b} = ${a * b}.`,
        };
      case 4:
        a = randInt(rng, 14, 36);
        b = randInt(rng, 11, 24);
        return {
          subtopic: 'Two-digit by two-digit multiplication',
          question: `What is ${a} × ${b}?`,
          answers: [String(a * b)],
          explanation: `Step 1: Distribute ${a} × (${Math.floor(b / 10) * 10} + ${b % 10}).\nStep 2: ${a} × ${Math.floor(b / 10) * 10} = ${a * Math.floor(b / 10) * 10}.\nStep 3: ${a} × ${b % 10} = ${a * (b % 10)}.\nSum = ${a * b}.`,
        };
      case 5:
      default:
        a = randInt(rng, 105, 250);
        b = randInt(rng, 12, 35);
        return {
          subtopic: 'Three-digit by two-digit multiplication',
          question: `What is ${a} × ${b}?`,
          answers: [String(a * b)],
          explanation: `Step 1: Multiply ${a} by the ones digit of ${b} (${b % 10}): ${a * (b % 10)}.\nStep 2: Multiply ${a} by the tens digit of ${b} (${Math.floor(b / 10) * 10}): ${a * Math.floor(b / 10) * 10}.\nStep 3: Add partial products: ${a * b}.`,
        };
    }
  },

  division(diff, rng) {
    let divisor, quotient, dividend;
    switch (diff) {
      case 1:
        divisor = randInt(rng, 2, 5);
        quotient = randInt(rng, 2, 6);
        dividend = divisor * quotient;
        return {
          subtopic: 'Basic division facts',
          question: `What is ${dividend} ÷ ${divisor}?`,
          answers: [String(quotient)],
          explanation: `Step 1: Think of multiplication: ${divisor} × ? = ${dividend}.\nStep 2: ${divisor} × ${quotient} = ${dividend}, so ${dividend} ÷ ${divisor} = ${quotient}.`,
        };
      case 2:
        divisor = randInt(rng, 6, 10);
        quotient = randInt(rng, 4, 12);
        dividend = divisor * quotient;
        return {
          subtopic: 'Division facts within 100',
          question: `What is ${dividend} ÷ ${divisor}?`,
          answers: [String(quotient)],
          explanation: `Step 1: Determine how many times ${divisor} fits into ${dividend}.\nStep 2: ${dividend} ÷ ${divisor} = ${quotient}.`,
        };
      case 3:
        divisor = randInt(rng, 6, 12);
        quotient = randInt(rng, 12, 30);
        dividend = divisor * quotient;
        return {
          subtopic: 'Two-digit quotient division',
          question: `What is ${dividend} ÷ ${divisor}?`,
          answers: [String(quotient)],
          explanation: `Step 1: Divide hundreds/tens, then units.\nStep 2: ${dividend} ÷ ${divisor} = ${quotient}.`,
        };
      case 4:
        divisor = randInt(rng, 4, 9);
        quotient = randInt(rng, 35, 95);
        dividend = divisor * quotient;
        return {
          subtopic: 'Three-digit dividend division',
          question: `What is ${dividend} ÷ ${divisor}?`,
          answers: [String(quotient)],
          explanation: `Step 1: Long division with 1-digit divisor.\nStep 2: ${dividend} ÷ ${divisor} = ${quotient}.`,
        };
      case 5:
      default:
        divisor = randInt(rng, 12, 25);
        quotient = randInt(rng, 15, 55);
        dividend = divisor * quotient;
        return {
          subtopic: 'Two-digit divisor division',
          question: `What is ${dividend} ÷ ${divisor}?`,
          answers: [String(quotient)],
          explanation: `Step 1: Estimate quotient digits for divisor ${divisor}.\nStep 2: ${dividend} ÷ ${divisor} = ${quotient}.`,
        };
    }
  },

  fractions(diff, rng) {
    let den, num1, num2, num, d;
    switch (diff) {
      case 1:
        // Like denominators addition
        den = randInt(rng, 4, 8);
        num1 = randInt(rng, 1, 2);
        num2 = randInt(rng, 1, den - num1 - 1);
        num = num1 + num2;
        d = gcd(num, den);
        return {
          subtopic: 'Addition of like fractions',
          question: `What is ${num1}/${den} + ${num2}/${den}? (Simplify if possible)`,
          answers: [
            `${num / d}/${den / d}`,
            `${num}/${den}`,
            String((num / den)),
          ],
          explanation: `Step 1: Add numerators since denominators are the same: ${num1} + ${num2} = ${num}.\nStep 2: Fraction is ${num}/${den}.\nStep 3: Simplify by dividing by ${d}: ${num / d}/${den / d}.`,
        };
      case 2:
        // Simplifying fractions
        const factor = randInt(rng, 2, 5);
        const simpNum = randInt(rng, 1, 4);
        const simpDen = randInt(rng, simpNum + 1, 6);
        const fullNum = simpNum * factor;
        const fullDen = simpDen * factor;
        return {
          subtopic: 'Simplifying fractions to lowest terms',
          question: `Simplify the fraction ${fullNum}/${fullDen} to lowest terms:`,
          answers: [`${simpNum}/${simpDen}`, String(simpNum / simpDen)],
          explanation: `Step 1: Find GCD of ${fullNum} and ${fullDen}, which is ${factor}.\nStep 2: Divide numerator and denominator by ${factor}: ${simpNum}/${simpDen}.`,
        };
      case 3:
        // Unlike denominators: 1/a + 1/b
        const d1 = randInt(rng, 2, 4);
        const d2 = randInt(rng, 3, 5);
        const commonDen = (d1 * d2) / gcd(d1, d2);
        const totalNum = (commonDen / d1) + (commonDen / d2);
        const g3 = gcd(totalNum, commonDen);
        return {
          subtopic: 'Addition of unit fractions with unlike denominators',
          question: `What is 1/${d1} + 1/${d2}? (Write as fraction)`,
          answers: [
            `${totalNum / g3}/${commonDen / g3}`,
            `${totalNum}/${commonDen}`,
            String(totalNum / commonDen),
          ],
          explanation: `Step 1: Find common denominator for ${d1} and ${d2}: ${commonDen}.\nStep 2: Rewrite fractions: ${commonDen / d1}/${commonDen} + ${commonDen / d2}/${commonDen} = ${totalNum}/${commonDen}.\nStep 3: Simplify to ${totalNum / g3}/${commonDen / g3}.`,
        };
      case 4:
        // Fraction multiplication: (a/b) * (c/d)
        const a4 = randInt(rng, 1, 3);
        const b4 = randInt(rng, 3, 5);
        const c4 = randInt(rng, 1, 3);
        const d4 = randInt(rng, 3, 5);
        const multNum = a4 * c4;
        const multDen = b4 * d4;
        const g4 = gcd(multNum, multDen);
        return {
          subtopic: 'Fraction multiplication',
          question: `What is (${a4}/${b4}) × (${c4}/${d4})? (Write as fraction)`,
          answers: [
            `${multNum / g4}/${multDen / g4}`,
            `${multNum}/${multDen}`,
            String(multNum / multDen),
          ],
          explanation: `Step 1: Multiply numerators: ${a4} × ${c4} = ${multNum}.\nStep 2: Multiply denominators: ${b4} × ${d4} = ${multDen}.\nStep 3: Simplify: ${multNum / g4}/${multDen / g4}.`,
        };
      case 5:
      default:
        // Fraction division: (a/b) ÷ (c/d)
        const a5 = randInt(rng, 2, 4);
        const b5 = randInt(rng, 3, 5);
        const c5 = randInt(rng, 1, 3);
        const d5 = randInt(rng, 2, 4);
        const divNum = a5 * d5;
        const divDen = b5 * c5;
        const g5 = gcd(divNum, divDen);
        return {
          subtopic: 'Fraction division',
          question: `What is (${a5}/${b5}) ÷ (${c5}/${d5})? (Write as fraction)`,
          answers: [
            `${divNum / g5}/${divDen / g5}`,
            `${divNum}/${divDen}`,
            String(divNum / divDen),
          ],
          explanation: `Step 1: Invert divisor and multiply: (${a5}/${b5}) × (${d5}/${c5}).\nStep 2: Multiply: (${a5} × ${d5}) / (${b5} × ${c5}) = ${divNum}/${divDen}.\nStep 3: Simplify: ${divNum / g5}/${divDen / g5}.`,
        };
    }
  },

  decimals(diff, rng) {
    let a, b;
    switch (diff) {
      case 1:
        a = randInt(rng, 1, 9) / 10;
        b = randInt(rng, 1, 9) / 10;
        const sum1 = Number((a + b).toFixed(1));
        return {
          subtopic: 'Tenths addition',
          question: `What is ${a.toFixed(1)} + ${b.toFixed(1)}?`,
          answers: [String(sum1)],
          explanation: `Step 1: Line up the decimal points and add.\n${a.toFixed(1)} + ${b.toFixed(1)} = ${sum1}.`,
        };
      case 2:
        b = randInt(rng, 12, 45) / 10;
        a = randInt(rng, Math.round(b * 10) + 15, 90) / 10;
        const diff2 = Number((a - b).toFixed(1));
        return {
          subtopic: 'Decimal subtraction',
          question: `What is ${a.toFixed(1)} - ${b.toFixed(1)}?`,
          answers: [String(diff2)],
          explanation: `Step 1: Align decimal points and subtract.\n${a.toFixed(1)} - ${b.toFixed(1)} = ${diff2}.`,
        };
      case 3:
        a = randInt(rng, 2, 8) / 10;
        b = randInt(rng, 3, 9) / 10;
        const prod3 = Number((a * b).toFixed(2));
        return {
          subtopic: 'Decimal multiplication',
          question: `What is ${a.toFixed(1)} × ${b.toFixed(1)}?`,
          answers: [String(prod3)],
          explanation: `Step 1: Multiply as integers: ${Math.round(a * 10)} × ${Math.round(b * 10)} = ${Math.round(a * 10 * b * 10)}.\nStep 2: Place decimal 2 places to the left: ${prod3}.`,
        };
      case 4:
        b = randInt(rng, 2, 5) / 10;
        const q4 = randInt(rng, 3, 9);
        a = Number((b * q4).toFixed(1));
        return {
          subtopic: 'Decimal division',
          question: `What is ${a.toFixed(1)} ÷ ${b.toFixed(1)}?`,
          answers: [String(q4)],
          explanation: `Step 1: Shift decimals: ${Math.round(a * 10)} ÷ ${Math.round(b * 10)} = ${q4}.`,
        };
      case 5:
      default:
        a = randInt(rng, 15, 45) / 10;
        b = randInt(rng, 2, 4);
        const c5 = randInt(rng, 11, 29) / 10;
        const res5 = Number((a * b - c5).toFixed(1));
        return {
          subtopic: 'Combined decimal operations',
          question: `What is (${a.toFixed(1)} × ${b}) - ${c5.toFixed(1)}?`,
          answers: [String(res5)],
          explanation: `Step 1: Multiply: ${a.toFixed(1)} × ${b} = ${(a * b).toFixed(1)}.\nStep 2: Subtract ${c5.toFixed(1)} to get ${res5}.`,
        };
    }
  },

  percentages(diff, rng) {
    let base, pct, ans;
    switch (diff) {
      case 1:
        pct = randInt(rng, 0, 1) === 0 ? 50 : 10;
        base = randInt(rng, 2, 18) * 10;
        ans = (base * pct) / 100;
        return {
          subtopic: 'Benchmark percentages (10%, 50%)',
          question: `What is ${pct}% of ${base}?`,
          answers: [String(ans)],
          explanation: `Step 1: ${pct === 50 ? '50% is half of the number' : '10% is dividing by 10'}.\nStep 2: ${base} × ${pct / 100} = ${ans}.`,
        };
      case 2:
        pct = [20, 25, 75][randInt(rng, 0, 2)];
        base = randInt(rng, 2, 15) * 20;
        ans = (base * pct) / 100;
        return {
          subtopic: 'Common fractional percentages (20%, 25%, 75%)',
          question: `What is ${pct}% of ${base}?`,
          answers: [String(ans)],
          explanation: `Step 1: Convert ${pct}% to a fraction (${pct}/100).\nStep 2: Multiply ${base} × (${pct}/100) = ${ans}.`,
        };
      case 3:
        pct = [15, 30, 35, 40][randInt(rng, 0, 3)];
        base = randInt(rng, 2, 10) * 50;
        ans = (base * pct) / 100;
        return {
          subtopic: 'Mental percentages',
          question: `What is ${pct}% of ${base}?`,
          answers: [String(ans)],
          explanation: `Step 1: Calculate 10% of ${base} = ${base / 10}.\nStep 2: Scale up to ${pct}% to get ${ans}.`,
        };
      case 4:
        pct = [10, 20, 25, 50][randInt(rng, 0, 3)];
        base = randInt(rng, 4, 20) * 10;
        const inc = (base * pct) / 100;
        ans = base + inc;
        return {
          subtopic: 'Percentage increase',
          question: `Increase ${base} by ${pct}%:`,
          answers: [String(ans)],
          explanation: `Step 1: Find ${pct}% of ${base} = ${inc}.\nStep 2: Add to original: ${base} + ${inc} = ${ans}.`,
        };
      case 5:
      default:
        pct = [10, 20, 25, 50][randInt(rng, 0, 3)];
        const total = randInt(rng, 3, 15) * 20;
        const part = (total * pct) / 100;
        return {
          subtopic: 'Reverse percentages',
          question: `If ${pct}% of a number is ${part}, what is the original number?`,
          answers: [String(total)],
          explanation: `Step 1: Set up equation: (${pct}/100) × X = ${part}.\nStep 2: Solve for X = ${part} ÷ (${pct}/100) = ${total}.`,
        };
    }
  },

  ratios(diff, rng) {
    let a, b, factor;
    switch (diff) {
      case 1:
        factor = randInt(rng, 2, 5);
        a = randInt(rng, 1, 4);
        b = randInt(rng, a + 1, 6);
        return {
          subtopic: 'Simplifying ratios',
          question: `Simplify the ratio ${a * factor}:${b * factor} to lowest terms (e.g. 1:2):`,
          answers: [`${a}:${b}`, `${a}/${b}`],
          explanation: `Step 1: Divide both terms by their GCD (${factor}).\nResult = ${a}:${b}.`,
        };
      case 2:
        a = randInt(rng, 2, 5);
        b = randInt(rng, 3, 7);
        const k = randInt(rng, 2, 5);
        return {
          subtopic: 'Equivalent ratios',
          question: `Find x if the ratio ${a}:${b} is equivalent to ${a * k}:x:`,
          answers: [String(b * k)],
          explanation: `Step 1: Determine multiplier: ${a * k} ÷ ${a} = ${k}.\nStep 2: Multiply the second term: ${b} × ${k} = ${b * k}.`,
        };
      case 3:
        const r1 = randInt(rng, 1, 3);
        const r2 = randInt(rng, 2, 4);
        const unit = randInt(rng, 5, 20);
        const totalAmount = (r1 + r2) * unit;
        const largerShare = Math.max(r1, r2) * unit;
        return {
          subtopic: 'Sharing in a ratio',
          question: `Divide $${totalAmount} in the ratio ${r1}:${r2}. What is the larger share?`,
          answers: [String(largerShare), `$${largerShare}`],
          explanation: `Step 1: Total parts = ${r1} + ${r2} = ${r1 + r2}.\nStep 2: Value per part = ${totalAmount} ÷ ${r1 + r2} = ${unit}.\nStep 3: Larger share = ${Math.max(r1, r2)} × ${unit} = ${largerShare}.`,
        };
      case 4:
        const x4 = randInt(rng, 2, 4);
        const y4 = randInt(rng, 3, 5);
        const z4 = randInt(rng, 4, 6);
        const mult4 = randInt(rng, 2, 4);
        return {
          subtopic: 'Three-term ratio scaling',
          question: `If a:b:c = ${x4}:${y4}:${z4} and a = ${x4 * mult4}, what is c?`,
          answers: [String(z4 * mult4)],
          explanation: `Step 1: Scale factor = ${x4 * mult4} ÷ ${x4} = ${mult4}.\nStep 2: c = ${z4} × ${mult4} = ${z4 * mult4}.`,
        };
      case 5:
      default:
        const girlsRatio = randInt(rng, 3, 5);
        const boysRatio = randInt(rng, 2, 4);
        const classSize = randInt(rng, 4, 8) * (girlsRatio + boysRatio);
        const girlsCount = (classSize / (girlsRatio + boysRatio)) * girlsRatio;
        return {
          subtopic: 'Ratio word problem',
          question: `In a class of ${classSize} students, the ratio of girls to boys is ${girlsRatio}:${boysRatio}. How many girls are there?`,
          answers: [String(girlsCount)],
          explanation: `Step 1: Total ratio parts = ${girlsRatio} + ${boysRatio} = ${girlsRatio + boysRatio}.\nStep 2: Each part = ${classSize} ÷ ${girlsRatio + boysRatio} = ${classSize / (girlsRatio + boysRatio)}.\nStep 3: Girls = ${girlsRatio} × ${classSize / (girlsRatio + boysRatio)} = ${girlsCount}.`,
        };
    }
  },

  algebra(diff, rng) {
    let a, b, c, x;
    switch (diff) {
      case 1:
        x = randInt(rng, 3, 12);
        a = randInt(rng, 2, 15);
        b = x + a;
        return {
          subtopic: 'One-step equations (addition)',
          question: `Solve for x: x + ${a} = ${b}`,
          answers: [String(x), `x=${x}`],
          explanation: `Step 1: Subtract ${a} from both sides.\nx = ${b} - ${a} = ${x}.`,
        };
      case 2:
        x = randInt(rng, 3, 11);
        a = randInt(rng, 3, 9);
        b = a * x;
        return {
          subtopic: 'One-step equations (multiplication)',
          question: `Solve for x: ${a}x = ${b}`,
          answers: [String(x), `x=${x}`],
          explanation: `Step 1: Divide both sides by ${a}.\nx = ${b} ÷ ${a} = ${x}.`,
        };
      case 3:
        x = randInt(rng, 2, 9);
        a = randInt(rng, 2, 6);
        b = randInt(rng, 3, 15);
        c = a * x + b;
        return {
          subtopic: 'Two-step linear equations',
          question: `Solve for x: ${a}x + ${b} = ${c}`,
          answers: [String(x), `x=${x}`],
          explanation: `Step 1: Subtract ${b} from both sides: ${a}x = ${c - b}.\nStep 2: Divide by ${a}: x = ${x}.`,
        };
      case 4:
        x = randInt(rng, 2, 8);
        const a4 = randInt(rng, 4, 7);
        const c4 = randInt(rng, 1, a4 - 1);
        const d4 = randInt(rng, 10, 25);
        const b4 = (a4 - c4) * x - d4;
        const signStr = b4 >= 0 ? `+ ${b4}` : `- ${Math.abs(b4)}`;
        return {
          subtopic: 'Linear equations with variables on both sides',
          question: `Solve for x: ${a4}x ${signStr} = ${c4}x + ${d4}`,
          answers: [String(x), `x=${x}`],
          explanation: `Step 1: Collect terms with x on one side: (${a4} - ${c4})x = ${d4} - (${b4}).\nStep 2: Solve for x = ${x}.`,
        };
      case 5:
      default:
        // Quadratic: (x - r1)(x - r2) = x^2 - (r1+r2)x + r1*r2 = 0
        const r1 = randInt(rng, 2, 5);
        const r2 = randInt(rng, r1 + 1, 8);
        const bCoeff = r1 + r2;
        const cCoeff = r1 * r2;
        return {
          subtopic: 'Factorable quadratic equations',
          question: `Find the smaller positive solution for x in: x² - ${bCoeff}x + ${cCoeff} = 0`,
          answers: [String(r1), `x=${r1}`],
          explanation: `Step 1: Factor equation as (x - ${r1})(x - ${r2}) = 0.\nStep 2: Solutions are x = ${r1} and x = ${r2}.\nStep 3: Smaller root is ${r1}.`,
        };
    }
  },

  exponents(diff, rng) {
    let base, exp, ans;
    switch (diff) {
      case 1:
        base = randInt(rng, 2, 5);
        exp = randInt(rng, 2, 3);
        ans = Math.pow(base, exp);
        return {
          subtopic: 'Basic integer exponents',
          question: `What is ${base}^${exp}?`,
          answers: [String(ans)],
          explanation: `Step 1: Multiply ${base} by itself ${exp} times.\n${base}^${exp} = ${ans}.`,
        };
      case 2:
        base = randInt(rng, 6, 12);
        ans = base * base;
        return {
          subtopic: 'Squares up to 12',
          question: `What is ${base}²?`,
          answers: [String(ans)],
          explanation: `Step 1: ${base} × ${base} = ${ans}.`,
        };
      case 3:
        base = 2;
        const e1 = randInt(rng, 2, 4);
        const e2 = randInt(rng, 2, 4);
        ans = Math.pow(base, e1 + e2);
        return {
          subtopic: 'Product rule of exponents',
          question: `Evaluate 2^${e1} × 2^${e2}:`,
          answers: [String(ans), `2^${e1 + e2}`],
          explanation: `Step 1: By exponent rules, 2^${e1} × 2^${e2} = 2^(${e1}+${e2}) = 2^${e1 + e2}.\nStep 2: 2^${e1 + e2} = ${ans}.`,
        };
      case 4:
        base = 10;
        exp = randInt(rng, 3, 5);
        ans = Math.pow(base, exp);
        return {
          subtopic: 'Powers of 10',
          question: `What is 10^${exp}?`,
          answers: [String(ans)],
          explanation: `Step 1: 10 raised to the power of ${exp} is a 1 followed by ${exp} zeroes: ${ans}.`,
        };
      case 5:
      default:
        // Fractional exponent (square root)
        const root = randInt(rng, 3, 9);
        const square = root * root;
        return {
          subtopic: 'Rational exponents',
          question: `What is ${square}^(1/2)?`,
          answers: [String(root)],
          explanation: `Step 1: An exponent of 1/2 represents the square root.\nStep 2: √${square} = ${root}.`,
        };
    }
  },

  roots(diff, rng) {
    let r, square;
    switch (diff) {
      case 1:
        r = randInt(rng, 2, 7);
        square = r * r;
        return {
          subtopic: 'Basic square roots',
          question: `What is √${square}?`,
          answers: [String(r)],
          explanation: `Step 1: What positive number squared equals ${square}?\nStep 2: ${r} × ${r} = ${square}, so √${square} = ${r}.`,
        };
      case 2:
        r = randInt(rng, 8, 15);
        square = r * r;
        return {
          subtopic: 'Square roots up to 15',
          question: `What is √${square}?`,
          answers: [String(r)],
          explanation: `Step 1: ${r}² = ${square}, so √${square} = ${r}.`,
        };
      case 3:
        r = randInt(rng, 2, 5);
        const cube = r * r * r;
        return {
          subtopic: 'Cube roots',
          question: `What is ∛${cube}?`,
          answers: [String(r)],
          explanation: `Step 1: What number multiplied by itself three times equals ${cube}?\nStep 2: ${r}³ = ${cube}, so ∛${cube} = ${r}.`,
        };
      case 4:
        const r1 = randInt(rng, 3, 6);
        const r2 = randInt(rng, 4, 8);
        return {
          subtopic: 'Root arithmetic',
          question: `What is √${r1 * r1} + √${r2 * r2}?`,
          answers: [String(r1 + r2)],
          explanation: `Step 1: √${r1 * r1} = ${r1}.\nStep 2: √${r2 * r2} = ${r2}.\nStep 3: ${r1} + ${r2} = ${r1 + r2}.`,
        };
      case 5:
      default:
        const root5 = randInt(rng, 2, 3);
        const fourthPower = Math.pow(root5, 4);
        return {
          subtopic: 'Higher order roots',
          question: `What is the 4th root of ${fourthPower}?`,
          answers: [String(root5)],
          explanation: `Step 1: ${root5}^4 = ${fourthPower}.\nStep 2: Therefore, 4√${fourthPower} = ${root5}.`,
        };
    }
  },

  geometry(diff, rng) {
    let l, w;
    switch (diff) {
      case 1:
        l = randInt(rng, 3, 9);
        w = randInt(rng, 2, l);
        return {
          subtopic: 'Perimeter of a rectangle',
          question: `What is the perimeter of a rectangle with length ${l} and width ${w}?`,
          answers: [String(2 * (l + w))],
          explanation: `Step 1: Perimeter formula = 2 × (length + width).\nStep 2: 2 × (${l} + ${w}) = 2 × ${l + w} = ${2 * (l + w)}.`,
        };
      case 2:
        l = randInt(rng, 4, 12);
        w = randInt(rng, 3, 9);
        return {
          subtopic: 'Area of a rectangle',
          question: `What is the area of a rectangle with length ${l} and width ${w}?`,
          answers: [String(l * w)],
          explanation: `Step 1: Area formula = length × width.\nStep 2: ${l} × ${w} = ${l * w}.`,
        };
      case 3:
        const base = randInt(rng, 4, 12);
        const height = randInt(rng, 3, 8);
        const area3 = (base * height) / 2;
        return {
          subtopic: 'Area of a triangle',
          question: `What is the area of a triangle with base ${base} and height ${height}?`,
          answers: [String(area3)],
          explanation: `Step 1: Area formula = 1/2 × base × height.\nStep 2: 1/2 × ${base} × ${height} = ${area3}.`,
        };
      case 4:
        // Pythagorean theorem with standard triple (3-4-5, 5-12-13, 6-8-10)
        const triples = [
          [3, 4, 5],
          [6, 8, 10],
          [5, 12, 13],
          [9, 12, 15],
        ];
        const triple = triples[randInt(rng, 0, triples.length - 1)];
        return {
          subtopic: 'Pythagorean theorem',
          question: `In a right-angled triangle with legs of length ${triple[0]} and ${triple[1]}, what is the length of the hypotenuse?`,
          answers: [String(triple[2])],
          explanation: `Step 1: Use a² + b² = c².\nStep 2: ${triple[0]}² + ${triple[1]}² = ${triple[0] * triple[0]} + ${triple[1] * triple[1]} = ${triple[2] * triple[2]}.\nStep 3: c = √${triple[2] * triple[2]} = ${triple[2]}.`,
        };
      case 5:
      default:
        const a1 = randInt(rng, 35, 75);
        const a2 = randInt(rng, 35, 140 - a1);
        const a3 = 180 - a1 - a2;
        return {
          subtopic: 'Triangle interior angle sum',
          question: `Two angles in a triangle measure ${a1}° and ${a2}°. What is the measure of the third angle?`,
          answers: [String(a3), `${a3}°`],
          explanation: `Step 1: The angles in any triangle sum to 180°.\nStep 2: 180° - (${a1}° + ${a2}°) = 180° - ${a1 + a2}° = ${a3}°.`,
        };
    }
  },

  trigonometry(diff, rng) {
    switch (diff) {
      case 1:
        return {
          subtopic: 'Definition of Sine',
          question: 'In a right triangle, sin(θ) = Opposite / Hypotenuse. If Opposite = 3 and Hypotenuse = 5, what is sin(θ)?',
          answers: ['0.6', '3/5', '.6'],
          explanation: 'Step 1: sin(θ) = Opposite ÷ Hypotenuse = 3 ÷ 5 = 0.6.',
        };
      case 2:
        return {
          subtopic: 'Definition of Cosine',
          question: 'In a right triangle, cos(θ) = Adjacent / Hypotenuse. If Adjacent = 4 and Hypotenuse = 5, what is cos(θ)?',
          answers: ['0.8', '4/5', '.8'],
          explanation: 'Step 1: cos(θ) = Adjacent ÷ Hypotenuse = 4 ÷ 5 = 0.8.',
        };
      case 3:
        return {
          subtopic: 'Definition of Tangent',
          question: 'In a right triangle, tan(θ) = Opposite / Adjacent. If Opposite = 7 and Adjacent = 7, what is tan(θ)?',
          answers: ['1', '1.0'],
          explanation: 'Step 1: tan(θ) = 7 ÷ 7 = 1.',
        };
      case 4:
        return {
          subtopic: 'Special angles (30°)',
          question: 'What is the exact value of sin(30°)? (Answer as decimal or fraction)',
          answers: ['0.5', '1/2', '.5', '50%'],
          explanation: 'Step 1: For a 30-60-90 special right triangle, the opposite side to 30° is half the hypotenuse.\nStep 2: sin(30°) = 1/2 = 0.5.',
        };
      case 5:
      default:
        return {
          subtopic: 'Pythagorean trigonometric identity',
          question: 'For any angle θ, what is the value of sin²(θ) + cos²(θ)?',
          answers: ['1', '1.0'],
          explanation: 'Step 1: By the fundamental Pythagorean trigonometric identity, sin²(θ) + cos²(θ) = 1 for all real angles.',
        };
    }
  },

  'mental-calc'(diff, rng) {
    let n;
    switch (diff) {
      case 1:
        n = randInt(rng, 12, 48);
        return {
          subtopic: 'Doubling',
          question: `What is double of ${n}?`,
          answers: [String(n * 2)],
          explanation: `Step 1: Multiply ${n} by 2 = ${n * 2}.`,
        };
      case 2:
        n = randInt(rng, 12, 35);
        return {
          subtopic: 'Multiplying by 11',
          question: `Calculate mentally: ${n} × 11`,
          answers: [String(n * 11)],
          explanation: `Step 1: Mental trick for 2-digit number × 11: add digits (${Math.floor(n / 10)} + ${n % 10} = ${Math.floor(n / 10) + (n % 10)}) and place in between.\nResult = ${n * 11}.`,
        };
      case 3:
        n = randInt(rng, 4, 18) * 4;
        return {
          subtopic: 'Multiplying by 25',
          question: `Calculate mentally: ${n} × 25`,
          answers: [String(n * 25)],
          explanation: `Step 1: Dividing ${n} by 4 = ${n / 4}.\nStep 2: Multiply by 100 = ${(n / 4) * 100}.`,
        };
      case 4:
        n = randInt(rng, 125, 875);
        return {
          subtopic: 'Complements to 1000',
          question: `What is 1000 - ${n}?`,
          answers: [String(1000 - n)],
          explanation: `Step 1: Use rule of nines and tens: subtract each digit from 9, last digit from 10.\n1000 - ${n} = ${1000 - n}.`,
        };
      case 5:
      default:
        const t1 = randInt(rng, 12, 25);
        const mult = randInt(rng, 2, 4);
        const add = randInt(rng, 15, 45);
        const sub = randInt(rng, 5, 20);
        const ans = t1 * mult + add - sub;
        return {
          subtopic: 'Multi-operation mental chaining',
          question: `Calculate mentally: (${t1} × ${mult}) + ${add} - ${sub}`,
          answers: [String(ans)],
          explanation: `Step 1: ${t1} × ${mult} = ${t1 * mult}.\nStep 2: ${t1 * mult} + ${add} = ${t1 * mult + add}.\nStep 3: ${t1 * mult + add} - ${sub} = ${ans}.`,
        };
    }
  },
};

/**
 * Generates a procedurally generated math question for a specific topic and difficulty.
 * Questions map to deterministic concept IDs for SRS tracking (e.g. "math-multiplication-d3").
 *
 * @param {string} topic - Math topic from MATH_TOPICS
 * @param {number} difficulty - Difficulty level (1-5)
 * @param {number|string|null} [seed=null] - Optional seed for deterministic generation
 * @returns {Object} Complete question specification object
 */
export function generateMathQuestion(topic, difficulty, seed = null) {
  const normTopic = String(topic || 'addition').toLowerCase();
  const diff = clamp(Number(difficulty) || 1, 1, 5);

  const generator = GENERATORS[normTopic] || GENERATORS.addition;
  const rng = createRng(seed);

  const details = generator(diff, rng);

  // Concept-level ID for SRS
  const conceptId = `math-${normTopic}-d${diff}`;

  return {
    id: conceptId,
    conceptId,
    subject: 'math',
    topic: normTopic,
    subtopic: details.subtopic,
    difficulty: diff,
    type: 'short-answer',
    question: details.question,
    answers: details.answers,
    explanation: details.explanation,
    dynamic: true,
  };
}

/**
 * Generates a full session of procedural math questions.
 *
 * @param {string[]|string} [topics] - Single topic or array of topics (defaults to all)
 * @param {number} [difficulty=1] - Target difficulty level (1-5)
 * @param {number} [count=10] - Number of questions to generate
 * @param {number|string|null} [seed=null] - Optional seed for deterministic generation
 * @returns {Array<Object>} List of generated questions
 */
export function generateMathSession(topics, difficulty = 1, count = 10, seed = null) {
  let selectedTopics = [];
  if (Array.isArray(topics) && topics.length > 0) {
    selectedTopics = topics.filter(t => MATH_TOPICS.includes(t.toLowerCase()));
  } else if (typeof topics === 'string' && topics !== 'mixed') {
    const norm = topics.toLowerCase();
    if (MATH_TOPICS.includes(norm)) {
      selectedTopics = [norm];
    }
  }

  if (selectedTopics.length === 0) {
    selectedTopics = [...MATH_TOPICS];
  }

  const diff = clamp(Number(difficulty) || 1, 1, 5);
  const totalCount = Math.max(1, Number(count) || 10);
  const questions = [];

  for (let i = 0; i < totalCount; i++) {
    const topic = selectedTopics[i % selectedTopics.length];
    const itemSeed = seed != null ? `${seed}-q${i}-${topic}` : null;
    questions.push(generateMathQuestion(topic, diff, itemSeed));
  }

  return questions;
}
