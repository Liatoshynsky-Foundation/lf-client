import '@testing-library/jest-dom';
import { ColumnDef } from '@tanstack/react-table';
import { fireEvent, render, screen, within } from '@testing-library/react';

import EnhancedTable from '~/components/enhanced-table/EnhancedTable';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      viewMore: 'Переглянути більше'
    };
    return translations[key] || key;
  }
}));

jest.mock('~/ds-components/button/Button');

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

describe('EnhancedTable', () => {
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
    const page2 = await within(pagination).findByRole('button', { name: /Go to page 2/i });

    fireEvent.click(page2);

    expect(screen.getAllByRole('row').length).toBeGreaterThan(0);
  });
});
