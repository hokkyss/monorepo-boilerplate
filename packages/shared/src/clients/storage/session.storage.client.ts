import type IStorageClient from './storage.client.interface';
import type { DefaultOptions, GetOptions, GetOptionsWithDefaultValue, SetOptions } from './storage.client.interface';

export default function createSessionStorageClient(): IStorageClient {
  async function clear() {
    try {
      sessionStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
  async function deleteItem({ key }: DefaultOptions) {
    try {
      sessionStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }

  async function has({ key }: DefaultOptions) {
    return sessionStorage.getItem(key) !== null;
  }

  async function setItem<T>({ key, serialize = JSON.stringify, value }: SetOptions<T>) {
    try {
      sessionStorage.setItem(key, serialize(value));

      return true;
    } catch {
      return false;
    }
  }

  function getItem<T>(options: GetOptions<T>): Promise<T | undefined>;
  function getItem<T>(options: GetOptionsWithDefaultValue<T>): Promise<T>;
  async function getItem<T>({
    defaultValue,
    deserialize = JSON.parse,
    key,
  }: GetOptions<T> | GetOptionsWithDefaultValue<T>): Promise<T | undefined> {
    const item = sessionStorage.getItem(key);

    if (!item) {
      return defaultValue;
    }

    return deserialize(item) as T;
  }

  return {
    clear,
    deleteItem,
    getItem,
    has,
    setItem,
  };
}
