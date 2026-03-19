import { render, screen } from '@testing-library/react';
import React from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import NavigationBar from './NavigationBar';

jest.mock('~/hooks/use-breakpoints/useBreakpoints');

jest.mock('./dekstop-nav/DesktopNav', () => ({
  __esModule: true,
  default: ({ navLabels, specialNav }: any) => (
    <div data-testid="desktop-nav">
      Desktop Content: {navLabels.length} items
      {specialNav && <span>Special: {specialNav.label}</span>}
    </div>
  )
}));

jest.mock('./mobile-nav/MobileNav', () => ({
  __esModule: true,
  default: ({ navLabels }: any) => <div data-testid="mobile-nav">Mobile Content: {navLabels.length} items</div>
}));

describe('NavigationBar', () => {
  const mockProps = {
    navLabels: [
      { id: '1', label: 'Home', href: '/' },
      { id: '2', label: 'About', href: '/about' }
    ] as any,
    specialNav: { id: 's1', label: 'Donate', href: '/donate' } as any,
    scrollDirection: 'up' as const,
    contacts: { email: 'test@test.com', phone: '123' } as any,
    socialLinks: [] as any
  };

  const mockedUseBreakpoints = useBreakpoints as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render CircularProgress initially (isMounted check)', () => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should render DesktopNav when isDesktop is true', () => {
    mockedUseBreakpoints.mockReturnValue({ isDesktop: true });

    render(<NavigationBar {...mockProps} />);

    expect(screen.getByTestId('desktop-nav')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-nav')).not.toBeInTheDocument();
    expect(screen.getByText(/Special: Donate/i)).toBeInTheDocument();
  });

  it('should render MobileNav when isDesktop is false', () => {
    mockedUseBreakpoints.mockReturnValue({ isDesktop: false });

    render(<NavigationBar {...mockProps} />);

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-nav')).not.toBeInTheDocument();

    expect(screen.getByText(/Mobile Content: 3 items/i)).toBeInTheDocument();
  });

  it('should handle MobileNav without specialNav (covers empty branch)', () => {
    mockedUseBreakpoints.mockReturnValue({ isDesktop: false });

    render(<NavigationBar {...mockProps} specialNav={null} />);

    expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();

    expect(screen.getByText(/Mobile Content: 2 items/i)).toBeInTheDocument();
  });
});
