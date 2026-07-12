import { act, renderHook } from '@testing-library/react';

import { useHideHeader } from './useHideHeader';

describe('useHideHeader', () => {
  let footer: HTMLElement;

  beforeEach(() => {
    footer = document.createElement('div');
    footer.id = 'footer';
    document.body.appendChild(footer);

    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
  });

  afterEach(() => {
    if (document.getElementById('footer')) {
      document.body.removeChild(footer);
    }
    jest.restoreAllMocks();
  });

  it('should return "false" if footer is out of the visible area', () => {
    jest.spyOn(footer, 'getBoundingClientRect').mockReturnValue({
      top: 2000,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => '{}'
    });

    const { result } = renderHook(() => useHideHeader());
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('should return "true" if footer is in the visible area', () => {
    jest.spyOn(footer, 'getBoundingClientRect').mockReturnValue({
      top: 500,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      toJSON: () => '{}'
    });

    const { result } = renderHook(() => useHideHeader(0.5));
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('should early return and do nothing if footer element does not exist in DOM', () => {
    document.body.removeChild(footer);

    const { result } = renderHook(() => useHideHeader());
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });
});
