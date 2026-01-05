'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo } from 'react';

import TableNoResultsFound from '../CompositionTable/no-results-found/TableNoResultsFound';
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
import { ScientificFiltersType, WorkTableFilters } from '~/types/types/tableFilters.types';

import { ScientificWorkTableRow } from '~/domain/dto/scientificWorks.dto';
import { FilterSelect } from '~/shared/components/design-system/all-components/selector/FilterSelect';
import { TableFilters } from '~/shared/components/design-system/all-components/table-filters/TableFilters';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import { Search } from '~/shared/components/search/Search';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters';
import { useTableData } from '~/shared/hooks/use-table-data/useTableData';
import { useTableFilters } from '~/shared/hooks/use-table-filters/useTableFilters';
import { useFilterAutocomplete } from '~/shared/hooks/useFilterAutocomplete/useFilterAutocomplete';

export const WorkTableSection = () => {
  const t = useTranslations('table.work');
  const tFilters = useTranslations('table.work.filters');

  const { params, setParam, debouncedSetParam, resetFilters } = useTableFilters<WorkTableFilters>({
    search: '',
    author: [],
    yearFrom: null,
    yearTo: null
  });

  const { data: staticFilters } = useFetchStaticFilters<ScientificFiltersType>(ApiRoutes.SCIENTIFIC_WORKS_FILTERS);

  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

  const { data, isLoading } = useTableData<ScientificWorkTableRow, WorkTableFilters>(
    ApiRoutes.SCIENTIFIC_WORKS_DATA,
    params
  );

  type TitleOption = ScientificFiltersType['titles'][number];

  const selectTitles = useCallback((json: unknown) => (json as { titles: TitleOption[] }).titles, []);

  const { options: titleOptions } = useFilterAutocomplete<WorkTableFilters, TitleOption>({
    endpoint: ApiRoutes.SCIENTIFIC_WORKS_TITLES,
    params,
    select: selectTitles
  });

  const bp = useBreakpoints();

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

  const handleYearChange = useCallback(
    (v: [number, number]) => {
      setParam('yearFrom', v[0]);
      setParam('yearTo', v[1]);
    },
    [setParam]
  );

  let columns = useMemo<ColumnDef<ScientificWorkTableRow>[]>(
    () => [
      { id: 'name', accessorKey: 'name', header: RenderNameHeader, cell: renderNameCell, sortingFn: 'alphanumeric' },
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
        sortingFn: 'basic',
        sortDescFirst: false
      },
      { id: 'actions', header: '', cell: RenderActionCell }
    ],
    []
  );

  const hideColumnsOnSmallScreen = useMemo(() => new Set(['author', 'sortableYear']), []);

  columns = useMemo<ColumnDef<ScientificWorkTableRow>[]>(
    () => (bp.isTablet || bp.isMobile ? columns.filter((c) => !hideColumnsOnSmallScreen.has(String(c.id))) : columns),
    [bp.isTablet, bp.isMobile, columns, hideColumnsOnSmallScreen]
  );

  const isYearActive =
    (params.yearFrom !== null && params.yearFrom !== defaultMinYear) ||
    (params.yearTo !== null && params.yearTo !== defaultMaxYear);

  const isAuthorActive = params.author.length > 0;

  const activeFiltersCount = params.author.length + (isYearActive ? 1 : 0);
  const isAnyFilterActive = activeFiltersCount > 0;

  const filters = useMemo(
    () => [
      {
        id: 'author',
        isActive: isAuthorActive,
        element: (
          <FilterSelect
            label={tFilters('author')}
            options={(staticFilters?.authors ?? []).map((a) => ({
              value: a.key,
              label: a.name
            }))}
            defaultValues={params.author}
            onAdd={(v, l, all) => setParam('author', all)}
            onRemove={(v, l, all) => setParam('author', all)}
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
            value={[params.yearFrom ?? defaultMinYear, params.yearTo ?? defaultMaxYear]}
            onChange={handleYearChange}
            onChangeCommitted={handleYearChange}
            minYear={defaultMinYear}
            maxYear={defaultMaxYear}
          />
        )
      }
    ],
    [
      isAuthorActive,
      tFilters,
      staticFilters?.authors,
      params.author,
      params.yearFrom,
      params.yearTo,
      isYearActive,
      defaultMinYear,
      defaultMaxYear,
      handleYearChange,
      setParam
    ]
  );

  return (
    <EnhancedTable<ScientificWorkTableRow>
      data={data}
      noResults={<TableNoResultsFound />}
      loading={isLoading}
      columns={columns}
      columnWidths={columnWidths}
      itemsPerPage={10}
      tableName={t('name')}
      Search={
        <Search
          search={params.search}
          setSearch={(value) => debouncedSetParam('search', value)}
          options={titleOptions}
        />
      }
      Filters={
        <TableFilters isAnyFilterActive={isAnyFilterActive} onClearAllFilters={resetFilters} filters={filters} />
      }
      isFiltersActive={isAnyFilterActive}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={resetFilters}
      tableContainerSx={{ mt: { xs: '80px', md: '88px' }, mb: { xs: '120px', md: '160px' } }}
    />
  );
};
