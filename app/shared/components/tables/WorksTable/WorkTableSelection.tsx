'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { getWorkTableColumnWidths } from './getColumnWidth';
import {
  RenderActionCell,
  renderAuthorCell,
  RenderAuthorHeader,
  renderNameCell,
  RenderNameHeader,
  renderYearCell,
  RenderYearHeader
} from './WorkTableCells';
import { WorkTable } from '~/types/types/enhancedTable';

import { FilterSelect } from '~/shared/components/design-system/all-components/selector/FilterSelect';
import { TableFilters } from '~/shared/components/design-system/all-components/table-filters/TableFilters';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import { Search } from '~/shared/components/search/Search';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-search/useFetchStaticFilters';
import { useSearch } from '~/shared/hooks/use-search/UseSearch';

export type WorkTableUI = {
  id: string;
  name: string;
  author: string;
  sortableYear: number;
  year: string | number;
  url?: string;
  isPreview?: boolean;
};

export type ScientificFiltersType = {
  titles?: { _id: string; title: string }[];
  authors?: { key: string; name: string }[];
  yearRange?: { minYear?: number; maxYear?: number };
};

// TODO: remove after backend UI-mapping refactor
const mapToUI = (w: any): WorkTableUI => ({
  id: w._id,
  name: w.title,
  author: w.authors.join(', '),
  sortableYear: w.startYear,
  year: w.endYear ? `${w.startYear}-${w.endYear}` : w.startYear,
  url: w.url,
  isPreview: w.isPreview
});

export const WorkTableSection = () => {
  const t = useTranslations('table.work');
  const tFilters = useTranslations('table.work.filters');

  const { data, loadingData, setFilterParam, debouncedSetFilterParam, search, setSearch } = useSearch<WorkTable>({
    dataEndpoint: '/api/scientific-works/data'
  });

  const { data: staticFilters } = useFetchStaticFilters<ScientificFiltersType>('/api/scientific-works/filters');
  const tableData = data.map(mapToUI);

  const bp = useBreakpoints();

  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

  const [authorFilter, setAuthorFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<[number, number]>([defaultMinYear, defaultMaxYear]);

  const handleAuthorChange = useCallback(
    (values: string[]) => {
      setAuthorFilter(values);
      debouncedSetFilterParam('authorIds', values);
    },
    [debouncedSetFilterParam]
  );

  const handleYearChangeCommitted = useCallback(
    (v: [number, number]) => {
      setYearFilter(v);
      setFilterParam({ yearFrom: v[0], yearTo: v[1] });
    },
    [setFilterParam]
  );

  const clearAllFilters = useCallback(() => {
    setAuthorFilter([]);
    setYearFilter([defaultMinYear, defaultMaxYear]);

    setFilterParam({
      authorIds: [],
      yearFrom: null,
      yearTo: null
    });
  }, [setFilterParam, defaultMinYear, defaultMaxYear]);

  const columnWidths = useMemo(
    () =>
      getWorkTableColumnWidths({
        isMobile: bp.isMobile,
        isTablet: bp.isTablet,
        isLaptop: bp.isLaptop,
        isDesktop: bp.isDesktop,
        isLaptopAndAbove: bp.isLaptopAndAbove
      }),
    [bp]
  );

  const columns: ColumnDef<WorkTableUI>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: RenderNameHeader,
      cell: renderNameCell,
      sortingFn: 'alphanumeric'
    },
    {
      id: 'author',
      accessorKey: 'author',
      header: RenderAuthorHeader,
      cell: renderAuthorCell,
      sortingFn: 'alphanumeric'
    },
    {
      id: 'sortableYear',
      accessorKey: 'sortableYear',
      header: RenderYearHeader,
      cell: (info) => renderYearCell(info.row.original.year),
      sortingFn: 'basic'
    },
    {
      id: 'actions',
      header: '',
      cell: RenderActionCell
    }
  ];

  const isYearActive = yearFilter[0] > defaultMinYear || yearFilter[1] < defaultMaxYear;
  const activeFiltersCount = authorFilter.length + (isYearActive ? 1 : 0);
  const isAnyFilterActive = activeFiltersCount > 0;

  const filters = useMemo(
    () => [
      {
        id: 'author',
        isActive: authorFilter.length > 0,
        element: (
          <FilterSelect
            label={tFilters('author')}
            options={(staticFilters?.authors ?? []).map((a) => ({ value: a.key, label: a.name }))}
            defaultValues={authorFilter}
            onAdd={(v, l, all) => handleAuthorChange(all)}
            onRemove={(v, l, all) => handleAuthorChange(all)}
            variant="filled"
          />
        )
      },
      {
        id: 'year',
        isActive: isYearActive,
        isStatic: true,
        element: (
          <YearNumericFilter
            label={tFilters('yearLabel')}
            value={yearFilter}
            onChange={setYearFilter}
            onChangeCommitted={handleYearChangeCommitted}
            minYear={defaultMinYear}
            maxYear={defaultMaxYear}
          />
        )
      }
    ],
    [
      authorFilter,
      yearFilter,
      staticFilters,
      handleAuthorChange,
      handleYearChangeCommitted,
      tFilters,
      defaultMinYear,
      defaultMaxYear,
      isYearActive
    ]
  );

  return (
    <EnhancedTable<WorkTableUI>
      data={tableData}
      loading={loadingData}
      columns={columns}
      columnWidths={columnWidths}
      itemsPerPage={10}
      tableName={t('name')}
      Search={
        <Search
          search={search}
          setSearch={setSearch}
          options={staticFilters?.titles ?? []}
          setFilterParams={setFilterParam}
        />
      }
      Filters={
        <TableFilters isAnyFilterActive={isAnyFilterActive} onClearAllFilters={clearAllFilters} filters={filters} />
      }
      isFiltersActive={isAnyFilterActive}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={clearAllFilters}
    />
  );
};
