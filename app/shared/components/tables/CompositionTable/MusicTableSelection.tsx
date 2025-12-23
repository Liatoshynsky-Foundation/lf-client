'use client';

import { type ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { getCompositionColumnWidths } from './getColumnWidth';
import {
  RenderActionsCell,
  RenderExpanderCell,
  RenderGenreCell,
  RenderGenreHeader,
  renderNameCell,
  RenderNameHeader,
  renderOpusGroupLabel,
  RenderOpusHeader,
  renderOpusTitleGroupLabel,
  RenderPlayCell,
  renderYearCell,
  RenderYearHeader
} from './MusicTableCells';
import TableNoResultsFound from './no-results-found/TableNoResultsFound';
import { ApiRoutes } from '~/constants/routes/api-routes';
import { CompositionWithNotes, Music } from '~/types/types/enhancedTable';
import { Notes } from '~/types/types/getNotes.types';
import { CompositionsFilters, CompositionsFiltersType } from '~/types/types/tableFilters.types';

import { CompositionTitlesDTO } from '~/domain/dto/composition.dto';
import { FilterSelect } from '~/shared/components/design-system/all-components/selector/FilterSelect';
import { TableFilters } from '~/shared/components/design-system/all-components/table-filters/TableFilters';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import GetNotesModal from '~/shared/components/get-notes-modal/GetNotesModal';
import { Search } from '~/shared/components/search/Search';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-fetch-static-filters/useFetchStaticFilters';
import { useTableData } from '~/shared/hooks/use-table-data/useTableData';
import { useTableFilters } from '~/shared/hooks/use-table-filters/useTableFilters';
import { useFilterAutocomplete } from '~/shared/hooks/useFilterAutocomplete/useFilterAutocomplete';

type TableKey = 'mobile' | 'tablet' | 'desktop';

export default function MusicTableSection() {
  const t = useTranslations('table.composition');
  const tFilters = useTranslations('table.composition.filters');

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalNotes, setModalNotes] = useState<Notes[]>([]);
  const [compositionName, setCompositionName] = useState<string>('');

  const { params, setParam, debouncedSetParam, resetFilters } = useTableFilters<CompositionsFilters>({
    search: '',
    genre: [],
    category: [],
    yearFrom: null,
    yearTo: null
  });

  const { data: staticFilters } = useFetchStaticFilters<CompositionsFiltersType>(ApiRoutes.COMPOSITION_FILTERS ?? null);

  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

  const { data = [], isLoading: loadingData } = useTableData<Music, CompositionsFilters>(
    ApiRoutes.COMPOSITION_DATA,
    params
  );

  type TitleOption = CompositionTitlesDTO;

  const selectTitles = useCallback((json: unknown) => (json as { titles: TitleOption[] }).titles, []);

  const { options: titleOptions } = useFilterAutocomplete<CompositionsFilters, TitleOption>({
    endpoint: ApiRoutes.COMPOSITION_TITLES,
    params,
    select: selectTitles
  });

  const bp = useBreakpoints();
  const { isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove } = bp;

  const columnWidths = useMemo(
    () =>
      getCompositionColumnWidths({
        isMobile,
        isTablet,
        isLaptop,
        isDesktop,
        isLaptopAndAbove
      }),
    [isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove]
  );

  const baseColumns: ColumnDef<Music>[] = useMemo(
    () => [
      { id: 'expander', header: '', cell: RenderExpanderCell },
      {
        id: 'opus',
        header: RenderOpusHeader,
        cell: () => null,
        meta: { groupLabelContentFactory: renderOpusGroupLabel }
      },
      { id: 'play', header: '', cell: RenderPlayCell },
      {
        id: 'name',
        accessorKey: 'name',
        header: RenderNameHeader,
        cell: renderNameCell,
        enableSorting: false,
        meta: { groupLabelContentFactory: (items: Music[]) => renderOpusTitleGroupLabel(items) }
      },
      {
        id: 'year',
        accessorKey: 'year',
        header: RenderYearHeader,
        cell: renderYearCell,
        enableSorting: false
      },
      {
        id: 'genre',
        accessorKey: 'genre',
        header: RenderGenreHeader,
        cell: RenderGenreCell,
        enableSorting: false
      },
      {
        id: 'actions',
        header: '',
        cell: (info) => RenderActionsCell(info, handleOpenModal)
      }
    ],
    []
  );

  const hiddenOnSmall = useMemo(() => new Set(['opus', 'year', 'genre', 'play']), []);
  const columns: ColumnDef<Music>[] = useMemo(
    () => (bp.isTablet || bp.isMobile ? baseColumns.filter((c) => !hiddenOnSmall.has(String(c.id))) : baseColumns),
    [bp.isTablet, bp.isMobile, baseColumns, hiddenOnSmall]
  );

  const tableKey: TableKey = (bp.isMobile && 'mobile') || (bp.isTablet && 'tablet') || 'desktop';

  const handleGenreChange = useCallback(
    (values: string[]) => {
      setParam('genre', values);
    },
    [setParam]
  );

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

  const handleOpenModal = ({ composition, notes }: CompositionWithNotes) => {
    setCompositionName(composition);
    setModalNotes(notes);
    setIsModalOpened(true);
  };

  const handleCloseModal = () => {
    setIsModalOpened(false);
    setCompositionName('');
    setModalNotes([]);
  };

  const currentYearFrom = params.yearFrom ?? defaultMinYear;
  const currentYearTo = params.yearTo ?? defaultMaxYear;

  const isYearActive = currentYearFrom !== defaultMinYear || currentYearTo !== defaultMaxYear;
  const genreCount = params.genre?.length ?? 0;
  const categoryCount = params.category?.length ?? 0;

  const activeFiltersCount = genreCount + categoryCount + (isYearActive ? 1 : 0);
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
        id: 'genre',
        isActive: genreCount > 0,
        element: (
          <FilterSelect
            label={tFilters('genre')}
            options={(staticFilters?.genres ?? []).map((g) => ({ value: g.key, label: g.name }))}
            defaultValues={params.genre ?? []}
            variant="filled"
            onAdd={(_, __, all) => handleGenreChange(all)}
            onRemove={(_, __, all) => handleGenreChange(all)}
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
      params.genre,
      categoryCount,
      genreCount,
      staticFilters,
      isYearActive,
      currentYearFrom,
      currentYearTo,
      defaultMinYear,
      defaultMaxYear,
      handleCategoryChange,
      handleGenreChange,
      handleYearChange,
      tFilters
    ]
  );

  return (
    <>
      <EnhancedTable
        key={tableKey}
        data={data}
        loading={loadingData}
        columns={columns}
        groupByKey="opus"
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
      />
      <GetNotesModal
        key={modalNotes[0]?.dateUploaded}
        composition={compositionName}
        notes={modalNotes}
        handleClose={handleCloseModal}
        opened={isModalOpened}
      />
    </>
  );
}
