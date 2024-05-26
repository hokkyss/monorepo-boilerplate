import type IStorageClient from './storage.client.interface';
import type { DefaultOptions, GetOptions, GetOptionsWithDefaultValue, SetOptions } from './storage.client.interface';

export type IndexedDBClientOptions = {
  name: string;
};

export default function createIndexedDBClient({ name }: IndexedDBClientOptions): IStorageClient {
  function getDb() {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(name);

      request.onupgradeneeded = () => {
        const db = request.result;

        db.onerror = () => {
          reject(new Error('Failed to create object store'));
        };

        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name);
        }
        resolve(db);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = request.onblocked = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
    });
  }

  async function clear() {
    const db = await getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(name, 'readwrite');

      const store = transaction.objectStore(name);

      const request = store.clear();

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  async function deleteItem({ key }: DefaultOptions) {
    const db = await getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(name, 'readwrite');

      const store = transaction.objectStore(name);

      const request = store.delete(key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  function getItem<T>(options: GetOptions<T>): Promise<T | undefined>;
  function getItem<T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
  async function getItem<T>({
    defaultValue,
    deserialize = (val) => val,
    key,
  }: GetOptions<T> | GetOptionsWithDefaultValue<T>): Promise<T | undefined> {
    const db = await getDb();

    return new Promise<T | undefined>((resolve, reject) => {
      const transaction = db.transaction(name, 'readonly');

      const store = transaction.objectStore(name);

      const request = store.get(key);

      transaction.oncomplete = () => {
        if (typeof request.result === 'undefined') {
          return resolve(defaultValue);
        }
        resolve(deserialize(request.result));
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  async function has({ key }: DefaultOptions) {
    const db = await getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(name, 'readonly');

      const store = transaction.objectStore(name);

      const request = store.getKey(key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  async function setItem<T>({ key, serialize = (val) => val, value }: SetOptions<T>) {
    const db = await getDb();

    return new Promise<boolean>((resolve, reject) => {
      const transaction = db.transaction(name, 'readwrite');

      const store = transaction.objectStore(name);

      const request = store.put(serialize(value), key);

      transaction.oncomplete = () => {
        resolve(true);
      };
      transaction.onabort = transaction.onerror = () => {
        reject(request.error ?? request.transaction?.error ?? new Error('Something happened'));
      };
      transaction.commit();
    });
  }

  return {
    clear,
    deleteItem,
    getItem,
    has,
    setItem,
  };
}
