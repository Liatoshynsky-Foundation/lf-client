'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

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

import { getColumnWidths } from '~/lib/utils/getColumnWidth';
import { hexToRGBA } from '~/lib/utils/hexToRGBA';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';
import { Search } from '~/shared/components/search/Search';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useSearch } from '~/shared/hooks/use-search/UseSearch';

export default function MusicTableSection() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [opusFilter, setOpusFilter] = useState<string[]>([]);
  const [genreFilter, setGenreFilter] = useState<string[]>([]);
  const [yearFilter, setYearFilter] = useState<[number, number]>(() => [1900, new Date().getFullYear()]);

  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);
  const t = useTranslations('table.composition');
  const tFilters = useTranslations('table.composition.filters');

  const {
    search,
    setSearch,
    titles = [],
    loadingTitles = false,
    data = [],
    loadingData = false
  } = useSearch<any>({
    titlesEndpoint: ApiRoutes.COMPOSITION_TITLES,
    dataEndpoint: ApiRoutes.COMPOSITION_DATA
  });

  const bp = useBreakpoints();
  const columnWidths = getColumnWidths(bp);

  const opusesOptions = useMemo(() => {
    const map = new Map<string, { label: string; value: string }>();
    (titles || []).forEach((tItem: any) => {
      const label =
        typeof tItem.title === 'string' ? tItem.title : tItem.title?.en || tItem.title?.uk || tItem.label || '';
      const value = tItem.value ?? tItem._id ?? label;
      if (label) map.set(String(value), { label, value });
    });
    return Array.from(map.values());
  }, [titles]);

  const genresOptions = useMemo(() => {
    const set = new Map<string, { label: string; value: string }>();
    (titles || []).forEach((tItem: any) => {
      const g = tItem.genre ?? tItem.category ?? null;
      if (g) {
        const label = typeof g === 'string' ? g : String(g);
        set.set(label, { label, value: label });
      }
    });
    return Array.from(set.values());
  }, [titles]);

  const handleOpusChange = useCallback((values: string[]) => {
    setOpusFilter(values);
  }, []);

  const handleGenreChange = useCallback((values: string[]) => {
    setGenreFilter(values);
  }, []);

  const handleYearChange = useCallback((v: [number, number]) => {
    setYearFilter(v);
  }, []);

  const clearAllFilters = useCallback(() => {
    setOpusFilter([]);
    setGenreFilter([]);
    setYearFilter([1900, new Date().getFullYear()]);
  }, []);

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

  const minYear = 1900;
  const maxYear = new Date().getFullYear();
  const isOpusActive = opusFilter.length > 0;
  const isGenreActive = genreFilter.length > 0;
  const isYearActive = yearFilter[0] > minYear || yearFilter[1] < maxYear;
  const isAnyFilterActive = isOpusActive || isGenreActive || isYearActive;
  const activeFiltersCount = Number(isOpusActive) + Number(isGenreActive) + Number(isYearActive);

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
        Search={<Search<any> search={search} setSearch={setSearch} options={titles} loading={loadingTitles} />}
        Filters={
          <MusicTableFilters
            labelOpus={tFilters('opus') ?? 'Opus'}
            labelGenre={tFilters('genre') ?? 'Genre'}
            opusesOptions={opusesOptions}
            genresOptions={genresOptions}
            defaultOpuses={opusFilter}
            defaultGenres={genreFilter}
            yearFilter={yearFilter}
            onOpusesChange={handleOpusChange}
            onGenresChange={handleGenreChange}
            onYearChange={handleYearChange}
            onClearAllFilters={clearAllFilters}
          />
        }
        isFiltersActive={isAnyFilterActive}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={clearAllFilters}
      />
    </>
  );
}
