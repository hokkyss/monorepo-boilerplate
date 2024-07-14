import type { CounterStore } from './counter-store.context';

import invariant from '@monorepo/shared/utils/invariant';
import isNull from '@monorepo/shared/utils/is-null';
import { useContext, useDebugValue } from 'react';
import { useStore } from 'zustand';

import CounterStoreContext from './counter-store.context';

export default function useCounterStore<U>(selector: (store: CounterStore) => U) {
  const store = useContext(CounterStoreContext);

  invariant(!isNull(store), `useCounterStore: No CounterStoreProvider was found!`);

  const value = useStore(store, selector);

  useDebugValue(value);

  return value;
}
