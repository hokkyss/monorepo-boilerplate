'use client';

import { useEffect } from 'react';

/**
 * @example
 * ```ts
 * useTimeout(
 *   useCallback(() => {
 *     // executed after 500ms
 *   }, []),
 *   500,
 * );
 * ```
 * @param callback - Callback to be executed after `milliseconds` milliseconds. To prevent unnecessary rerenders, `callback` must be stable (declared outside component/hooks or wrapped in `useCallback`).
 * @param milliseconds - self explanatory
 * @param args - The arguments to be passed to `callback`
 */
export default function useTimeout<Args extends unknown[]>(
  callback: (...args: Args) => void,
  milliseconds: number,
  ...args: Args
) {
  useEffect(() => {
    const timeout = setTimeout(callback, milliseconds, ...args);

    return () => clearTimeout(timeout);
    // NOTE: we want it to rerender only when its arguments changes value
    // puttings `args` as deps means it will always rerender
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, milliseconds, ...args]);
}
