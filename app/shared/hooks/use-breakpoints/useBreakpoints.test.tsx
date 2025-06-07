import * as styles from '@mui/material/styles';
import * as mediaQuery from '@mui/material/useMediaQuery';
import { renderHook } from '@testing-library/react';

import useBreakpoints from './useBreakpoints';

jest.mock('@mui/material/useMediaQuery', () => jest.fn());
jest.mock('@mui/material/styles', () => {
  const actual = jest.requireActual('@mui/material/styles');
  return {
    ...actual,
    useTheme: jest.fn()
  };
});

const mockUseMediaQuery = mediaQuery.default as jest.Mock;
const mockUseTheme = styles.useTheme as jest.Mock;

describe('useBreakpoints', () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({
      breakpoints: {
        up: (key: string) => key,
        between: (start: string, end: string) => `${start}-${end}`
      }
    });

    mockUseMediaQuery
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(false);
  });

  it('should return correct breakpoints', () => {
    const { result } = renderHook(() => useBreakpoints());

    expect(result.current).toEqual({
      isDesktop: true,
      isLaptopAndAbove: true,
      isLaptop: false,
      isTablet: false,
      isMobile: false
    });
  });
});
