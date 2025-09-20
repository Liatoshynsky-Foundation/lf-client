import { ColumnDef } from '@tanstack/react-table';
import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { CollapsibleRow } from './CollapsibleRow';

jest.mock('~/public/icons/chevron-down.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="svg-image" />
}));
jest.mock('~/public/icons/chevron-right.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="svg-image" />
}));

jest.mock('~/ds-components/icon-button/IconButton', () => ({
  IconButton: ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <button data-testid="icon-button" onClick={onClick}>
      {children}
    </button>
  )
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ children }: { children?: React.ReactNode }) => <svg data-testid="svg-image">{children}</svg>
}));

jest.mock('./CollapsibleDataRow', () => ({
  CollapsibleDataRow: ({ row }: { row: { original: { name: string } } }) => (
    <tr data-testid="collapsible-data-row">
      <td>{row.original.name}</td>
    </tr>
  )
}));

const mockData: { id: string; name: string; group: string }[] = [
  { id: '1', name: 'Test 1', group: 'A' },
  { id: '2', name: 'Test 2', group: 'A' }
];

const columns: ColumnDef<(typeof mockData)[number], unknown>[] = [
  { id: 'expander', header: '', cell: () => null },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
    meta: {
      groupLabelContentFactory: () => [
        <span key="label" data-testid="group-label">
          Group Label
        </span>,
        <span key="extra" data-testid="group-extra">
          Extra
        </span>
      ]
    }
  }
];

describe('CollapsibleRow', () => {
  it('should render group header content and icon', () => {
    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={false} action={jest.fn()} columns={columns} />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('group-label')).toBeInTheDocument();
    expect(screen.getByTestId('group-extra')).toBeInTheDocument();
    expect(screen.getByTestId('svg-image')).toBeInTheDocument();
  });

  it('should call action on expander click', () => {
    const onToggle = jest.fn();

    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed={false} action={onToggle} columns={columns} />
        </tbody>
      </table>
    );

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should render internal rows via CollapsibleDataRow when collapsed=true', () => {
    render(
      <table>
        <tbody>
          <CollapsibleRow data={mockData} collapsed action={jest.fn()} columns={columns} />
        </tbody>
      </table>
    );

    const rows = screen.getAllByTestId('collapsible-data-row');
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText('Test 1')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Test 2')).toBeInTheDocument();
  });
});
