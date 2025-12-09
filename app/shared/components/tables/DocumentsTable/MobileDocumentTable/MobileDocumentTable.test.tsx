import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import MobileDocumentTable from './MobileDocumentTable';
import { DocumentRecord } from '~/types/types/document.types';

import { usePagination } from '~/shared/hooks/use-pagination/usePagination';

jest.mock('~/shared/components/tables/DocumentsTable/TableCardList/TableCardList', () => ({
  __esModule: true,
  default: ({
    paginatedData,
    tableRef
  }: {
    paginatedData: DocumentRecord[];
    tableRef?: React.RefObject<HTMLDivElement>;
  }) => (
    <div ref={tableRef as any} data-testid="table-card-list">
      {paginatedData.length} cards
    </div>
  )
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/shared/components/enhanced-table/control-panel/ControlPanel', () => ({
  __esModule: true,
  default: ({ tableName }: { tableName: string }) => <div data-testid="control-panel">{tableName}</div>
}));

jest.mock('~/shared/components/design-system/all-components/pagination/Pagination', () => ({
  __esModule: true,
  default: ({ onChange }: { onChange: (event: React.ChangeEvent<unknown>, page: number) => void }) => (
    <button onClick={(e) => onChange(e as React.ChangeEvent<unknown>, 2)}>Go to page 2</button>
  )
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

jest.mock('~/shared/hooks/use-pagination/usePagination', () => ({
  usePagination: jest.fn(() => ({
    paginatedData: mockData.slice(0, 5),
    hasMore: true,
    currentPage: 1,
    totalPages: 2,
    visiblePages: [1],
    handleLoadMore: handleLoadMoreMock,
    handlePageChange: handlePageChangeMock
  }))
}));

describe('MobileDocumentTable', () => {
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

  test('calls scrollIntoView when page changes', () => {
    const { rerender } = render(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);

    const tableWrapper = screen.getByTestId('table-card-list').parentElement;
    if (!tableWrapper) throw new Error('Table wrapper not found');

    tableWrapper.scrollIntoView = jest.fn();

    const goToPage2Button = screen.getByText('Go to page 2');
    fireEvent.click(goToPage2Button);
    (usePagination as jest.Mock).mockReturnValueOnce({
      paginatedData: mockData.slice(0, 5),
      hasMore: true,
      currentPage: 2,
      totalPages: 2,
      visiblePages: [1, 2],
      handleLoadMore: handleLoadMoreMock,
      handlePageChange: handlePageChangeMock
    });

    rerender(<MobileDocumentTable data={mockData} tableName="Documents" itemsPerPage={5} />);

    expect(handlePageChangeMock).toHaveBeenCalledWith(2);
  });
});
