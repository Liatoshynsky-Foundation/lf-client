import { ColumnDef } from '@tanstack/react-table';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CollapsibleRow } from './CollapsibleRow';

jest.mock('./CollapsibleDataRow', () => ({
  CollapsibleDataRow: () => (
    <tr data-testid="collapsible-data-row">
      <td>Row</td>
    </tr>
  )
}));

jest.mock('../../design-system/all-components/icon-button/IconButton', () => ({
  IconButton: ({ children, onClick }: any) => (
    <button onClick={onClick} data-testid="icon-button">
      {children}
    </button>
  )
}));

jest.mock('../../svg-image/SvgImage', () => ({
  SvgImage: ({ alt }: { alt: string }) => <img alt={alt} data-testid="svg-image" />
}));

type MockRow = {
  id: number;
  name: string;
  group: string;
};

const mockData: MockRow[] = [
  { id: 1, name: 'Test 1', group: 'A' },
  { id: 2, name: 'Test 2', group: 'A' }
];

const columns: ColumnDef<MockRow>[] = [
  {
    id: 'expander',
    header: '',
    cell: () => null
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    meta: {
      groupLabelContent: <span data-testid="group-label">Group Label</span>,
      groupCellRenderer: () => <span data-testid="group-renderer">Extra</span>
    }
  }
];

describe('CollapsibleRow', () => {
  it('renders group row with label and icon', () => {
    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={false} onToggle={jest.fn()} columns={columns} />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('group-label')).toBeInTheDocument();
    expect(screen.getByTestId('group-renderer')).toBeInTheDocument();
    expect(screen.getByTestId('svg-image')).toBeInTheDocument();
  });

  it('calls onToggle when icon button is clicked', () => {
    const onToggle = jest.fn();

    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={false} onToggle={onToggle} columns={columns} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('renders all internal rows through CollapsibleDataRow', () => {
    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={true} onToggle={jest.fn()} columns={columns} />
        </tbody>
      </table>
    );

    expect(screen.getAllByTestId('collapsible-data-row')).toHaveLength(2);
  });
});
