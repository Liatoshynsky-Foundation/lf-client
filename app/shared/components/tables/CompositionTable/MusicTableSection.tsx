'use client';

import { ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import TableNoResultsFound from './no-results-found/TableNoResultsFound';
import { useMusicTableColumns } from './useMusicTableColumns';
import { ApiRoutes } from '~/constants/routes/api-routes';
import { CompositionWithNotes } from '~/types/types/enhancedTable';
import { CompositionsFilters, CompositionsFiltersType } from '~/types/types/tableFilters.types';

import { OpusListDTO, SearchAutocompleteDTO } from '~/domain/dto/composition.dto';
import { MusicItem } from '~/domain/entities/artistry.entity';
import { FilterSelect } from '~/shared/components/design-system/all-components/selector/FilterSelect';
import { TableFilters } from '~/shared/components/design-system/all-components/table-filters/TableFilters';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import GetNotesModal from '~/shared/components/get-notes-modal/GetNotesModal';
import { Search } from '~/shared/components/search/Search';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters';
import { useGroupedCompositions } from '~/shared/hooks/use-grouped-composiions/useGroupedCompositions';
import { useTableData } from '~/shared/hooks/use-table-data/useTableData';
import { useTableFilters } from '~/shared/hooks/use-table-filters/useTableFilters';
import { useFilterAutocomplete } from '~/shared/hooks/useFilterAutocomplete/useFilterAutocomplete';

type TableKey = 'mobile' | 'tablet' | 'desktop';
type TitlesAutocompleteParams = Omit<CompositionsFilters, 'search'>;

export default function MusicTableSection() {
  const t = useTranslations('table.composition');
  const tFilters = useTranslations('table.composition.filters');

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalNotes, setModalNotes] = useState<MusicItem[]>([]);
  const [compositionName, setCompositionName] = useState<string>('');

  const { params, setParam, debouncedSetParam, resetFilters } = useTableFilters<CompositionsFilters>({
    search: '',
    category: [],
    yearFrom: null,
    yearTo: null
  });

  const { data: staticFilters } = useFetchStaticFilters<CompositionsFiltersType>(ApiRoutes.COMPOSITION_FILTERS ?? null);

  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

  const { data: rawData = [], isLoading: loadingData } = useTableData<OpusListDTO, CompositionsFilters>(
    ApiRoutes.COMPOSITION_DATA,
    params
  );

  const preGroupedData = useGroupedCompositions(rawData);
  const selectTitles = useCallback((json: unknown) => (json as { names: SearchAutocompleteDTO[] }).names, []);
  const titleParams = useMemo(() => {
    const { search: _, ...rest } = params;
    return rest;
  }, [params]);

  const { options: titleOptions } = useFilterAutocomplete<TitlesAutocompleteParams, SearchAutocompleteDTO>({
    endpoint: ApiRoutes.COMPOSITION_TITLES,
    params: titleParams,
    select: selectTitles
  });

  const bp = useBreakpoints();

  const handleOpenModal = useCallback(({ composition, notes }: CompositionWithNotes) => {
    setCompositionName(composition);
    setModalNotes(notes);
    setIsModalOpened(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpened(false);
    setCompositionName('');
    setModalNotes([]);
  }, []);

  const { columns, columnWidths } = useMusicTableColumns({
    breakpoints: bp,
    onOpenModal: handleOpenModal
  });

  const tableKey: TableKey = (bp.isMobile && 'mobile') || (bp.isTablet && 'tablet') || 'desktop';

  const handleCategoryChange = useCallback(
    (values: string[]) => {
      setParam('category', values);
    },
    [setParam]
  );

  const handleYearChange = useCallback(
    (v: [number, number]) => {
      setParam('yearFrom', v[0]);
      setParam('yearTo', v[1]);
    },
    [setParam]
  );

  const currentYearFrom = params.yearFrom ?? defaultMinYear;
  const currentYearTo = params.yearTo ?? defaultMaxYear;

  const isYearActive = currentYearFrom !== defaultMinYear || currentYearTo !== defaultMaxYear;
  const categoryCount = params.category?.length ?? 0;

  const activeFiltersCount = categoryCount + (isYearActive ? 1 : 0);
  const isAnyFilterActive = activeFiltersCount > 0;

  const filters = useMemo(
    () => [
      {
        id: 'category',
        isActive: categoryCount > 0,
        element: (
          <FilterSelect
            label={tFilters('category')}
            options={(staticFilters?.categories ?? []).map((c) => ({ value: c.key, label: c.name }))}
            defaultValues={params.category ?? []}
            variant="filled"
            onAdd={(_, __, all) => handleCategoryChange(all)}
            onRemove={(_, __, all) => handleCategoryChange(all)}
          />
        )
      },
      {
        id: 'year',
        isActive: isYearActive,
        isStatic: true,
        element: (
          <YearNumericFilter
            label={tFilters('year')}
            value={[currentYearFrom, currentYearTo]}
            onChange={handleYearChange}
            onChangeCommitted={handleYearChange}
            minYear={defaultMinYear}
            maxYear={defaultMaxYear}
          />
        )
      }
    ],
    [
      params.category,
      categoryCount,
      staticFilters,
      isYearActive,
      currentYearFrom,
      currentYearTo,
      defaultMinYear,
      defaultMaxYear,
      handleCategoryChange,
      handleYearChange,
      tFilters
    ]
  );

  return (
    <>
      <EnhancedTable
        key={tableKey}
        data={[]}
        preGroupedData={preGroupedData}
        isSearchActive={!!params.search}
        loading={loadingData}
        columns={columns}
        columnFilters={columnFilters}
        onColumnFiltersChange={setColumnFilters}
        columnWidths={columnWidths}
        itemsPerPage={10}
        noResults={<TableNoResultsFound />}
        tableName={t('name.composition')}
        Search={
          <Search search={params.search} setSearch={(v) => debouncedSetParam('search', v)} options={titleOptions} />
        }
        Filters={
          <TableFilters isAnyFilterActive={isAnyFilterActive} onClearAllFilters={resetFilters} filters={filters} />
        }
        isFiltersActive={isAnyFilterActive}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={resetFilters}
        tableContainerSx={{ mt: { xs: '80px', md: '88px', xl: '152px' }, mb: { xs: '120px', md: '160px' } }}
      />
      <GetNotesModal
        key={modalNotes[0]?.publishDate || ''}
        composition={compositionName}
        notes={modalNotes}
        handleClose={handleCloseModal}
        opened={isModalOpened}
      />
    </>
  );
}
