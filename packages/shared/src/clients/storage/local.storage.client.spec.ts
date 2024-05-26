import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import createLocalStorageClient from './local.storage.client';

const originalLocalStorage = localStorage;
const mockLocalStorage: Pick<Storage, 'clear' | 'getItem' | 'key' | 'removeItem' | 'setItem'> = {
  clear: () => {
    // noop
  },
  getItem: () => '',
  key: () => '',
  removeItem: () => {
    // noop
  },
  setItem: () => {
    // noop
  },
};

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
});

afterAll(() => {
  Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });
});

describe('LocalStorageClient', () => {
  const client = createLocalStorageClient();

  it('should call `localStorage` getItem', () => {
    const mockGetItem = vi.spyOn(mockLocalStorage, 'getItem');

    client.getItem({ key: 'key' });

    expect(mockGetItem).toBeCalledWith('key');
  });
});
