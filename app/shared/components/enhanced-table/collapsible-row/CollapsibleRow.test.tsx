import { TableCell } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { CollapsibleRow } from './CollapsibleRow';

type MockRow = {
  id: string;
  name: string;
  group: string;
};

jest.mock('~/public/icons/chevron-down.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="svg-image" />
}));

jest.mock('~/public/icons/chevron-right.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="svg-image" />
}));

jest.mock('./CollapsibleDataRow', () => ({
  CollapsibleDataRow: ({ row }: { row: { original: MockRow } }) => (
    <tr data-testid="collapsible-data-row">
      <td>{row.original.name}</td>
    </tr>
  )
}));

jest.mock('../../design-system/all-components/icon-button/IconButton', () => ({
  IconButton: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button onClick={onClick} data-testid="icon-button">
      {children}
    </button>
  )
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <span data-testid="svg-image" aria-label={alt} />
}));

const mockData: MockRow[] = [
  { id: '1', name: 'Test 1', group: 'A' },
  { id: '2', name: 'Test 2', group: 'A' }
];

const columns: ColumnDef<MockRow>[] = [
  {
    id: 'expander',
    header: '',
    cell: () => null
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    meta: {
      groupLabelContent: (
        <TableCell colSpan={2} data-testid="group-label-cell">
          <span data-testid="group-label">Group Label</span>
        </TableCell>
      ),
      groupCellRenderer: () => <span data-testid="group-renderer">Extra</span>
    }
  }
];

describe('CollapsibleRow', () => {
  it('should render group row with custom TableCell label and icon', () => {
    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={false} action={jest.fn()} columns={columns} />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('group-label')).toBeInTheDocument();
    expect(screen.getByTestId('group-label-cell')).toBeInTheDocument();
    expect(screen.getByTestId('svg-image')).toBeInTheDocument();
  });

  it('should call onToggle when icon button is clicked', () => {
    const onToggle = jest.fn();

    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={false} action={onToggle} columns={columns} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('should render all internal rows through CollapsibleDataRow', () => {
    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={true} action={jest.fn()} columns={columns} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByTestId('collapsible-data-row');
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText('Test 1')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Test 2')).toBeInTheDocument();
  });
});
