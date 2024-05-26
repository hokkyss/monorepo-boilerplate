import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import usePrevious from './use-previous';

describe('usePrevious', () => {
  it('should start with initial value', () => {
    // #region ARRANGE
    const value = 5;
    const { result } = renderHook((initialProps) => usePrevious(initialProps), {
      initialProps: value,
    });
    // #endregion

    // #region ASSERT
    expect(result.current).toBe(value);
    // #endregion
  });

  it('should return its previous value', () => {
    // #region ARRANGE
    const { rerender, result } = renderHook((initialProps) => usePrevious(initialProps), {
      initialProps: 5,
    });
    // #endregion

    // #region ACT
    rerender(10);
    // #endregion

    // #region ASSERT
    expect(result.current).toBe(5);
    // #endregion
  });

  it('should change its value', () => {
    // #region ARRANGE
    const { rerender, result } = renderHook((initialProps) => usePrevious(initialProps), {
      initialProps: 5,
    });
    // #endregion

    // #region ACT
    rerender(10);
    rerender(15);
    // #endregion

    // #region ASSERT
    expect(result.current).toBe(10);
    // #endregion
  });
});
