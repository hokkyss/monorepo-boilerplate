import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useTimeout from './use-timeout';

describe('useTimeout', () => {
  it('should call setTimeout without arguments to callback', () => {
    // #region ARRANGE
    const setTimeout = vi.spyOn(global, 'setTimeout');

    const mockFunction = vi.fn();
    const milliseconds = 500;

    renderHook(() => useTimeout(mockFunction, milliseconds));
    // #endregion

    // #region ASSERT
    expect(setTimeout).toHaveBeenCalledWith(mockFunction, milliseconds);
    // #endregion
  });

  it('should call setTimeout with arguments to callback', () => {
    // #region ARRANGE
    const setTimeout = vi.spyOn(global, 'setTimeout');
    const mockFunction = vi.fn();
    const milliseconds = 500;
    const args = [5, 10, '15'];

    renderHook(() => useTimeout(mockFunction, milliseconds, ...args));
    // #endregion

    // #region ASSERT
    expect(setTimeout).toHaveBeenCalledWith(mockFunction, milliseconds, ...args);
    // #endregion
  });
});
