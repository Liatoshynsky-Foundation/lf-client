import { render, screen } from '@testing-library/react';

import MiddleContent from './MiddleContent';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints');

const mockUseBreakpoints = (overrides = {}) => {
  (useBreakpoints as jest.Mock).mockReturnValue({
    isDesktop: false,
    isLaptopAndAbove: false,
    isLaptop: false,
    isTablet: false,
    isMobile: false,
    ...overrides
  });
};

describe('Header middle content', () => {
  it('should render button on tablet', () => {
    mockUseBreakpoints({ isTablet: true });
    render(<MiddleContent />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
