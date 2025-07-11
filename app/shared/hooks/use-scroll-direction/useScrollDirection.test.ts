import { act, renderHook } from '@testing-library/react';

import { useScrollDirection } from './useScrollDirection';

// Helper to simulate scroll
function setScrollY(value: number) {
  Object.defineProperty(window, 'scrollY', {
    writable: true,
    configurable: true,
    value
  });
}

describe('useScrollDirection', () => {
  beforeEach(() => {
    setScrollY(0);
  });

  it('should return "up" as initial direction', () => {
    const { result } = renderHook(() => useScrollDirection());
    expect(result.current).toBe('up');
  });

  it('should return "down" when scrolling down more than threshold', () => {
    const { result } = renderHook(() => useScrollDirection(50));
    act(() => {
      setScrollY(100);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('down');
  });

  it('should return "up" when scrolling up more than threshold', () => {
    setScrollY(100);
    const { result } = renderHook(() => useScrollDirection(0));
    act(() => {
      setScrollY(200);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('down');
    act(() => {
      setScrollY(100);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('up');
  });

  it('should not change direction if scroll difference is less than threshold', () => {
    const { result } = renderHook(() => useScrollDirection(50));
    act(() => {
      setScrollY(30);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('up');
    act(() => {
      setScrollY(60);
      window.dispatchEvent(new Event('scroll'));
    });
    expect(result.current).toBe('down');
  });
});
