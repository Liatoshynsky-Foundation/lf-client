import { act, renderHook } from '@testing-library/react';
import React from 'react';

import { IntroAnimationProvider, useIntroAnimation } from './IntroAnimationContext';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();

Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: mockGetItem,
    setItem: mockSetItem
  },
  writable: true
});

describe('IntroAnimationContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <IntroAnimationProvider>{children}</IntroAnimationProvider>
  );

  it('should initialize with hasSeenIntro as false when sessionStorage is empty', () => {
    mockGetItem.mockReturnValue(null);

    const { result } = renderHook(() => useIntroAnimation(), { wrapper });

    expect(result.current.isInitialized).toBe(true);
    expect(result.current.hasSeenIntro).toBe(false);
    expect(mockGetItem).toHaveBeenCalledWith('hasSeenIntro');
  });

  it('should initialize with hasSeenIntro as true when sessionStorage has a saved value', () => {
    mockGetItem.mockReturnValue('true');

    const { result } = renderHook(() => useIntroAnimation(), { wrapper });

    expect(result.current.isInitialized).toBe(true);
    expect(result.current.hasSeenIntro).toBe(true);
    expect(mockGetItem).toHaveBeenCalledWith('hasSeenIntro');
  });

  it('should update state and write to sessionStorage when markIntroAsSeen is called', () => {
    mockGetItem.mockReturnValue(null);

    const { result } = renderHook(() => useIntroAnimation(), { wrapper });

    expect(result.current.hasSeenIntro).toBe(false);

    act(() => {
      result.current.markIntroAsSeen();
    });

    expect(result.current.hasSeenIntro).toBe(true);
    expect(mockSetItem).toHaveBeenCalledWith('hasSeenIntro', 'true');
  });

  it('should throw an error if useIntroAnimation is used outside of IntroAnimationProvider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      renderHook(() => useIntroAnimation());
    }).toThrow('useIntroAnimation must be used within an IntroAnimationProvider');

    consoleSpy.mockRestore();
  });
});
