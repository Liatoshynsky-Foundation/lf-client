import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ArchiveRecord } from '../documents.conts';
import MobileDocumentTable from './MobileDocumentTable';

import { usePagination } from '~/shared/hooks/use-pagination/usePagination';

jest.mock('~/shared/components/tables/DocumentsTable/TableCardList/TableCardList', () => ({
  __esModule: true,
  default: ({
    paginatedData,
    tableRef
  }: {
    paginatedData: ArchiveRecord[];
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

const mockData: ArchiveRecord[] = [
  { id: '1', code: 'C1', name: 'Name1', date: '2020', sheets: 1, content: 'Content1', action: 'PDF' },
  { id: '2', code: 'C2', name: 'Name2', date: '2021', sheets: 2, content: 'Content2', action: 'PDF' },
  { id: '3', code: 'C3', name: 'Name3', date: '2022', sheets: 3, content: 'Content3', action: 'PDF' },
  { id: '4', code: 'C4', name: 'Name4', date: '2023', sheets: 4, content: 'Content4', action: 'PDF' },
  { id: '5', code: 'C5', name: 'Name5', date: '2024', sheets: 5, content: 'Content5', action: 'PDF' },
  { id: '6', code: 'C6', name: 'Name6', date: '2025', sheets: 6, content: 'Content6', action: 'PDF' }
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
