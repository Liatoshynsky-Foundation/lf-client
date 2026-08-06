import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import EnhancedTableHeader from './EnhancedTableHeader';

type Row = { name: string; year: number };

const columns: ColumnDef<Row>[] = [
  {
    accessorKey: 'name',
    header: 'Назва',
    enableSorting: true,
    meta: {}
  },
  {
    accessorKey: 'year',
    header: 'Рік',
    enableSorting: false
  }
];

const data: Row[] = [
  { name: 'Твір 1', year: 2020 },
  { name: 'Твір 2', year: 2021 }
];

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: ({ alt, src }: { alt: string; src: string }) => (
    <span data-testid="mock-svg" data-src={src}>
      {alt}
    </span>
  )
}));

function TableHeaderTestWrapper({ columnWidths }: Readonly<{ columnWidths?: Record<string, string | number> }>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    initialState: {
      sorting: [{ id: 'name', desc: false }]
    }
  });

  return (
    <table>
      <EnhancedTableHeader table={table} columnWidths={columnWidths} />
    </table>
  );
}

describe('EnhancedTableHeader', () => {
  it('should render header row with correct column headers, sorting behavior, and badges', () => {
    render(<TableHeaderTestWrapper columnWidths={{ name: '120px' }} />);

    expect(screen.getByText('Назва')).toBeInTheDocument();
    expect(screen.getByText('Рік')).toBeInTheDocument();

    const nameCell = screen.getByText('Назва').closest('th');
    const yearCell = screen.getByText('Рік').closest('th');

    expect(nameCell).toHaveStyle('width: 120px');
    expect(nameCell).toHaveStyle('cursor: pointer');
    expect(yearCell).toHaveStyle('cursor: default');

    const nameHeaderBox = screen.getByTestId('EnhancedTableHeader-name');
    fireEvent.click(nameHeaderBox);

    const svgIcons = screen.getAllByTestId('mock-svg');
    expect(svgIcons.length).toBeGreaterThan(0);
  });

  it('handles edge case when column id is missing for fallback path', () => {
    const TableWithMissingId = () => {
      const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
      });

      const originalGetHeaderGroups = table.getHeaderGroups;
      table.getHeaderGroups = () => {
        const groups = originalGetHeaderGroups();
        groups.forEach((group) => {
          group.headers.forEach((header) => {
            header.column.id = undefined as unknown as string;
          });
        });
        return groups;
      };

      return (
        <table>
          <EnhancedTableHeader table={table} />
        </table>
      );
    };

    render(<TableWithMissingId />);
    expect(screen.getByText('Назва')).toBeInTheDocument();
  });
});
