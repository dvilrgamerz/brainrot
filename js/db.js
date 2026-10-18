/**
 * BrainForge V2 - IndexedDB Persistence & Migration Engine
 * Handles data storage, v1->v2 migrations, indexes, and backup export/import.
 * @module db
 */

export const DB_NAME = 'brainforge-db';
export const DB_VERSION = 2;
export const SETTINGS_KEY = 'brainforge-settings-v1';

export const STORE_NAMES = {
  ATTEMPTS: 'attempts',
  MEMORY: 'memory',
  META: 'meta',
  SESSIONS: 'sessions',
  FLASHCARDS: 'flashcards',
};

/** @type {IDBDatabase|null} */
let currentDb = null;

/**
 * Returns the currently active IndexedDB connection.
 * @returns {IDBDatabase|null}
 */
export function getDB() {
  return currentDb;
}

/**
 * Manually sets the active DB instance (useful for testing and mocks).
 * @param {IDBDatabase|null} db
 */
export function setDBInstance(db) {
  currentDb = db;
}

/**
 * Closes the active database connection if open.
 */
export function closeDB() {
  if (currentDb) {
    currentDb.close();
    currentDb = null;
  }
}

/**
 * Opens the BrainForge IndexedDB database and performs schema creation / migration.
 * Preserves all v1 data and adds v2 stores (`sessions`, `flashcards`) and indexes.
 *
 * @param {string} [dbName=DB_NAME] - Database name
 * @param {number} [version=DB_VERSION] - Database version
 * @param {IDBFactory} [idbFactory] - Optional IDBFactory (defaults to global indexedDB)
 * @returns {Promise<IDBDatabase>} Resolves with the opened IDBDatabase
 */
