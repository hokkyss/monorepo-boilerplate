'use client';

import type { ForwardedRef, MutableRefObject, Ref, RefCallback } from 'react';

import { useCallback } from 'react';

/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function applyRef<T>(ref: Ref<T> | undefined, value: T) {
  if (!ref) {
    return;
  }

  if (typeof ref === 'function') {
    ref(value);
  } else {
    (ref as MutableRefObject<T>).current = value;
  }
}

function createMergedRefCallback<T>(...refs: (ForwardedRef<T> | RefCallback<T> | undefined)[]): RefCallback<T> {
  return function mergeRef(instance) {
    refs.forEach((ref) => applyRef(ref, instance));
  };
}

/**
 * Compose refs, either object or callback, as one.
 * @param refs - The refs to be composed
 * @returns the merged ref as a callback
 */
export default function useMergeRef<T>(...refs: (ForwardedRef<T> | RefCallback<T> | undefined)[]) {
  // NOTE: using [refs] as deps will cause this hook to rerender every time
  // NOTE: using [...refs] as deps will work, but eslint won't allow it, so it is the same either way.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(createMergedRefCallback(...refs), refs);
}
