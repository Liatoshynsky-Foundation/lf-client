import { renderHook, waitFor } from '@testing-library/react';
import { useIsMobile } from './useIsMobile';

describe('useIsMobile hook', () => {
  const originalUserAgent = navigator.userAgent;

  afterEach(() => {
    Object.defineProperty(navigator, 'userAgent', {
      value: originalUserAgent,
      configurable: true,
    });
  });

  it('returns true for a mobile user agent', async () => {
    const mobileUserAgent =
      'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPR6.170623.013) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0 Mobile Safari/537.36';
    Object.defineProperty(navigator, 'userAgent', {
      value: mobileUserAgent,
      configurable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('returns false for a desktop user agent', async () => {
    const desktopUserAgent =
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0 Safari/537.36';
    Object.defineProperty(navigator, 'userAgent', {
      value: desktopUserAgent,
      configurable: true,
    });

    const { result } = renderHook(() => useIsMobile());
    
    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});