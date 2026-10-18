/**
 * BrainForge V2 - Core Utility Functions
 * Dependency-free utilities for DOM, strings, time, and math helpers.
 * @module utils
 */

/**
 * Escapes HTML special characters in a string to prevent XSS.
 * @param {string} str - Raw input string
 * @returns {string} Sanitized string safe for HTML insertion
 */
export function escapeHTML(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Safely creates a DOM element with attributes and children.
 * Works in modern browsers; gracefully falls back in non-DOM environments.
 * @param {string} tag - HTML tag name
 * @param {Record<string, any>} [attrs] - Element attributes and event listeners
 * @param {Array<Node|string|number>|Node|string|number} [children] - Child nodes or text
 * @returns {HTMLElement} The created DOM element
 */
export function createEl(tag, attrs = {}, children = []) {
  if (typeof document === 'undefined') {
    // Non-DOM (e.g. Node test runner) fallback mock
    return { tag, attrs, children };
  }

  const el = document.createElement(tag);

  if (attrs && typeof attrs === 'object') {
    for (const [key, val] of Object.entries(attrs)) {
      if (val == null || val === false) continue;

      if (key === 'className' || key === 'class') {
        el.className = String(val);
      } else if (key === 'dataset' && typeof val === 'object') {
        Object.assign(el.dataset, val);
      } else if (key === 'style' && typeof val === 'object') {
        Object.assign(el.style, val);
      } else if (key === 'style' && typeof val === 'string') {
        el.style.cssText = val;
      } else if (key.startsWith('on') && typeof val === 'function') {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, val);
      } else if (val === true) {
        el.setAttribute(key, '');
        if (key in el) el[key] = true;
      } else {
        el.setAttribute(key, String(val));
        if (key in el && typeof el[key] !== 'function') {
          try { el[key] = val; } catch (_) {}
        }
      }
    }
  }

  const childList = Array.isArray(children) ? children : [children];
  for (const child of childList) {
    if (child == null || child === false) continue;
    if (typeof child === 'object' && 'nodeType' in child) {
      el.appendChild(child);
    } else {
      el.appendChild(document.createTextNode(String(child)));
    }
  }

  return el;
}

/**
 * Returns the current date (or provided date) formatted as YYYY-MM-DD in UTC.
 * @param {Date|string|number} [date=new Date()] - Reference date
 * @returns {string} Date key in YYYY-MM-DD UTC format
 */
export function todayKeyUTC(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().slice(0, 10);
}

/**
 * Returns the current date (or provided date) formatted as YYYY-MM-DD in the local timezone.
 * @param {Date|string|number} [date=new Date()] - Reference date
 * @returns {string} Date key in YYYY-MM-DD local format
 */
export function todayKeyLocal(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Adds an integer number of days to a date using UTC arithmetic to avoid DST drift.
 * Returns a new Date instance without mutating the input.
 * @param {Date|string|number} date - Starting date
 * @param {number} days - Number of days to add (can be negative)
 * @returns {Date} New Date instance advanced by specified days
 */
export function addDays(date, days) {
  const d = new Date(date instanceof Date ? date.getTime() : new Date(date).getTime());
  d.setUTCDate(d.getUTCDate() + Number(days));
  return d;
}

/**
 * Normalizes a string: converts to lowercase, trims whitespace,
 * removes punctuation, and collapses multiple whitespace characters to single spaces.
 * @param {string} str - Raw string
 * @returns {string} Normalized string
 */
export function normalize(str) {
  if (str == null) return '';
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/[.,!?;:'"()\[\]{}`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Creates a debounced wrapper around a function.
 * @template {Function} T
 * @param {T} fn - Function to debounce
 * @param {number} [ms=250] - Debounce delay in milliseconds
 * @returns {T & { cancel: () => void }} Debounced function with cancel method
 */
export function debounce(fn, ms = 250) {
  let timeoutId = null;

  const debounced = function (...args) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn.apply(this, args);
    }, ms);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return /** @type {any} */ (debounced);
}

let toastTimer = null;

/**
 * Displays a non-blocking toast notification to the user.
 * Looks for an existing element or creates one if running in a browser DOM.
 * @param {string} msg - Message to display
 * @param {string|HTMLElement} [target='#toast'] - Element ID, CSS selector, or Element
 * @param {number} [duration=3000] - Duration in milliseconds to display
 */
export function toast(msg, target = '#toast', duration = 3000) {
  if (typeof document === 'undefined') return;

  let el = null;
  if (typeof target === 'string') {
    el = target.startsWith('#') || target.startsWith('.')
      ? document.querySelector(target)
      : document.getElementById(target);
  } else if (target && typeof target === 'object' && 'nodeType' in target) {
    el = target;
  }

  if (!el) {
    el = document.getElementById('toast');
  }

  if (!el && document.body) {
    el = document.createElement('div');
    el.id = 'toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }

  if (!el) return;

  el.textContent = msg;
  el.classList.add('visible');
  el.classList.remove('hidden');

  if (toastTimer !== null) {
    clearTimeout(toastTimer);
  }

  toastTimer = setTimeout(() => {
    el.classList.remove('visible');
    el.classList.add('hidden');
    toastTimer = null;
  }, duration);
}

/**
 * Formats a duration in milliseconds to "X.Xs" (one decimal place).
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted duration string (e.g. "1.5s")
 */
export function formatDuration(ms) {
  const num = Number(ms);
  if (!Number.isFinite(num) || num < 0) {
    return '0.0s';
  }
  return `${(num / 1000).toFixed(1)}s`;
}

/**
 * Clamps a numeric value between a minimum and maximum boundary.
 * @param {number} val - Input number
 * @param {number} min - Lower boundary
 * @param {number} max - Upper boundary
 * @returns {number} Clamped value
 */
export function clamp(val, min, max) {
  const num = Number(val);
  if (Number.isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
}
