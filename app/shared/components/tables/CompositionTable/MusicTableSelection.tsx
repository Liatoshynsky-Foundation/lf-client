'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { MusicTableFilters } from './filters/MusicTableFilters';
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
import { ApiRoutes } from '~/constants/routes/api-routes';
import { Music } from '~/types/types/enhancedTable';

import { GenreNameDTO, TitlesDTO } from '~/domain/dto/table.dto';
import { getColumnWidths } from '~/lib/utils/getColumnWidth';
import { hexToRGBA } from '~/lib/utils/hexToRGBA';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { EnhancedTable } from '~/shared/components/enhanced-table/EnhancedTable';
import { Search } from '~/shared/components/search/Search';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useFetchStaticFilters } from '~/shared/hooks/use-search/useFetchStaticFilters';
import { useSearch } from '~/shared/hooks/use-search/UseSearch';

export default function MusicTableSection() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<[number, number]>(() => [1900, new Date().getFullYear()]);

  const [genresOptions, setGenresOptions] = useState<GenreNameDTO[]>([]);
  const [titleOptions, setTitleOptions] = useState<TitlesDTO[]>([]);
  const [yearOptions, setYearOptions] = useState<[number, number]>([yearFilter[0], yearFilter[1]]);

  const initialYearSet = useRef(false);
  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);
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
  type StaticFiltersType = {
    titles?: TitlesDTO[];
    genres?: GenreNameDTO[];
    yearRange?: { minYear?: number; maxYear?: number };
  };
  const { data: staticFilters } = useFetchStaticFilters<StaticFiltersType>(ApiRoutes.COMPOSITION_FILTERS ?? null);
  const defaultMinYear = staticFilters?.yearRange?.minYear ?? 1900;
  const defaultMaxYear = staticFilters?.yearRange?.maxYear ?? new Date().getFullYear();

  const bp = useBreakpoints();
  const columnWidths = getColumnWidths(bp);

  const handleGenreChange = useCallback(
    (values: string[]) => {
      setGenreFilter(values);
      setFilterParam('genre', values.length ? values : null);
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
    setYearFilter([defaultMinYear, defaultMaxYear]);
    setFilterParam('genre', []);
    setFilterParam('yearFrom', null);
    setFilterParam('yearTo', null);
  }, [defaultMaxYear, defaultMinYear, setFilterParam]);
  useEffect(() => {
    if (staticFilters) {
      setGenresOptions(staticFilters.genres ?? []);
      setTitleOptions(staticFilters.titles ?? []);
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
  const baseColumns: ColumnDef<Music>[] = [
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
        groupLabelContentFactory: (items: Music[]) => renderOpusTitleGroupLabel(items, borderWithOpacity)
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
    { id: 'actions', header: '', cell: RenderActionsCell }
  ];

  const columns: ColumnDef<Music>[] =
    bp.isTablet || bp.isMobile
      ? baseColumns.filter((c) => !new Set(['opus', 'year', 'genre', 'play']).has(String(c.id)))
      : baseColumns;

  const minYear = yearOptions?.[0];
  const maxYear = yearOptions?.[1];
  const isGenreActive = genreFilter.length > 0;
  const isYearActive = yearFilter[0] > (minYear ?? defaultMinYear) || yearFilter[1] < (maxYear ?? defaultMaxYear);
  const isAnyFilterActive = isGenreActive || isYearActive;
  const activeFiltersCount = Number(isGenreActive) + Number(isYearActive);

  return (
    <>
      <EnhancedTable
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
            labelCategory={tFilters('category')}
            labelGenre={tFilters('genre')}
            genresOptions={genresOptions}
            genreFilter={genreFilter}
            yearLabel={tFilters('year')}
            yearFilter={yearFilter}
            onGenresChange={handleGenreChange}
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
    </>
  );
}
