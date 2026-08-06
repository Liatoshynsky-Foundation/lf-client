import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import DocumentTableSection from './DocumentTableSection';
import { DocumentRecord } from '~/types/types/document.types';

interface EnhancedTableProps {
  onRowClick?: (row: DocumentRecord) => void;
  data: DocumentRecord[];
}

const mockPush = jest.fn();
let mockPathname = '/archive/fund-1/';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn()
  })),
  usePathname: jest.fn(() => mockPathname)
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
  const EnhancedTable = ({ onRowClick, data }: EnhancedTableProps) => {
    return (
      <div data-testid="enhanced-table">
        <button
          data-testid="click-row-1"
          onClick={() => {
            if (onRowClick) onRowClick(data[0]);
          }}
        >
          Row 1
        </button>
        <button
          data-testid="click-row-empty"
          onClick={() => {
            if (onRowClick) onRowClick({} as unknown as DocumentRecord);
          }}
        >
          Row Empty
        </button>
      </div>
    );
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
  {
    id: 'case-123',
    cipher: 'C1',
    name: 'Name1',
    dates: '2020',
    sheets: 1,
    contentDescription: 'Content1',
    pdfUrl: null
  },
  { id: '2', cipher: 'C2', name: 'Name2', dates: '2021', sheets: 2, contentDescription: 'Content2', pdfUrl: null }
];

describe('DocumentTableSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPathname = '/archive/fund-1/';
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn()
    });
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
  });

  test('should render EnhancedTable on desktop/laptop', () => {
    setBreakpoint({ isDesktop: true, isLaptop: true, isLaptopAndAbove: true });
    render(<DocumentTableSection documents={mockData} />);

    expect(screen.getByTestId('enhanced-table')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-table')).not.toBeInTheDocument();
  });

  test('should render MobileDocumentTable on mobile', () => {
    setBreakpoint({ isMobile: true });
    render(<DocumentTableSection documents={mockData} />);

    expect(screen.getByTestId('mobile-table')).toBeInTheDocument();
    expect(screen.queryByTestId('enhanced-table')).not.toBeInTheDocument();
  });

  test('should trigger routing actions with proper target encoded param details when clicking dynamic rows', () => {
    setBreakpoint({ isDesktop: true });
    render(<DocumentTableSection documents={mockData} />);

    fireEvent.click(screen.getByTestId('click-row-1'));
    expect(mockPush).toHaveBeenCalledWith('/archive/fund-1/case-123');
  });

  test('should clear trailing slashes correctly and build canonical path endpoints', () => {
    mockPathname = '/archive/fund-1';
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    setBreakpoint({ isDesktop: true });
    render(<DocumentTableSection documents={mockData} />);

    fireEvent.click(screen.getByTestId('click-row-1'));
    expect(mockPush).toHaveBeenCalledWith('/archive/fund-1/case-123');
  });

  test('should reject route redirection changes seamlessly if targeted row parameter records completely lack identity keys', () => {
    setBreakpoint({ isDesktop: true });
    render(<DocumentTableSection documents={mockData} />);

    fireEvent.click(screen.getByTestId('click-row-empty'));
    expect(mockPush).not.toHaveBeenCalled();
  });
});
