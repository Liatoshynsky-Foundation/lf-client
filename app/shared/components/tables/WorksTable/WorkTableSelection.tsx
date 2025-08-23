'use client';

import Box from '@mui/material/Box';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useState } from 'react';

import EnhancedTable from '../../enhanced-table/EnhancedTable';
import { WorkTableFilters } from './filters/Filters';
import {
  RenderActionCell,
  renderAuthorCell,
  RenderAuthorHeader,
  renderNameCell,
  RenderNameHeader,
  renderYearCell,
  RenderYearHeader
} from './WorkTableCells';
import { ApiRoutes } from '~/constants/routes/api-routes';
import { WorkTable } from '~/types/types/enhancedTable';

import { useSearch } from '~/shared/hooks/use-search/UseSearch';

export type AuthorFilterOption = {
  label: string;
  value: string;
};

export default function WorkTableSection() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const t = useTranslations('table.work');

  const currentAuthorFilter = (columnFilters.find((f) => f.id === 'author')?.value as string[]) || [];
  const currentYearFilter = (columnFilters.find((f) => f.id === 'year')?.value as [number, number]) || [];

  const { data: authorsList = [], loadingTitles: loadingAuthors } = useSearch<AuthorFilterOption>({
    titlesEndpoint: ApiRoutes.SCIENTIFIC_AUTHORS,
    dataEndpoint: ApiRoutes.SCIENTIFIC_AUTHORS
  });

  const { data: works = [], loadingData: isLoading } = useSearch<WorkTable>({
    titlesEndpoint: ApiRoutes.SCIENTIFIC_WORKS,
    dataEndpoint: ApiRoutes.SCIENTIFIC_WORKS
  });

  const minYear = 1900;
  const maxYear = new Date().getFullYear();

  const isFiltersActive = columnFilters.length > 0;
  const activeFiltersCount = columnFilters.length;

  const handleAuthorFilterChange = useCallback((authors: string[]) => {
    setColumnFilters((prev) => {
      const without = prev.filter((f) => f.id !== 'author');
      return authors.length ? [...without, { id: 'author', value: authors }] : without;
    });
  }, []);

  const handleYearFilterChange = useCallback(
    (years: [number, number]) => {
      setColumnFilters((prev) => {
        const without = prev.filter((f) => f.id !== 'year');
        const isDefault = years[0] === minYear && years[1] === maxYear;
        return isDefault ? without : [...without, { id: 'year', value: years }];
      });
    },
    [minYear, maxYear]
  );

  const onClearAllFilters = useCallback(() => {
    setColumnFilters([]);
  }, []);

  const columns: ColumnDef<WorkTable>[] = [
    {
      accessorKey: 'name',
      header: RenderNameHeader,
      cell: renderNameCell,
      sortingFn: 'alphanumeric'
    },
    {
      accessorKey: 'author',
      header: RenderAuthorHeader,
      cell: renderAuthorCell,
      sortingFn: 'alphanumeric'
    },
    {
      accessorKey: 'sortableYear',
      header: RenderYearHeader,
      cell: (info) => {
        const originalData = info.row.original;
        return renderYearCell(originalData.year);
      },
      sortingFn: 'basic'
    },
    {
      id: 'actions',
      header: '',
      cell: RenderActionCell
    }
  ];

  return (
    <Box
      sx={{
        '& .MuiTableRow-root': {
          '& td': {
            verticalAlign: 'top'
          }
        },
        gridColumn: '1/-1',
        width: '100%'
      }}
    >
      <EnhancedTable
        data={works}
        columns={columns}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        columnWidths={{
          name: '57%',
          author: '17%',
          year: '8%',
          actions: 'auto'
        }}
        itemsPerPage={10}
        tableName={t('name')}
        Filters={
          <WorkTableFilters
            authors={authorsList}
            authorFilter={currentAuthorFilter}
            onAuthorFilterChange={handleAuthorFilterChange}
            yearFilter={currentYearFilter}
            onYearFilterChange={handleYearFilterChange}
            onClearAllFilters={onClearAllFilters}
          />
        }
        isFiltersActive={isFiltersActive}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={onClearAllFilters}
        loading={isLoading || loadingAuthors}
      />
    </Box>
  );
}
