import { renderHook } from '@testing-library/react';

import { useIsMounted } from './useIsMounted';

describe('useIsMounted hook', () => {
  it('Should return true after mount', () => {
    const { result } = renderHook(() => useIsMounted());
    expect(result.current).toBe(true);
  });

  it('Should stay true after rerenders', () => {
    const { result, rerender } = renderHook(() => useIsMounted());
    rerender();
    expect(result.current).toBe(true);
  });
});
