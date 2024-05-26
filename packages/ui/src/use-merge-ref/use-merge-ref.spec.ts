import { act, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import useMergeRef from './use-merge-ref';

describe('useMergeRef', () => {
  it('should handle object refs', () => {
    // #region ARRANGE
    const { result: firstRef } = renderHook(() => useRef<number>(null));
    const { result: secondRef } = renderHook(() => useRef<number>(null));

    const { result: mergedRef } = renderHook(() => useMergeRef(firstRef.current, secondRef.current));
    // #endregion

    // #region ACT
    act(() => {
      mergedRef.current(100);
    });
    // #endregion

    // #region ASSERT
    expect(firstRef.current.current).toBe(100);
    expect(secondRef.current.current).toBe(100);
    // #endregion
  });

  it('should handle callback refs', () => {
    // #region ARRANGE
    const firstRef = vi.fn();
    const secondRef = vi.fn();

    const { result: mergedRef } = renderHook(() => useMergeRef(firstRef, secondRef));
    // #endregion

    // #region ACT
    act(() => {
      mergedRef.current(100);
    });
    // #endregion

    // #region ASSERT
    expect(firstRef).toBeCalledWith(100);
    expect(secondRef).toBeCalledWith(100);
    // #endregion
  });

  it('should handle both callback refs and object refs', () => {
    // #region ARRANGE
    const firstRef = vi.fn();
    const { result: secondRef } = renderHook(() => useRef<number>(null));

    const { result: mergedRef } = renderHook(() => useMergeRef(firstRef, secondRef.current));
    // #endregion

    // #region ACT
    act(() => {
      mergedRef.current(100);
    });
    // #endregion

    // #region ASSERT
    expect(firstRef).toBeCalledWith(100);
    expect(secondRef.current.current).toBe(100);
    // #endregion
  });

  it('should ignore undefined refs', () => {
    // #region ARRANGE
    const firstRef = vi.fn();
    const secondRef = undefined;
    const thirdRef = undefined;
    const { result: fourthRef } = renderHook(() => useRef<number>(null));

    const { result: mergedRef } = renderHook(() =>
      useMergeRef<number>(firstRef, secondRef, thirdRef, fourthRef.current),
    );
    // #endregion

    // #region ACT
    act(() => {
      mergedRef.current(100);
    });
    // #endregion

    // #region ASSERT
    expect(firstRef).toBeCalledWith(100);
    expect(fourthRef.current.current).toBe(100);
    // #endregion
  });
});
