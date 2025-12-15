import { act, renderHook } from '@testing-library/react';

import { useAutoHideMessage } from './useAutoHideMessage';

describe('useAutoHideMessage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return false initially when condition is false', () => {
    const { result } = renderHook(() => useAutoHideMessage(false));
    expect(result.current).toBe(false);
  });

  it('should show message when condition becomes true and auto-hide after default timeout', () => {
    const { result, rerender } = renderHook(({ condition }) => useAutoHideMessage(condition), {
      initialProps: { condition: false }
    });

    rerender({ condition: true });
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current).toBe(false);
  });

  it('should auto-hide after custom timeout', () => {
    const { result, rerender } = renderHook(({ condition, timeout }) => useAutoHideMessage(condition, timeout), {
      initialProps: { condition: false, timeout: 5000 }
    });

    rerender({ condition: true, timeout: 5000 });
    expect(result.current).toBe(true);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(result.current).toBe(false);
  });

  it('should immediately hide when condition becomes false', () => {
    const { result, rerender } = renderHook(({ condition }) => useAutoHideMessage(condition), {
      initialProps: { condition: true }
    });

    expect(result.current).toBe(true);

    rerender({ condition: false });

    expect(result.current).toBe(false);
  });

  it('should cleanup timer when unmounted', () => {
    const { result, rerender, unmount } = renderHook(({ condition }) => useAutoHideMessage(condition), {
      initialProps: { condition: false }
    });

    rerender({ condition: true });
    expect(result.current).toBe(true);

    unmount();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
  });
});
