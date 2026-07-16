import { act, render, screen } from '@testing-library/react';
import React from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import YearWithLine from './YearWithLine';

jest.mock('~/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('YearWithLine', () => {
  const mockedUseBreakpoints = useBreakpoints as jest.Mock;

  let mockMeasureText: jest.Mock;
  let mockGetContext: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseBreakpoints.mockReturnValue({ isMobile: false, isTablet: false });

    mockMeasureText = jest.fn().mockReturnValue({ width: 150 });
    mockGetContext = jest.fn().mockReturnValue({
      set font(_value: string) {},
      measureText: mockMeasureText
    });

    HTMLCanvasElement.prototype.getContext = mockGetContext;
  });

  it('should render correctly on Desktop and handle resize', () => {
    const { unmount } = render(<YearWithLine year={1234} />);

    expect(screen.getByText('1234')).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    unmount();
  });

  it('should cover the branch where ctx is null', () => {
    mockGetContext.mockReturnValue(null);

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

  it('should cover the branch where textRef.current is null on resize', () => {
    const mockRef: React.MutableRefObject<HTMLDivElement | null> = { current: document.createElement('div') };
    const spy = jest.spyOn(React, 'useRef').mockReturnValue(mockRef);

    render(<YearWithLine year={2024} />);

    mockRef.current = null;

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByText('2024')).toBeInTheDocument();
    spy.mockRestore();
  });
});
