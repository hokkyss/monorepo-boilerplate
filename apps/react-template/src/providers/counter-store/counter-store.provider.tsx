import type { FC } from 'react';

import type { CounterStore } from './counter-store.context';

import shallowEqual from '@monorepo/ui/shallow-equal';
import { type PropsWithChildren, memo, useState } from 'react';
import { createStore } from 'zustand';

import envConfig from '../../configs/env/env.config';

import CounterStoreContext from './counter-store.context';

type CounterStoreProviderProps = PropsWithChildren<{ initialCount?: number }>;

const CounterStoreProvider: FC<CounterStoreProviderProps> = memo(
  ({ children, initialCount = 0 }) => {
    const [store] = useState(() =>
      createStore<CounterStore>((set) => ({
        count: initialCount,
        decrease: () => set((state) => ({ count: state.count - 1 })),
        increase: () => set((state) => ({ count: state.count + 1 })),
        reset: () => set(() => ({ count: initialCount })),
      })),
    );

    return <CounterStoreContext.Provider value={store}>{children}</CounterStoreContext.Provider>;
  },
  (prev, next) => shallowEqual(prev, next),
);

if (envConfig.env === 'development') {
  CounterStoreProvider.displayName = 'CounterStoreProvider';
}

export default CounterStoreProvider;
