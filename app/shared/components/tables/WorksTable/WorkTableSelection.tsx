'use client';

import Box from '@mui/material/Box';
import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { Search } from '../../search/Search';
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

import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';
import { useSearch } from '~/shared/hooks/use-search/UseSearch';

export type AuthorFilterOption = {
  label: string;
  value: string;
};

const mapScientificWorkToWorkTable = (w: any): WorkTable => {
  let yearDisplay: string | number = w.startYear;
  if (w.endYear) {
    yearDisplay = `${w.startYear}-${w.endYear}`;
  }

  const authorsJoined = (w.authors || []).map((a: any) => `${a.name || ''} ${a.surname || ''}`).join(', ');

  return {
    id: w._id?.toString?.() ?? String(w.id ?? ''),
    name: w.title,
    author: authorsJoined,
    year: yearDisplay,
    sortableYear: w.startYear,
    url: w.url,
    isPreview: w.isPreview
  };
};

export default function WorkTableSection() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const t = useTranslations('table.work');

  const {
    search,
    setSearch,
    titles = [],
    loadingTitles,
    data: rawWorks = [],
    loadingData
  } = useSearch<any>({
    titlesEndpoint: ApiRoutes.SCIENTIFIC_AUTHORS,
    dataEndpoint: ApiRoutes.SCIENTIFIC_WORKS,
    filters: columnFilters
  });

  const authorsList: AuthorFilterOption[] = useMemo(
    () =>
      (titles || []).map((tItem: any) => ({
        label:
          typeof tItem.title === 'string' ? tItem.title : (tItem.label ?? `${tItem.name ?? ''} ${tItem.surname ?? ''}`),
        value: tItem.value ?? tItem._id ?? tItem.id ?? tItem.label
      })),
    [titles]
  );

  const mappedWorks = useMemo(() => (rawWorks || []).map(mapScientificWorkToWorkTable), [rawWorks]);

  const minYear = 1900;
  const maxYear = new Date().getFullYear();

  const currentAuthorFilter = (columnFilters.find((f) => f.id === 'author')?.value as string[]) || [];
  const currentYearFilter = (columnFilters.find((f) => f.id === 'year')?.value as [number, number]) || [
    minYear,
    maxYear
  ];

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
        data={mappedWorks}
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
        Search={<Search<any> search={search} setSearch={setSearch} options={mappedWorks} loading={loadingData} />}
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
        loading={loadingData || loadingTitles}
      />
    </Box>
  );
}
