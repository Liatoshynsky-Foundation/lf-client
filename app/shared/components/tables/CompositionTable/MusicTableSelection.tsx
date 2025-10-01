'use client';

import { type ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MusicTableFilters } from './filters/MusicTableFilters';
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
import { ApiRoutes } from '~/constants/routes/api-routes';
import { CompositionWithNotes, Music } from '~/types/types/enhancedTable';
import { Notes } from '~/types/types/getNotes.types';

import { CategoryNameDTO, GenreNameDTO, TitlesDTO } from '~/domain/dto/table.dto';
import { getColumnWidths } from '~/lib/utils/getColumnWidth';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import GetNotesModal from '~/shared/components/get-notes-modal/GetNotesModal';
import { Search } from '~/shared/components/search/Search';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-search/useFetchStaticFilters';
import { useSearch } from '~/shared/hooks/use-search/UseSearch';

type TableKey = 'mobile' | 'tablet' | 'desktop';

type StaticFiltersType = {
  titles?: TitlesDTO[];
  genres?: GenreNameDTO[];
  categories?: CategoryNameDTO[];
  yearRange?: { minYear?: number; maxYear?: number };
};

export default function MusicTableSection() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<[number, number]>(() => [1900, new Date().getFullYear()]);

  const [categoryOptions, setCategoryOptions] = useState<CategoryNameDTO[]>([]);
  const [genresOptions, setGenresOptions] = useState<GenreNameDTO[]>([]);
  const [titleOptions, setTitleOptions] = useState<TitlesDTO[]>([]);
  const [yearOptions, setYearOptions] = useState<[number, number]>([yearFilter[0], yearFilter[1]]);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalNotes, setModalNotes] = useState<Notes[]>([]);
  const [compositionName, setCompositionName] = useState<string>('');

  const initialYearSet = useRef(false);
  const t = useTranslations('table.composition');
  const tFilters = useTranslations('table.composition.filters');
  const {
    search,
    setSearch,
    data = [],
    loadingData = false,
    setFilterParam
  } = useSearch<any>({
    dataEndpoint: ApiRoutes.COMPOSITION_DATA
  });

  const { data: staticFilters } = useFetchStaticFilters<StaticFiltersType>(ApiRoutes.COMPOSITION_FILTERS ?? null);
  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

  const bp = useBreakpoints();
  const { isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove } = bp;

  const columnWidths = useMemo(
    () => getColumnWidths({ isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove }),
    [isMobile, isTablet, isLaptop, isDesktop, isLaptopAndAbove]
  );

  const handleGenreChange = useCallback(
    (values: string[]) => {
      setGenreFilter(values);
      setFilterParam('genre', values.length ? values : null);
    },
    [setFilterParam]
  );

  const handleCategoryChange = useCallback(
    (values: string[]) => {
      setCategoryFilter(values);
      setFilterParam('category', values.length ? values : null);
    },
    [setFilterParam]
  );

  const handleYearChange = useCallback(
    (v: [number, number]) => {
      setYearFilter(v);
      setFilterParam('yearFrom', v[0]);
      setFilterParam('yearTo', v[1]);
    },
    [setFilterParam]
  );

  const clearAllFilters = useCallback(() => {
    setGenreFilter([]);
    setCategoryFilter([]);
    setYearFilter([defaultMinYear, defaultMaxYear]);
    setFilterParam('genre', []);
    setFilterParam('category', []);
    setFilterParam('yearFrom', null);
    setFilterParam('yearTo', null);
  }, [defaultMaxYear, defaultMinYear, setFilterParam]);

  useEffect(() => {
    if (staticFilters) {
      setGenresOptions(staticFilters.genres ?? []);
      setTitleOptions(staticFilters.titles ?? []);
      setCategoryOptions(staticFilters.categories ?? []);
      setYearOptions([defaultMinYear, defaultMaxYear]);
      if (!initialYearSet.current && staticFilters.yearRange) {
        setYearFilter([
          Number(staticFilters.yearRange.minYear ?? 1900),
          Number(staticFilters.yearRange.maxYear ?? new Date().getFullYear())
        ]);
        initialYearSet.current = true;
      }
    }
  }, [staticFilters]);

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
      {
        id: 'expander',
        header: '',
        cell: RenderExpanderCell
      },
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
        meta: {
          groupLabelContentFactory: (items: Music[]) => renderOpusTitleGroupLabel(items)
        }
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
        cell: (info) => RenderActionsCell(info, handleOpenModal),
        meta: { groupLabelContentFactory: renderGroupActions }
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

  const minYear = yearOptions?.[0];
  const maxYear = yearOptions?.[1];
  const isGenreActive = genreFilter.length > 0;
  const isCategoryActive = categoryFilter.length > 0;
  const isYearActive = yearFilter[0] > (minYear ?? defaultMinYear) || yearFilter[1] < (maxYear ?? defaultMaxYear);
  const isAnyFilterActive = isGenreActive || isYearActive || isCategoryActive;
  const activeFiltersCount = Number(isGenreActive) + Number(isYearActive) + Number(isCategoryActive);

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
        tableName={t('name.composition')}
        Search={<Search<any> search={search} setSearch={setSearch} options={titleOptions} />}
        Filters={
          <MusicTableFilters
            labelGenre={tFilters('genre')}
            genreFilter={genreFilter}
            genresOptions={genresOptions}
            onGenresChange={handleGenreChange}
            labelCategory={tFilters('category')}
            categoryFilter={categoryFilter}
            categoriesOptions={categoryOptions}
            onCategoriesChange={handleCategoryChange}
            yearLabel={tFilters('year')}
            yearFilter={yearFilter}
            onYearChange={handleYearChange}
            onClearAllFilters={clearAllFilters}
            isAnyFilterActive={isAnyFilterActive}
            minYear={minYear ?? defaultMinYear}
            maxYear={maxYear ?? defaultMaxYear}
          />
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
