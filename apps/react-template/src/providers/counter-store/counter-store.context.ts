import type { StoreApi } from 'zustand';

import { createContext } from 'react';

export type CounterStore = {
  count: number;
  decrease: () => void;
  increase: () => void;
  reset: () => void;
};

const CounterStoreContext = createContext<StoreApi<CounterStore> | null>(null);

export default CounterStoreContext;
