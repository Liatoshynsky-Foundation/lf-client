import * as styles from '@mui/material/styles';
import { act, renderHook, waitFor } from '@testing-library/react';

import useBreakpoints from './useBreakpoints';

jest.mock('@mui/material/styles', () => {
  const actual = jest.requireActual('@mui/material/styles');
  return {
    ...actual,
    useTheme: jest.fn()
  };
});

const mockUseTheme = styles.useTheme as jest.Mock;

describe('useBreakpoints', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200
        }
      }
    });
  });

  it('should return correct breakpoints for desktop width', async () => {
    Object.defineProperty(globalThis, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1300
    });

    const { result } = renderHook(() => useBreakpoints());

    await waitFor(() => {
      expect(result.current).toEqual({
        isDesktop: true,
        isLaptopAndAbove: true,
        isLaptop: false,
        isTablet: false,
        isMobile: false
      });
    });
  });

  it('should return correct breakpoints for mobile width', async () => {
    const { result } = renderHook(() => useBreakpoints());

    act(() => {
      Object.defineProperty(globalThis, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 500
      });
      globalThis.dispatchEvent(new Event('resize'));
    });

    await waitFor(() => {
      expect(result.current).toEqual({
        isDesktop: false,
        isLaptopAndAbove: false,
        isLaptop: false,
        isTablet: false,
        isMobile: true
      });
    });
  });
});
