import { render, screen } from '@testing-library/react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import YearWithLine from './YearWithLine';

jest.mock('~/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('YearWithLine', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render a year', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false, isTablet: false });
    render(<YearWithLine year={1203} />);
    expect(screen.getByText('1203')).toBeInTheDocument();
  });

  it('should create line next to the year block', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false, isTablet: false });
    render(<YearWithLine year={1987} />);

    const yearElement = screen.getByText('1987');
    expect(yearElement).toBeInTheDocument();

    const parent = yearElement.parentElement;
    expect(parent?.firstChild).toBeInTheDocument();
  });
});
