import { render, screen } from '@testing-library/react';
import React from 'react';

import TableCardList from './TableCardList';

jest.mock('~/shared/components/tables/DocumentsTable/TableCard/TableCard', () => ({
  __esModule: true,
  default: ({ id }: { id: string }) => <div data-testid={`table-card-${id}`}></div>
}));

const mockData = [
  { id: '1', code: 'C1', name: 'Name1', date: '2020', sheets: 1, content: 'Content1', action: 'PDF' },
  { id: '2', code: 'C2', name: 'Name2', date: '2021', sheets: 2, content: 'Content2', action: 'PDF' }
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
