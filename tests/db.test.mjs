import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DB_NAME,
  DB_VERSION,
  STORE_NAMES,
  openDB,
  setDBInstance,
  validateBackup,
  exportBackup,
  importBackup,
} from '../js/db.js';

/**
 * Creates an in-memory mock IDB implementation to test schema creation,
 * v1->v2 migration, and store operations in Node.js.
 */
function createMockIDB(oldVersion = 0, existingStoreNames = []) {
  const storeData = new Map();
  const createdStores = new Map();
  const createdIndexes = new Map();

  for (const name of existingStoreNames) {
    storeData.set(name, []);
    createdStores.set(name, {
      keyPath: name === 'attempts' ? 'id' : (name === 'memory' ? 'questionId' : 'key'),
      autoIncrement: name === 'attempts',
    });
    createdIndexes.set(name, new Set());
  }

  function makeStoreObj(name) {
    const indexes = createdIndexes.get(name) || new Set();
    return {
      name,
      indexNames: {
        contains: (idx) => indexes.has(idx),
      },
      createIndex: (idxName, keyPath, options) => {
        indexes.add(idxName);
      },
      getAll: () => {
        const req = { onsuccess: null, onerror: null, result: storeData.get(name) || [] };
        queueMicrotask(() => req.onsuccess && req.onsuccess());
        return req;
      },
      get: (key) => {
        const list = storeData.get(name) || [];
        const found = list.find((item) => (item.id === key || item.questionId === key || item.key === key));
        const req = { onsuccess: null, onerror: null, result: found };
        queueMicrotask(() => req.onsuccess && req.onsuccess());
        return req;
      },
      put: (value) => {
        if (!storeData.has(name)) storeData.set(name, []);
        const list = storeData.get(name);
        list.push(value);
        const req = { onsuccess: null, onerror: null, result: value.id || value.questionId || value.key };
        queueMicrotask(() => req.onsuccess && req.onsuccess());
        return req;
      },
      delete: (key) => {
        const list = storeData.get(name) || [];
        const next = list.filter((item) => item.id !== key && item.questionId !== key && item.key !== key);
        storeData.set(name, next);
        const req = { onsuccess: null, onerror: null, result: true };
        queueMicrotask(() => req.onsuccess && req.onsuccess());
        return req;
      },
      clear: () => {
        storeData.set(name, []);
        const req = { onsuccess: null, onerror: null };
        queueMicrotask(() => req.onsuccess && req.onsuccess());
        return req;
      },
      index: (idxName) => ({
        getAll: () => {
          const req = { onsuccess: null, onerror: null, result: storeData.get(name) || [] };
          queueMicrotask(() => req.onsuccess && req.onsuccess());
          return req;
        },
      }),
    };
  }

  const mockDb = {
    objectStoreNames: {
      contains: (name) => createdStores.has(name),
    },
    createObjectStore: (name, options) => {
      createdStores.set(name, options);
      if (!storeData.has(name)) storeData.set(name, []);
      if (!createdIndexes.has(name)) createdIndexes.set(name, new Set());
      return makeStoreObj(name);
    },
    transaction: (name, mode) => {
      return {
        objectStore: (storeName) => makeStoreObj(storeName),
      };
    },
    close: () => {},
  };

  const factory = {
    open: (name, ver) => {
      const req = {
        result: mockDb,
        transaction: {
          objectStore: (storeName) => makeStoreObj(storeName),
        },
        onupgradeneeded: null,
        onsuccess: null,
        onerror: null,
      };

      queueMicrotask(() => {
        if (ver > oldVersion && req.onupgradeneeded) {
          req.onupgradeneeded({ oldVersion, newVersion: ver });
        }
        if (req.onsuccess) {
          req.onsuccess();
        }
      });

      return req;
    },
  };

  return { factory, mockDb, createdStores, createdIndexes, storeData };
}

test('v2 schema creates all 5 object stores and required indexes on fresh database', async () => {
  const { factory, createdStores, createdIndexes } = createMockIDB(0, []);

  await openDB(DB_NAME, DB_VERSION, factory);

  // Check that all 5 stores exist
  assert.ok(createdStores.has(STORE_NAMES.ATTEMPTS), 'attempts store should be created');
  assert.ok(createdStores.has(STORE_NAMES.MEMORY), 'memory store should be created');
  assert.ok(createdStores.has(STORE_NAMES.META), 'meta store should be created');
  assert.ok(createdStores.has(STORE_NAMES.SESSIONS), 'sessions store should be created');
  assert.ok(createdStores.has(STORE_NAMES.FLASHCARDS), 'flashcards store should be created');

  // Verify store configurations
  assert.deepEqual(createdStores.get(STORE_NAMES.ATTEMPTS), { keyPath: 'id', autoIncrement: true });
  assert.deepEqual(createdStores.get(STORE_NAMES.MEMORY), { keyPath: 'questionId' });
  assert.deepEqual(createdStores.get(STORE_NAMES.SESSIONS), { keyPath: 'id', autoIncrement: true });
  assert.deepEqual(createdStores.get(STORE_NAMES.FLASHCARDS), { keyPath: 'id' });

  // Verify indexes
  assert.ok(createdIndexes.get(STORE_NAMES.ATTEMPTS).has('day'), 'attempts should have day index');
  assert.ok(createdIndexes.get(STORE_NAMES.MEMORY).has('nextReview'), 'memory should have nextReview index');
  assert.ok(createdIndexes.get(STORE_NAMES.MEMORY).has('subject'), 'memory should have subject index');
});

