import { render, screen } from '@testing-library/react';
import React from 'react';

import DocumentTableSelection from './DocumentTableSelection';
import { DocumentRecord } from '~/types/types/document.types';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn()
  }),
  usePathname: () => '/uk/archive/fund-1'
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

const mockData: DocumentRecord[] = [
  { id: '1', cipher: 'C1', name: 'Name1', dates: '2020', sheets: 1, contentDescription: 'Content1', pdfUrl: null },
  { id: '2', cipher: 'C2', name: 'Name2', dates: '2021', sheets: 2, contentDescription: 'Content2', pdfUrl: null },
  { id: '3', cipher: 'C3', name: 'Name3', dates: '2022', sheets: 3, contentDescription: 'Content3', pdfUrl: null },
  { id: '4', cipher: 'C4', name: 'Name4', dates: '2023', sheets: 4, contentDescription: 'Content4', pdfUrl: null },
  { id: '5', cipher: 'C5', name: 'Name5', dates: '2024', sheets: 5, contentDescription: 'Content5', pdfUrl: null },
  { id: '6', cipher: 'C6', name: 'Name6', dates: '2025', sheets: 6, contentDescription: 'Content6', pdfUrl: null }
];

describe('DocumentTableSelection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render EnhancedTable on desktop/laptop', () => {
    setBreakpoint({ isDesktop: true, isLaptop: true, isLaptopAndAbove: true });
    render(<DocumentTableSelection documents={mockData} />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-table')).not.toBeInTheDocument();
  });

  test('should render MobileDocumentTable on mobile', () => {
    setBreakpoint({ isMobile: true });
    render(<DocumentTableSelection documents={mockData} />);

    expect(screen.getByTestId('mobile-table')).toBeInTheDocument();
    expect(screen.queryByTestId('enhanced-table')).not.toBeInTheDocument();
  });
});
