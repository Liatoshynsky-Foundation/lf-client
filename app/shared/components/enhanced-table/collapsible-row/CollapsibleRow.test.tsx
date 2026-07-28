import { ColumnDef } from '@tanstack/react-table';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CollapsibleRow, type CollapsibleRowProps } from './CollapsibleRow';

jest.mock('~/public/icons/chevron-down.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="svg-image" />
}));
jest.mock('~/public/icons/chevron-right.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="svg-image" />
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

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      'collapsibleRow.expand': 'Expand row group',
      'collapsibleRow.collapse': 'Collapse row group'
    };
    return messages[key] ?? key;
  }
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

type MockRowData = (typeof mockData)[0];

const renderComponent = (props: Partial<CollapsibleRowProps<MockRowData>> = {}) => {
  const defaultProps: CollapsibleRowProps<MockRowData> = {
    data: mockData,
    collapsed: false,
    action: jest.fn(),
    columns,
    ...props
  };

  return render(
    <table>
      <tbody>
        <CollapsibleRow {...defaultProps} />
      </tbody>
    </table>
  );
};

describe('CollapsibleRow', () => {
  it('should render group header content and icon', () => {
    renderComponent();

    expect(screen.getByTestId('group-label')).toBeInTheDocument();
    expect(screen.getByTestId('group-extra')).toBeInTheDocument();
    expect(screen.getByTestId('svg-image')).toBeInTheDocument();
  });

  it('should call action on expander click', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    renderComponent({ action: onToggle });

    await user.click(screen.getByTestId('CollapsibleRow-mainOpus-toggle'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should call action on row click', async () => {
    const user = userEvent.setup();
    const onToggle = jest.fn();

    renderComponent({ action: onToggle });

    await user.click(screen.getByTestId('CollapsibleRow-mainOpus-name'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('should render internal rows via CollapsibleDataRow when collapsed=true', () => {
    renderComponent({ collapsed: true });

    const rows = screen.getAllByTestId('collapsible-data-row');
    expect(rows).toHaveLength(2);
    expect(within(rows[0]).getByText('Test 1')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Test 2')).toBeInTheDocument();
  });

  it.each([
    { collapsed: true, value: 'Expand row group' },
    { collapsed: false, value: 'Collapse row group' }
  ])('should display correct ARIA labels for a row toggle when collapsed $collapsed', ({ collapsed, value }) => {
    renderComponent({
      collapsed,
      columns: [{ id: 'expander', header: '', cell: () => null }]
    });
    const toggle = screen.getByTestId('CollapsibleRow-mainOpus-toggle');
    expect(toggle).toHaveAttribute('aria-label', value);
  });

  it('should render the toggle button with correct focus styles when navigate using keyboard', async () => {
    const user = userEvent.setup();

    renderComponent({
      collapsed: true,
      columns: [{ id: 'expander', header: '', cell: () => null }]
    });

    const toggle = screen.getByTestId('CollapsibleRow-mainOpus-toggle');
    await user.tab();

    expect(toggle).toHaveFocus();
    expect(toggle).toHaveStyle({
      outline: '2px solid black'
    });
  });
});
