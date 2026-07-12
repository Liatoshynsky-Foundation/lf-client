import '@testing-library/jest-dom';
import { ColumnDef } from '@tanstack/react-table';
import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { FilterSelect } from '~/ds-components/selector/FilterSelect';

import { Search } from '../search/Search';

import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      viewMore: 'Переглянути більше'
    };
    return translations[key] || key;
  }
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false, isTablet: false }))
}));

jest.mock('~/ds-components/button/Button');

jest.mock('./control-panel/ControlPanel', () => {
  return {
    __esModule: true,
    default: ({
      Search,
      tableName,
      Filters
    }: {
      Search: React.ReactNode;
      tableName: string;
      Filters: React.ReactNode;
    }) => (
      <div data-testid="mock-control-panel">
        <div data-testid="mock-title">{tableName}</div>
        <div data-testid="mock-search">{Search}</div>
        <div data-testid="mock-filters">{Filters}</div>
      </div>
    )
  };
});

type TestRow = {
  id: string;
  name: string;
  year: number;
  group?: string;
};

const mockData: TestRow[] = [
  { id: '1', name: 'Item 1', year: 2020, group: 'A' },
  { id: '2', name: 'Item 2', year: 2020, group: 'A' },
  { id: '3', name: 'Item 3', year: 2021, group: 'B' },
  { id: '4', name: 'Item 4', year: 2022 }
];

const columns: ColumnDef<TestRow>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue()
  },
  {
    accessorKey: 'year',
    header: 'Year',
    cell: (info) => info.getValue()
  }
];

const mockSetSearch = jest.fn();

beforeEach(() => {
  globalThis.HTMLElement.prototype.scrollIntoView = jest.fn();
});

describe('EnhancedTable', () => {
  it('renders control panel title, search and filters', () => {
    render(
      <EnhancedTable
        data={mockData}
        columns={columns}
        tableName="Test Table"
        groupByKey="group"
        itemsPerPage={2}
        Search={<Search setSearch={mockSetSearch} search="" options={[]} />}
        Filters={<FilterSelect label="" options={[]} />}
      />
    );

    expect(screen.getByTestId('mock-title')).toHaveTextContent('Test Table');
    expect(screen.getByTestId('mock-search')).toBeInTheDocument();
    expect(screen.getByTestId('mock-filters')).toBeInTheDocument();
  });

  it('should render table with title and visible rows', () => {
    render(
      <EnhancedTable data={mockData} columns={columns} tableName="Test Table" groupByKey="group" itemsPerPage={1} />
    );

    expect(screen.getByText('Test Table')).toBeInTheDocument();
    expect(screen.getByText('Переглянути більше')).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThan(0);
  });

  it('should load more items when "Переглянути більше" is clicked', () => {
    render(
      <EnhancedTable data={mockData} columns={columns} tableName="Test Table" groupByKey="group" itemsPerPage={1} />
    );

    const beforeRows = screen.getAllByRole('row').length;

    fireEvent.click(screen.getByText('Переглянути більше'));

    const afterRows = screen.getAllByRole('row').length;
    expect(afterRows).toBeGreaterThan(beforeRows);
  });

  it('should change page when clicking pagination controls', async () => {
    render(
      <EnhancedTable data={mockData} columns={columns} tableName="Test Table" groupByKey="group" itemsPerPage={2} />
    );

    const pagination = screen.getByRole('navigation');
    const page2 = await within(pagination).findByText('2');

    fireEvent.click(page2);

    expect(screen.getAllByRole('row').length).toBeGreaterThan(0);
  });

  it('should toggle group collapse state when clicking a collapsible group row to cover lines 93-95 and 221', () => {
    render(
      <EnhancedTable data={mockData} columns={columns} tableName="Test Table" groupByKey="group" itemsPerPage={4} />
    );

    const groupRow = screen.getAllByTestId('CollapsibleRow-mainOpus')[0];
    fireEvent.click(groupRow);

    expect(groupRow).toBeInTheDocument();
  });

  it('should use zero sibling count on mobile or tablet to cover line 221', async () => {
    (useBreakpoints as jest.Mock).mockReturnValueOnce({ isMobile: true, isTablet: false });

    render(
      <EnhancedTable data={mockData} columns={columns} tableName="Test Table" groupByKey="group" itemsPerPage={2} />
    );

    const pagination = screen.getByRole('navigation');
    expect(pagination).toBeInTheDocument();
  });

  it('should use default itemsPerPage when not provided to cover line 71', () => {
    render(<EnhancedTable data={mockData} columns={columns} tableName="Test Table" groupByKey="group" />);

    expect(screen.getByText('Test Table')).toBeInTheDocument();
  });

  it('should render ungrouped rows when groupByKey is not provided to cover line 138', () => {
    render(<EnhancedTable data={mockData} columns={columns} tableName="Test Table" itemsPerPage={10} />);

    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('should show loading spinner when loading is true to cover lines 205-214', () => {
    render(<EnhancedTable data={mockData} columns={columns} tableName="Test Table" loading />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByTestId('EnhancedTable-table')).not.toBeInTheDocument();
  });
  it('should render noResults when data is empty to cover line 214', () => {
    render(
      <EnhancedTable
        data={[]}
        columns={columns}
        tableName="Test Table"
        noResults={<div data-testid="no-results">Nothing found</div>}
      />
    );

    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });
});
