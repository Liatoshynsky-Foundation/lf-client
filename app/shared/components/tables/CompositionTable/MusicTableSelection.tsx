'use client';
import { type ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getCompositionColumnWidths } from './getColumnWidth';
import {
  RenderActionsCell,
  RenderExpanderCell,
  RenderGenreCell,
  RenderGenreHeader,
  renderGroupActions,
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

import { CategoryNameDTO, GenreNameDTO, TitlesDTO } from '~/domain/dto/table.dto';
import { FilterSelect } from '~/shared/components/design-system/all-components/selector/FilterSelect';
import { TableFilters } from '~/shared/components/design-system/all-components/table-filters/TableFilters';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import GetNotesModal from '~/shared/components/get-notes-modal/GetNotesModal';
import { Search } from '~/shared/components/search/Search';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-search/useFetchStaticFilters';
import { useSearch } from '~/shared/hooks/use-search/useSearch';

type TableKey = 'mobile' | 'tablet' | 'desktop';

type StaticFiltersType = {
  titles?: TitlesDTO[];
  genres?: GenreNameDTO[];
  categories?: CategoryNameDTO[];
  yearRange?: { minYear?: number; maxYear?: number };
};

type Filters = {
  search: string;
  genre?: string[];
  category?: string[];
  yearFrom?: number | null;
  yearTo?: number | null;
};

export default function MusicTableSection() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<[number, number]>(() => [1900, new Date().getFullYear()]);

  const [categoryOptions, setCategoryOptions] = useState<CategoryNameDTO[]>([]);
  const [genresOptions, setGenresOptions] = useState<GenreNameDTO[]>([]);
  const [titleOptions, setTitleOptions] = useState<TitlesDTO[]>([]);
  const [yearOptions, setYearOptions] = useState<[number, number]>([1900, new Date().getFullYear()]);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalNotes, setModalNotes] = useState<Notes[]>([]);
  const [compositionName, setCompositionName] = useState<string>('');
  const t = useTranslations('table.composition');
  const tFilters = useTranslations('table.composition.filters');
  const {
    data = [],
    isLoading: loadingData,
    params,
    updateParams,
    debouncedUpdateParam,
    resetParams
  } = useSearch<Music, Filters>({
    dataEndpoint: ApiRoutes.COMPOSITION_DATA,
    initialParams: { search: '' }
  });

  const { data: staticFilters } = useFetchStaticFilters<StaticFiltersType>(ApiRoutes.COMPOSITION_FILTERS ?? null);
  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

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

  const handleGenreChange = useCallback(
    (values: string[]) => {
      setGenreFilter(values);
      debouncedUpdateParam('genre', values);
    },
    [debouncedUpdateParam]
  );

  const handleCategoryChange = useCallback(
    (values: string[]) => {
      setCategoryFilter(values);
      debouncedUpdateParam('category', values);
    },
    [debouncedUpdateParam]
  );

  const handleYearChangeForInput = useCallback(
    (v: [number, number]) => {
      setYearFilter(v);
    },
    [setYearFilter]
  );
  const handleYearChangeForParams = useCallback(
    (v: [number, number]) => {
      setYearFilter(v);
      resetParams();
    },
    [resetParams]
  );
  const clearAllFilters = useCallback(() => {
    const paramsToClear: Record<string, string | string[] | number | null> = {};

    if (genreFilter.length > 0) {
      setGenreFilter([]);
      paramsToClear.genre = [];
    }

    if (categoryFilter.length > 0) {
      setCategoryFilter([]);
      paramsToClear.category = [];
    }

    const isYearActiveLocal =
      yearFilter[0] > (yearOptions?.[0] ?? defaultMinYear) || yearFilter[1] < (yearOptions?.[1] ?? defaultMaxYear);

    if (isYearActiveLocal) {
      setYearFilter([defaultMinYear, defaultMaxYear]);
      paramsToClear.yearFrom = null;
      paramsToClear.yearTo = null;
    }

    if (Object.keys(paramsToClear).length === 0) return;

    updateParams((prev) => ({
      ...prev,
      ...paramsToClear
    }));
  }, [updateParams, genreFilter, categoryFilter, yearFilter, yearOptions, defaultMinYear, defaultMaxYear]);

  useEffect(() => {
    if (staticFilters) {
      setGenresOptions(staticFilters.genres ?? []);
      setTitleOptions(staticFilters.titles ?? []);
      setCategoryOptions(staticFilters.categories ?? []);
      setYearOptions([defaultMinYear, defaultMaxYear]);
    }
  }, [staticFilters, defaultMinYear, defaultMaxYear]);

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
      { id: 'year', accessorKey: 'year', header: RenderYearHeader, cell: renderYearCell, enableSorting: false },
      { id: 'genre', accessorKey: 'genre', header: RenderGenreHeader, cell: RenderGenreCell, enableSorting: false },
      {
        id: 'actions',
        header: '',
        cell: (info) => RenderActionsCell(info, handleOpenModal),
        meta: { groupLabelContentFactory: renderGroupActions }
      }
    ],
    []
  );

  const minYear = yearOptions?.[0];
  const maxYear = yearOptions?.[1];

  const isYearActive = yearFilter[0] > (minYear ?? defaultMinYear) || yearFilter[1] < (maxYear ?? defaultMaxYear);

  const filters = useMemo(
    () => [
      {
        id: 'category',
        isActive: categoryFilter.length > 0,
        element: (
          <FilterSelect
            label={tFilters('category')}
            options={categoryOptions.map((c) => ({ value: c.key, label: c.name }))}
            defaultValues={categoryFilter}
            variant="filled"
            onAdd={(v, l, all) => handleCategoryChange(all)}
            onRemove={(v, l, all) => handleCategoryChange(all)}
          />
        )
      },
      {
        id: 'genre',
        isActive: genreFilter.length > 0,
        element: (
          <FilterSelect
            label={tFilters('genre')}
            options={genresOptions.map((g) => ({ value: g.key, label: g.name }))}
            defaultValues={genreFilter}
            variant="filled"
            onAdd={(v, l, all) => handleGenreChange(all)}
            onRemove={(v, l, all) => handleGenreChange(all)}
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
            value={yearFilter}
            onChange={handleYearChangeForInput}
            onChangeCommitted={handleYearChangeForParams}
            minYear={minYear}
            maxYear={maxYear}
          />
        )
      }
    ],
    [
      categoryFilter,
      genreFilter,
      yearFilter,
      minYear,
      maxYear,
      isYearActive,
      handleCategoryChange,
      handleGenreChange,
      handleYearChangeForInput,
      handleYearChangeForParams,
      categoryOptions,
      genresOptions,
      tFilters
    ]
  );

  const hiddenOnSmall = useMemo(() => new Set(['opus', 'year', 'genre', 'play']), []);
  const columns: ColumnDef<Music>[] = useMemo(
    () => (bp.isTablet || bp.isMobile ? baseColumns.filter((c) => !hiddenOnSmall.has(String(c.id))) : baseColumns),
    [bp.isTablet, bp.isMobile, baseColumns, hiddenOnSmall]
  );

  const tableKey: TableKey = (bp.isMobile && 'mobile') || (bp.isTablet && 'tablet') || 'desktop';

  const activeFiltersCount = genreFilter.length + categoryFilter.length + (isYearActive ? 1 : 0);
  const isAnyFilterActive = activeFiltersCount > 0;

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
          <Search
            search={params.search}
            setSearch={(v) => debouncedUpdateParam('search', v)}
            options={titleOptions}
            setFilterParams={(obj) =>
              updateParams((prev) => ({
                ...prev,
                ...obj
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
