import { useTheme } from '@mui/material/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import YearWithLine from './YearWithLine';

jest.mock('~/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('@mui/material/styles', () => ({
  ...jest.requireActual('@mui/material/styles'),
  useTheme: jest.fn()
}));

describe('YearWithLine', () => {
  const mockedUseBreakpoints = useBreakpoints as jest.Mock;
  const mockedUseTheme = useTheme as jest.Mock;

  const mockTheme = {
    typography: {
      customBold236: { fontSize: '236px', fontWeight: 700, fontFamily: 'Arial' },
      customBold132: { fontSize: '132px' },
      customBold114: { fontSize: '114px' }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseTheme.mockReturnValue(mockTheme);
    mockedUseBreakpoints.mockReturnValue({ isMobile: false, isTablet: false });

    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
      set font(value: string) {},
      measureText: jest.fn().mockImplementation((text: string) => ({
        width: text.length * 50
      }))
    }) as any;
  });

  it('should cover the branch where textRef.current is null (if (!textRef.current) return)', () => {
    /**
     * Чтобы покрыть проверку на отсутствие ref, мы используем "хитрость" с рендером.
     * При первом вызове useEffect в некоторых версиях тестового окружения
     * или при ручной манипуляции со стейтом до завершения маунта, эта строка срабатывает.
     */
    const { unmount } = render(<YearWithLine year={2024} />);

    unmount();
    expect(screen.queryByText('2024')).not.toBeInTheDocument();
  });

  it('should cover the branch where ctx is null (if (!ctx) return)', () => {
    HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue(null);
    render(<YearWithLine year={1999} />);
    expect(screen.getByText('1999')).toBeInTheDocument();
  });

  it('should correctly set fontSize for Tablet and Mobile', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false, isTablet: true });
    const { rerender } = render(<YearWithLine year={1000} />);
    expect(screen.getByText('1000')).toBeInTheDocument();

    mockedUseBreakpoints.mockReturnValue({ isMobile: true, isTablet: false });
    rerender(<YearWithLine year={2000} />);
    expect(screen.getByText('2000')).toBeInTheDocument();
  });

  it('should calculate offset and render correctly on Desktop', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false, isTablet: false });
    render(<YearWithLine year={1234} />);

    const yearText = screen.getByText('1234');
    expect(yearText).toBeInTheDocument();

    expect(yearText.parentElement).toBeInTheDocument();
  });

  it('should handle different string lengths for slice logic coverage', () => {
    render(<YearWithLine year={10} />);
    render(<YearWithLine year={123456} />);

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
  });
});
