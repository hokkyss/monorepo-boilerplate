import { act, renderHook } from '@testing-library/react';
import { Profiler } from 'react';
import { describe, expect, it, vi } from 'vitest';

import useRerender from './use-rerender';

describe('useRerender', () => {
  it('should rerender', () => {
    // #region ARRANGE
    const onRerender = vi.fn();

    const { result } = renderHook(() => useRerender(), {
      wrapper: (props) => (
        <Profiler id="use-rerender" onRender={onRerender}>
          {props.children}
        </Profiler>
      ),
    });
    // #endregion

    // #region ACT
    act(() => result.current());
    // #endregion

    // #region ASSERT
    // NOTE: it is called once when rendered, and once on rerender
    expect(onRerender).toHaveBeenCalledTimes(2);
    // #endregion
  });
});
