import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useInterval from './use-interval';

describe('useInterval', () => {
  it('should call setInterval without arguments to callback', () => {
    // #region ARRANGE
    const setInterval = vi.spyOn(global, 'setInterval');
    const mockFunction = vi.fn();
    const milliseconds = 500;

    renderHook(() => useInterval(mockFunction, milliseconds));
    // #endregion

    // #region ASSERT
    expect(setInterval).toHaveBeenCalledWith(mockFunction, milliseconds);
    // #endregion
  });

  it('should call setInterval with arguments to callback', () => {
    // #region ARRANGE
    const setInterval = vi.spyOn(global, 'setInterval');
    const mockFunction = vi.fn();
    const milliseconds = 500;
    const args = [5, 10, '15'];

    renderHook(() => useInterval(mockFunction, milliseconds, ...args));
    // #endregion

    // #region ASSERT
    expect(setInterval).toHaveBeenCalledWith(mockFunction, milliseconds, ...args);
    // #endregion
  });
});
