import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import useBoolean from './use-boolean';

/*
describe('booleanReducer', () => {
  it('should set value', () => {
    // #region ASSERT
    expect(booleanReducer(true, false)).toBe(false);
    expect(booleanReducer(false, true)).toBe(true);
    // #endregion
  });

  it('should toggle value', () => {
    // #region ASSERT
    expect(booleanReducer(true, 'toggle')).toBe(false);
    expect(booleanReducer(false, 'toggle')).toBe(true);
    // #endregion
  });

  it('should throw error with invalid action', () => {
    // #region ASSERT
    expect(() => booleanReducer(true, null as unknown as any)).toThrow();
    // #endregion
  });
});
*/

describe('useBoolean', () => {
  it('should follow initial value', () => {
    // #region ARRANGE
    const { result } = renderHook(() => useBoolean(false));
    // #endregion

    // #region ASSERT
    expect(result.current.value).toBe(false);
    // #endregion
  });

  it('should set value to true', () => {
    // #region ARRANGE
    const { result } = renderHook(() => useBoolean(false));
    // #endregion

    // #region ACT
    act(() => {
      result.current.setTrue();
    });
    // #endregion

    // #region ASSERT
    expect(result.current.value).toBe(true);
    // #endregion
  });

  it('should set value to false', () => {
    // #region ARRANGE
    const { result } = renderHook(() => useBoolean(true));
    // #endregion

    // #region ACT
    act(() => {
      result.current.setFalse();
    });
    // #endregion

    // #region ASSERT
    expect(result.current.value).toBe(false);
    // #endregion
  });
});
