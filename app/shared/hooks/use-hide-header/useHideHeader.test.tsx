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
    document.body.removeChild(footer);
  });

  it('should return "false" if footer is out of the visible area', () => {
    footer.getBoundingClientRect = () => ({ top: 2000 }) as DOMRect;

    const { result } = renderHook(() => useHideHeader());
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('should return "true" if footer is in the visible area', () => {
    footer.getBoundingClientRect = () => ({ top: 500 }) as DOMRect;

    const { result } = renderHook(() => useHideHeader(0.5));
    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });
});
