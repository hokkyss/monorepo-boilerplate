'use client';

import { useReducer } from 'react';

function rerenderReducer(state: boolean) {
  return !state;
}

type UseRerenderReturn = () => void;

/**
 * A hook to forcefully rerender a component
 *
 * @example
 * ```tsx
 * function FunctionComponent() {
 *   const rerender = useRerender();
 *
 *   // ...somewhere in the code
 *   rerender()
 * }
 * ```
 */
export default function useRerender(): UseRerenderReturn {
  const [, dispatch] = useReducer(rerenderReducer, true);

  return dispatch;
}
