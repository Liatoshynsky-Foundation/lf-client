import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MobileDocumentTable from './MobileDocumentTable';
import { DocumentRecord } from '~/types/types/document.types';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { usePagination } from '~/shared/hooks/use-pagination/usePagination';

interface TableCardListProps {
  paginatedData: DocumentRecord[];
  tableRef?: React.RefObject<HTMLDivElement | null>;
}

interface ControlPanelProps {
  tableName: string;
}

interface PaginationProps {
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

jest.mock('~/shared/components/tables/DocumentsTable/TableCardList/TableCardList', () => ({
  __esModule: true,
  default: ({ paginatedData, tableRef }: TableCardListProps) => (
    <div ref={tableRef as React.RefObject<HTMLDivElement>} data-testid="table-card-list">
      {paginatedData.length} cards
    </div>
  )
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/shared/components/enhanced-table/control-panel/ControlPanel', () => ({
  __esModule: true,
  default: ({ tableName }: ControlPanelProps) => <div data-testid="control-panel">{tableName}</div>
}));

jest.mock('~/shared/components/design-system/all-components/pagination/Pagination', () => ({
  __esModule: true,
  default: ({ onChange }: PaginationProps) => (
    <button onClick={(e) => onChange(e as React.ChangeEvent<unknown>, 2)}>Go to page 2</button>
  )
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isMobile: false,
    isTablet: false
  }))
}));

const handlePageChangeMock = jest.fn();
const handleLoadMoreMock = jest.fn();

const mockData: DocumentRecord[] = [
  { id: '1', cipher: 'C1', name: 'Name1', dates: '2020', sheets: 1, contentDescription: 'Content1', pdfUrl: null },
  { id: '2', cipher: 'C2', name: 'Name2', dates: '2021', sheets: 2, contentDescription: 'Content2', pdfUrl: null },
  { id: '3', cipher: 'C3', name: 'Name3', dates: '2022', sheets: 3, contentDescription: 'Content3', pdfUrl: null },
  { id: '4', cipher: 'C4', name: 'Name4', dates: '2023', sheets: 4, contentDescription: 'Content4', pdfUrl: null },
  { id: '5', cipher: 'C5', name: 'Name5', dates: '2024', sheets: 5, contentDescription: 'Content5', pdfUrl: null },
  { id: '6', cipher: 'C6', name: 'Name6', dates: '2025', sheets: 6, contentDescription: 'Content6', pdfUrl: null }
];

const mockPagesArray = Array.of(1, 2);

jest.mock('~/shared/hooks/use-pagination/usePagination', () => ({
  usePagination: jest.fn(() => ({
    paginatedData: mockData.slice(0, 5),
    hasMore: true,
    currentPage: 1,
    totalPages: 2,
    visiblePages: mockPagesArray,
    handleLoadMore: handleLoadMoreMock,
    handlePageChange: handlePageChangeMock
  }))
}));

describe('MobileDocumentTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoints as jest.Mock).mockReturnValue({
      isMobile: false,
      isTablet: false
    });
    (usePagination as jest.Mock).mockReturnValue({
      paginatedData: mockData.slice(0, 5),
      hasMore: true,
      currentPage: 1,
      totalPages: 2,
      visiblePages: mockPagesArray,
      handleLoadMore: handleLoadMoreMock,
      handlePageChange: handlePageChangeMock
    });
  });

  test('should render without crashing', () => {
    render(<MobileDocumentTable data={mockData} tableName="Test Table" />);
    expect(screen.getByTestId('control-panel')).toBeInTheDocument();
    expect(screen.getByTestId('table-card-list')).toBeInTheDocument();
  });

  test('should display correct table name in ControlPanel', () => {
    render(<MobileDocumentTable data={mockData} tableName="Documents" />);
    expect(screen.getByTestId('control-panel')).toHaveTextContent('Documents');
  });

  test('should render TableCardList with paginated data', () => {
    render(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);
    expect(screen.getByTestId('table-card-list')).toHaveTextContent('5 cards');
  });

  test('should shows "View" button when hasMore is true', () => {
    render(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);
    const loadMoreButton = screen.getByRole('button', { name: /viewMore/i });
    expect(loadMoreButton).toBeInTheDocument();
    fireEvent.click(loadMoreButton);
    expect(handleLoadMoreMock).toHaveBeenCalled();
  });

  test('calls scrollIntoView when page changes and verifies element scrolling method execution branches', () => {
    const { rerender } = render(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);

    const tableElement = screen.getByTestId('table-card-list');
    const mockScrollIntoView = jest.fn();
    tableElement.scrollIntoView = mockScrollIntoView;

    const goToPage2Button = screen.getByText('Go to page 2');
    fireEvent.click(goToPage2Button);

    (usePagination as jest.Mock).mockReturnValue({
      paginatedData: mockData.slice(0, 5),
      hasMore: true,
      currentPage: 2,
      totalPages: 2,
      visiblePages: mockPagesArray,
      handleLoadMore: handleLoadMoreMock,
      handlePageChange: handlePageChangeMock
    });

    rerender(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);

    expect(handlePageChangeMock).toHaveBeenCalledWith(2);
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  test('should skip scroll behavior safely if the native scrollIntoView function object wrapper is completely undefined', () => {
    const { rerender } = render(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);

    const tableElement = screen.getByTestId('table-card-list');
    Object.defineProperty(tableElement, 'scrollIntoView', { value: undefined, writable: true });

    const goToPage2Button = screen.getByText('Go to page 2');
    fireEvent.click(goToPage2Button);

    (usePagination as jest.Mock).mockReturnValue({
      paginatedData: mockData.slice(0, 5),
      hasMore: true,
      currentPage: 2,
      totalPages: 2,
      visiblePages: mockPagesArray,
      handleLoadMore: handleLoadMoreMock,
      handlePageChange: handlePageChangeMock
    });

    rerender(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);

    expect(handlePageChangeMock).toHaveBeenCalledWith(2);
  });

  test('should cover mobile breakpoint siblingCount branch condition layout when running on small viewports', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({
      isMobile: true,
      isTablet: false
    });

    render(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);
    expect(screen.getByTestId('control-panel')).toBeInTheDocument();
  });
});