export function openDB(dbName = DB_NAME, version = DB_VERSION, idbFactory) {
  const factory = idbFactory || (typeof indexedDB !== 'undefined' ? indexedDB : null);
  if (!factory) {
    return Promise.reject(new Error('IndexedDB is not supported in this environment'));
  }

  return new Promise((resolve, reject) => {
    const req = factory.open(dbName, version);

    req.onupgradeneeded = (event) => {
      const db = req.result;
      const tx = req.transaction;

      // 1. attempts store (autoIncrement id)
      let attemptsStore;
      if (!db.objectStoreNames.contains(STORE_NAMES.ATTEMPTS)) {
        attemptsStore = db.createObjectStore(STORE_NAMES.ATTEMPTS, {
          keyPath: 'id',
          autoIncrement: true,
        });
      } else {
        attemptsStore = tx.objectStore(STORE_NAMES.ATTEMPTS);
      }
      if (!attemptsStore.indexNames.contains('day')) {
        attemptsStore.createIndex('day', 'day', { unique: false });
      }

      // 2. memory store (keyPath: questionId)
      let memoryStore;
      if (!db.objectStoreNames.contains(STORE_NAMES.MEMORY)) {
        memoryStore = db.createObjectStore(STORE_NAMES.MEMORY, {
          keyPath: 'questionId',
        });
      } else {
        memoryStore = tx.objectStore(STORE_NAMES.MEMORY);
      }
      if (!memoryStore.indexNames.contains('nextReview')) {
        memoryStore.createIndex('nextReview', 'nextReview', { unique: false });
      }
      if (!memoryStore.indexNames.contains('subject')) {
        memoryStore.createIndex('subject', 'subject', { unique: false });
      }

      // 3. meta store (keyPath: key)
      if (!db.objectStoreNames.contains(STORE_NAMES.META)) {
        db.createObjectStore(STORE_NAMES.META, { keyPath: 'key' });
      }

      // 4. sessions store (v2 new: keyPath: id, autoIncrement)
      if (!db.objectStoreNames.contains(STORE_NAMES.SESSIONS)) {
        db.createObjectStore(STORE_NAMES.SESSIONS, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }

      // 5. flashcards store (v2 new: keyPath: id)
      if (!db.objectStoreNames.contains(STORE_NAMES.FLASHCARDS)) {
        db.createObjectStore(STORE_NAMES.FLASHCARDS, { keyPath: 'id' });
      }
    };

    req.onsuccess = () => {
      currentDb = req.result;
      resolve(currentDb);
    };

    req.onerror = () => {
      reject(req.error);
    };
  });
}

/**
 * Gets an object store within a transaction.
 * @private
 * @param {string} storeName - Name of the store
 * @param {IDBTransactionMode} [mode="readonly"] - Transaction mode
 * @returns {IDBObjectStore}
 */
function txStore(storeName, mode = 'readonly') {
  if (!currentDb) {
    throw new Error('Database is not open. Call openDB() first.');
  }
  return currentDb.transaction(storeName, mode).objectStore(storeName);
}

/**
 * Retrieves all records from an object store.
 * @param {string} storeName - Store name
 * @returns {Promise<any[]>}
 */
export function getAll(storeName) {
  return new Promise((resolve, reject) => {
    try {
      const req = txStore(storeName, 'readonly').getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Retrieves a single record by primary key.
 * @param {string} storeName - Store name
 * @param {any} key - Record key
 * @returns {Promise<any|null>} Record or null if not found
 */
export function get(storeName, key) {
  return new Promise((resolve, reject) => {
    try {
      const req = txStore(storeName, 'readonly').get(key);
      req.onsuccess = () => resolve(req.result !== undefined ? req.result : null);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Inserts or updates a record in an object store.
 * @param {string} storeName - Store name
 * @param {any} value - Record to store
 * @returns {Promise<any>} Resolves with the primary key of the stored record
 */
export function put(storeName, value) {
  return new Promise((resolve, reject) => {
    try {
      const req = txStore(storeName, 'readwrite').put(value);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Deletes a record by its primary key.
 * @param {string} storeName - Store name
 * @param {any} key - Key of record to delete
 * @returns {Promise<boolean>} Resolves true when deleted
 */
export function deleteRecord(storeName, key) {
  return new Promise((resolve, reject) => {
    try {
      const req = txStore(storeName, 'readwrite').delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Clears all records from an object store.
 * @param {string} storeName - Store name
 * @returns {Promise<void>}
 */
export function clearStore(storeName) {
  return new Promise((resolve, reject) => {
    try {
      const req = txStore(storeName, 'readwrite').clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Retrieves all records matching a specific index value (or all if value omitted).
 * @param {string} storeName - Store name
 * @param {string} indexName - Index name
 * @param {any} [value] - Specific value to match
 * @returns {Promise<any[]>} Matching records
 */
export function getAllByIndex(storeName, indexName, value) {
  return new Promise((resolve, reject) => {
    try {
      const store = txStore(storeName, 'readonly');
      const index = store.index(indexName);
      const req = value !== undefined ? index.getAll(value) : index.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Validates a backup data payload structure.
 * Checks for required fields and types, rejecting malformed data.
 *
 * @param {any} data - Parsed JSON backup payload
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateBackup(data) {
  const errors = [];

  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { valid: false, errors: ['Backup payload must be a non-null object'] };
  }

  // Version check
  if (typeof data.version !== 'number' || data.version < 1) {
    errors.push('Missing or invalid backup version number');
  }

  // Attempts validation
  if (!Array.isArray(data.attempts)) {
    errors.push('Missing or invalid "attempts" array');
  } else {
    for (let i = 0; i < data.attempts.length; i++) {
      const att = data.attempts[i];
      if (!att || typeof att !== 'object' || Array.isArray(att)) {
        errors.push(`Attempt at index ${i} is not a valid object`);
        break;
      }
      if (typeof att.questionId !== 'string' || !att.questionId) {
        errors.push(`Attempt at index ${i} is missing required "questionId"`);
        break;
      }
      if (typeof att.correct !== 'boolean') {
        errors.push(`Attempt at index ${i} is missing boolean "correct"`);
        break;
      }
    }
  }

  // Memory validation
  if (!Array.isArray(data.memory)) {
    errors.push('Missing or invalid "memory" array');
  } else {
    for (let i = 0; i < data.memory.length; i++) {
      const card = data.memory[i];
      if (!card || typeof card !== 'object' || Array.isArray(card)) {
        errors.push(`Memory card at index ${i} is not a valid object`);
        break;
      }
      if (typeof card.questionId !== 'string' || !card.questionId) {
        errors.push(`Memory card at index ${i} is missing required "questionId"`);
        break;
      }
    }
  }

  // Optional arrays validation
  if (data.meta !== undefined && !Array.isArray(data.meta)) {
    errors.push('"meta" must be an array if provided');
  }
  if (data.sessions !== undefined && !Array.isArray(data.sessions)) {
    errors.push('"sessions" must be an array if provided');
  }
  if (data.flashcards !== undefined && !Array.isArray(data.flashcards)) {
    errors.push('"flashcards" must be an array if provided');
  }
  if (data.settings !== undefined && (typeof data.settings !== 'object' || data.settings === null || Array.isArray(data.settings))) {
    errors.push('"settings" must be a non-null object if provided');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Exports a full database backup payload with version 2 metadata.
 * @param {Record<string, any>} [currentSettings] - Optional settings to include
 * @returns {Promise<{
 *   version: number,
 *   exportedAt: string,
 *   attempts: any[],
 *   memory: any[],
 *   meta: any[],
 *   sessions: any[],
 *   flashcards: any[],
 *   settings: Record<string, any>
 * }>}
 */
export async function exportBackup(currentSettings = null) {
  let settings = currentSettings;
  if (!settings && typeof localStorage !== 'undefined') {
    try {
      settings = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
    } catch (_) {
      settings = {};
    }
  }

  const [attempts, memory, meta, sessions, flashcards] = await Promise.all([
    getAll(STORE_NAMES.ATTEMPTS),
    getAll(STORE_NAMES.MEMORY),
    getAll(STORE_NAMES.META),
    getAll(STORE_NAMES.SESSIONS),
    getAll(STORE_NAMES.FLASHCARDS),
  ]);

  return {
    version: DB_VERSION,
    exportedAt: new Date().toISOString(),
    attempts,
    memory,
    meta,
    sessions,
    flashcards,
    settings: settings || {},
  };
}

/**
 * Validates and imports a backup payload into the database.
 * Replaces existing records in all stores.
 *
 * @param {any} backupData - Parsed backup data
 * @returns {Promise<{ attempts: number, memory: number, meta: number, sessions: number, flashcards: number }>}
 */
export async function importBackup(backupData) {
  const validation = validateBackup(backupData);
  if (!validation.valid) {
    throw new Error(`Invalid backup data: ${validation.errors.join('; ')}`);
  }

  // Clear existing data across all stores
  await Promise.all([
    clearStore(STORE_NAMES.ATTEMPTS),
    clearStore(STORE_NAMES.MEMORY),
    clearStore(STORE_NAMES.META),
    clearStore(STORE_NAMES.SESSIONS),
    clearStore(STORE_NAMES.FLASHCARDS),
  ]);

  // Insert attempts
  for (const item of backupData.attempts) {
    await put(STORE_NAMES.ATTEMPTS, item);
  }

  // Insert memory cards
  for (const item of backupData.memory) {
    await put(STORE_NAMES.MEMORY, item);
  }

  // Insert meta
  if (Array.isArray(backupData.meta)) {
    for (const item of backupData.meta) {
      await put(STORE_NAMES.META, item);
    }
  }

  // Insert sessions
  if (Array.isArray(backupData.sessions)) {
    for (const item of backupData.sessions) {
      await put(STORE_NAMES.SESSIONS, item);
    }
  }

  // Insert flashcards
  if (Array.isArray(backupData.flashcards)) {
    for (const item of backupData.flashcards) {
      await put(STORE_NAMES.FLASHCARDS, item);
    }
  }

  // Restore settings if present
  if (backupData.settings && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(backupData.settings));
    } catch (_) {}
  }

  return {
    attempts: backupData.attempts.length,
    memory: backupData.memory.length,
    meta: Array.isArray(backupData.meta) ? backupData.meta.length : 0,
    sessions: Array.isArray(backupData.sessions) ? backupData.sessions.length : 0,
    flashcards: Array.isArray(backupData.flashcards) ? backupData.flashcards.length : 0,
  };
}
