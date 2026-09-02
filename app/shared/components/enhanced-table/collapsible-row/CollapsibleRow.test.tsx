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
  CollapsibleDataRow: ({ row, isExpanded }: { row: { original: { name: string } }; isExpanded: boolean }) => (
    <tr data-testid="collapsible-data-row" data-expanded={String(isExpanded)}>
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
    isExpanded: false,
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

  it('should pass expanded state to CollapsibleDataRow when isExpanded=true', () => {
    renderComponent({ isExpanded: true });

    const rows = screen.getAllByTestId('collapsible-data-row');
    expect(rows).toHaveLength(2);
    expect(rows[0]).toHaveAttribute('data-expanded', 'true');
    expect(within(rows[0]).getByText('Test 1')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Test 2')).toBeInTheDocument();
  });

  it.each([
    { isExpanded: true, value: 'Collapse row group' },
    { isExpanded: false, value: 'Expand row group' }
  ])('should display correct ARIA label when isExpanded is $isExpanded', ({ isExpanded, value }) => {
    renderComponent({
      isExpanded,
      columns: [{ id: 'expander', header: '', cell: () => null }]
    });
    const toggle = screen.getByTestId('CollapsibleRow-mainOpus-toggle');
    expect(toggle).toHaveAttribute('aria-label', value);
    expect(screen.getByTestId('CollapsibleRow-mainOpus')).toHaveAttribute('aria-expanded', String(isExpanded));
  });

  it('should render the toggle button with correct focus styles when navigate using keyboard', async () => {
    const user = userEvent.setup();

    renderComponent({
      isExpanded: true,
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
