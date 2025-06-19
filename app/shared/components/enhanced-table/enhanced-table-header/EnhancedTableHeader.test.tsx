import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { render, screen } from '@testing-library/react';
import React from 'react';

import EnhancedTableHeader from './EnhancedTableHeader';

type Row = { name: string; year: number };

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'name',
    header: 'Назва'
  },
  {
    accessorKey: 'year',
    header: 'Рік'
  }
];

const data: Row[] = [
  { name: 'Твір 1', year: 2020 },
  { name: 'Твір 2', year: 2021 }
];

function TableHeaderTestWrapper({ columnWidths }: Readonly<{ columnWidths?: Record<string, string | number> }>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return <EnhancedTableHeader table={table} columnWidths={columnWidths} />;
}

describe('EnhancedTableHeader', () => {
  it('renders header row with correct column headers', () => {
    render(<TableHeaderTestWrapper />);
    expect(screen.getByText('Назва')).toBeInTheDocument();
    expect(screen.getByText('Рік')).toBeInTheDocument();
  });

  it('applies column widths if provided', () => {
    render(<TableHeaderTestWrapper columnWidths={{ name: '120px', year: '80px' }} />);
    const nameCell = screen.getByText('Назва').closest('th');
    const yearCell = screen.getByText('Рік').closest('th');

    expect(nameCell).toHaveStyle('width: 120px');
    expect(yearCell).toHaveStyle('width: 80px');
  });
});
