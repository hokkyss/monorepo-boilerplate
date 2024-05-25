'use client';

import { useEffect } from 'react';

/**
 * @example
 * ```ts
 * useInterval(
 *   useCallback(() => {
 *     // executed every 500ms
 *   }, []),
 *   500,
 * );
 * ```
 * @param callback - Callback to be executed every `milliseconds` milliseconds. To prevent unnecessary rerenders, `callback` must be stable (declared outside component/hooks or wrapped in `useCallback`).
 * @param milliseconds - self explanatory
 * @param args - The arguments to be passed to callback
 */
export default function useInterval<Args extends unknown[]>(
  callback: (...args: Args) => void,
  milliseconds: number,
  ...args: Args
) {
  useEffect(() => {
    const interval = setInterval<Args>(callback, milliseconds, ...args);

    return () => clearInterval(interval);
    // NOTE: we want it to rerender only when its arguments changes value
    // puttings `args` as deps means it will always rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, milliseconds, ...args]);
}
