import { render, screen } from '@testing-library/react';
import React from 'react';

import DocumentTableSelection from './DocumentTableSelection';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

const mockUseBreakpoints = jest.fn();

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => {
  return {
    __esModule: true,
    default: () => mockUseBreakpoints()
  };
});

const setBreakpoint = (
  bp: Partial<{
    isMobile: boolean;
    isTablet: boolean;
    isLaptop: boolean;
    isDesktop: boolean;
    isLaptopAndAbove: boolean;
  }>
) => {
  mockUseBreakpoints.mockReturnValue({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    isLaptopAndAbove: false,
    ...bp
  });
};

jest.mock('~/shared/components/enhanced-table/EnhancedTable', () => {
  const EnhancedTable = () => {
    return <div data-testid="enhanced-table"></div>;
  };

  return { __esModule: true, EnhancedTable };
});

jest.mock('./MobileDocumentTable/MobileDocumentTable', () => {
  const MobileDocumentTable = () => {
    return <div data-testid="mobile-table"></div>;
  };

  return { __esModule: true, default: MobileDocumentTable };
});

describe('DocumentTableSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render EnhancedTable on desktop/laptop', () => {
    setBreakpoint({ isDesktop: true, isLaptop: true, isLaptopAndAbove: true });
    render(<DocumentTableSelection />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-table')).not.toBeInTheDocument();
  });

  test('should render MobileDocumentTable on mobile', () => {
    setBreakpoint({ isMobile: true });
    render(<DocumentTableSelection />);

    expect(screen.getByTestId('mobile-table')).toBeInTheDocument();
    expect(screen.queryByTestId('enhanced-table')).not.toBeInTheDocument();
  });
});