test('v1->v2 migration preserves existing stores and adds new stores + indexes', async () => {
  // Existing v1 stores: attempts, memory, meta
  const { factory, createdStores, createdIndexes } = createMockIDB(1, [
    STORE_NAMES.ATTEMPTS,
    STORE_NAMES.MEMORY,
    STORE_NAMES.META,
  ]);

  await openDB(DB_NAME, DB_VERSION, factory);

  // All 5 stores must be present
  assert.ok(createdStores.has(STORE_NAMES.ATTEMPTS));
  assert.ok(createdStores.has(STORE_NAMES.MEMORY));
  assert.ok(createdStores.has(STORE_NAMES.META));
  assert.ok(createdStores.has(STORE_NAMES.SESSIONS), 'sessions added in v2');
  assert.ok(createdStores.has(STORE_NAMES.FLASHCARDS), 'flashcards added in v2');

  // New indexes added
  assert.ok(createdIndexes.get(STORE_NAMES.ATTEMPTS).has('day'));
  assert.ok(createdIndexes.get(STORE_NAMES.MEMORY).has('nextReview'));
  assert.ok(createdIndexes.get(STORE_NAMES.MEMORY).has('subject'));
});

test('Backup export format is valid and includes all required stores and metadata', async () => {
  const { mockDb, storeData } = createMockIDB(2, [
    STORE_NAMES.ATTEMPTS,
    STORE_NAMES.MEMORY,
    STORE_NAMES.META,
    STORE_NAMES.SESSIONS,
    STORE_NAMES.FLASHCARDS,
  ]);

  storeData.get(STORE_NAMES.ATTEMPTS).push({ id: 1, questionId: 'math-add-1', correct: true });
  storeData.get(STORE_NAMES.MEMORY).push({ questionId: 'math-add-1', level: 2 });
  storeData.get(STORE_NAMES.META).push({ key: 'bestStreak', value: 5 });

  setDBInstance(mockDb);

  const backup = await exportBackup({ grayscale: false, reduceMotion: true });

  assert.equal(backup.version, 2);
  assert.ok(typeof backup.exportedAt === 'string');
  assert.ok(backup.exportedAt.endsWith('Z'));
  assert.equal(backup.attempts.length, 1);
  assert.equal(backup.memory.length, 1);
  assert.equal(backup.meta.length, 1);
  assert.deepEqual(backup.sessions, []);
  assert.deepEqual(backup.flashcards, []);
  assert.deepEqual(backup.settings, { grayscale: false, reduceMotion: true });

  // Verify backup payload passes validation
  const validation = validateBackup(backup);
  assert.equal(validation.valid, true);
  assert.equal(validation.errors.length, 0);
});

test('Import rejects malformed data (null, primitives, non-object payloads)', () => {
  assert.equal(validateBackup(null).valid, false);
  assert.equal(validateBackup('invalid string').valid, false);
  assert.equal(validateBackup(12345).valid, false);
  assert.equal(validateBackup([]).valid, false);
});

test('Import rejects missing required fields (version, attempts, memory, questionId)', () => {
  // Missing version
  const noVersion = { attempts: [], memory: [] };
  assert.equal(validateBackup(noVersion).valid, false);

  // Missing attempts
  const noAttempts = { version: 2, memory: [] };
  assert.equal(validateBackup(noAttempts).valid, false);

  // Missing memory
  const noMemory = { version: 2, attempts: [] };
  assert.equal(validateBackup(noMemory).valid, false);

  // Attempt missing questionId or boolean correct
  const badAttempt = {
    version: 2,
    attempts: [{ id: 1, correct: 'yes' }],
    memory: [],
  };
  assert.equal(validateBackup(badAttempt).valid, false);

  // Memory card missing questionId
  const badCard = {
    version: 2,
    attempts: [],
    memory: [{ level: 3 }],
  };
  assert.equal(validateBackup(badCard).valid, false);
});

test('importBackup stores data into mock database upon successful validation', async () => {
  const { mockDb, storeData } = createMockIDB(2, [
    STORE_NAMES.ATTEMPTS,
    STORE_NAMES.MEMORY,
    STORE_NAMES.META,
    STORE_NAMES.SESSIONS,
    STORE_NAMES.FLASHCARDS,
  ]);

  setDBInstance(mockDb);

  const payload = {
    version: 2,
    exportedAt: new Date().toISOString(),
    attempts: [{ questionId: 'q1', correct: true }],
    memory: [{ questionId: 'q1', level: 1 }],
    meta: [{ key: 'bestStreak', value: 3 }],
    sessions: [{ id: 1, topic: 'math' }],
    flashcards: [{ id: 'fc1', front: 'A', back: 'B' }],
  };

  const result = await importBackup(payload);
  assert.equal(result.attempts, 1);
  assert.equal(result.memory, 1);
  assert.equal(result.meta, 1);
  assert.equal(result.sessions, 1);
  assert.equal(result.flashcards, 1);

  assert.equal(storeData.get(STORE_NAMES.ATTEMPTS).length, 1);
  assert.equal(storeData.get(STORE_NAMES.MEMORY).length, 1);
});
