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
import { ApiRoutes } from '~/constants/routes/api-routes';

import { ScientificWorkTableRow } from '~/domain/dto/scientificWorks.dto';
import { FilterSelect } from '~/shared/components/design-system/all-components/selector/FilterSelect';
import { TableFilters } from '~/shared/components/design-system/all-components/table-filters/TableFilters';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import { Search } from '~/shared/components/search/Search';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-search/useFetchStaticFilters';
import { useSearch } from '~/shared/hooks/use-search/useSearch';

type Filters = {
  search: string;
  authorIds?: string[];
  yearFrom?: number | null;
  yearTo?: number | null;
};

type ScientificFiltersType = {
  titles?: { _id: string; title: string }[];
  authors?: { key: string; name: string }[];
  yearRange?: { minYear?: number; maxYear?: number };
};

export const WorkTableSection = () => {
  const t = useTranslations('table.work');
  const tFilters = useTranslations('table.work.filters');

  const {
    data,
    isLoading: loadingData,
    params,
    updateParams,
    debouncedUpdateParam,
    resetParams
  } = useSearch<ScientificWorkTableRow, Filters>({
    dataEndpoint: ApiRoutes.SCIENTIFIC_WORKS_DATA,
    initialParams: {
      search: '',
      authorIds: []
    }
  });

  const { data: staticFilters } = useFetchStaticFilters<ScientificFiltersType>(ApiRoutes.SCIENTIFIC_WORKS_FILTERS);

  const bp = useBreakpoints();

  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

  const [authorFilter, setAuthorFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<[number, number]>([defaultMinYear, defaultMaxYear]);

  const handleAuthorChange = useCallback(
    (values: string[]) => {
      setAuthorFilter(values);
      debouncedUpdateParam('authorIds', values);
    },
    [debouncedUpdateParam]
  );

  const handleYearChangeCommitted = useCallback(
    (v: [number, number]) => {
      setYearFilter(v);
      updateParams((prev) => ({
        ...prev,
        yearFrom: v[0],
        yearTo: v[1]
      }));
    },
    [updateParams]
  );

  const clearAllFilters = useCallback(() => {
    setAuthorFilter([]);
    setYearFilter([defaultMinYear, defaultMaxYear]);
    resetParams();
  }, [resetParams, defaultMinYear, defaultMaxYear]);

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

  const columns: ColumnDef<ScientificWorkTableRow>[] = [
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
            options={(staticFilters?.authors ?? []).map((a) => ({
              value: a.key,
              label: a.name
            }))}
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
    <EnhancedTable<ScientificWorkTableRow>
      data={data}
      loading={loadingData}
      columns={columns}
      columnWidths={columnWidths}
      itemsPerPage={10}
      tableName={t('name')}
      Search={
        <Search
          search={params.search}
          setSearch={(value) => debouncedUpdateParam('search', value)}
          options={staticFilters?.titles ?? []}
          setFilterParams={(next) =>
            updateParams((prev) => ({
              ...prev,
              ...next
            }))
          }
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
