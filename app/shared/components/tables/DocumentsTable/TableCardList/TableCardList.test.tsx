import { render, screen } from '@testing-library/react';
import React from 'react';

import TableCardList from './TableCardList';

jest.mock('~/shared/components/tables/DocumentsTable/TableCard/TableCard', () => ({
  __esModule: true,
  default: ({ id }: { id: string }) => <div data-testid={`table-card-${id}`}></div>
}));

const mockData = [
  { id: '1', cipher: 'C1', name: 'Name1', dates: '2020', sheets: 1, contentDescription: 'Content1', pdfUrl: null },
  { id: '2', cipher: 'C2', name: 'Name2', dates: '2021', sheets: 2, contentDescription: 'Content2', pdfUrl: null }
];

describe('TableCardList', () => {
  test('should render list', () => {
    const tableRef = React.createRef<HTMLDivElement>();
    render(<TableCardList paginatedData={mockData} tableRef={tableRef} />);

    expect(screen.getByTestId('table-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('table-card-2')).toBeInTheDocument();
  });

  test('should attach ref to container', () => {
    const tableRef = React.createRef<HTMLDivElement>();
    render(<TableCardList paginatedData={mockData} tableRef={tableRef} />);

    expect(tableRef.current).not.toBeNull();
    expect(tableRef.current?.tagName).toBe('DIV');
  });
});
