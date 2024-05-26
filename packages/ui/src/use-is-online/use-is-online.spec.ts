import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import useIsOnline from './use-is-online';

describe('useIsOnline', () => {
  it('should return true from online navigator', () => {
    // #region ARRANGE
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);

    const { result } = renderHook(() => useIsOnline());
    // #endregion

    // #region ASSERT
    expect(result.current).toBe(true);
    // #endregion
  });

  it('should return false from offline navigator', () => {
    // #region ARRANGE
    vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false);

    const { result } = renderHook(() => useIsOnline());
    // #endregion

    // #region ASSERT
    expect(result.current).toBe(false);
    // #endregion
  });
});
