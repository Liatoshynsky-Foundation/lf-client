'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

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
import { Music } from '~/types/types/enhancedTable';

import { getColumnWidths } from '~/lib/utils/getColumnWidth';
import { hexToRGBA } from '~/lib/utils/hexToRGBA';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';
import { Search } from '~/shared/components/search/Search';
import { useSearch } from '~/shared/hooks/use-search/UseSearch';

type Props = {
  lang: string;
};

export default function MusicTableSection({ lang }: Readonly<Props>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);
  const t = useTranslations('table.name');
  const { search, setSearch, titles, loadingTitles, data, loadingData } = useSearch({
    titlesEndpoint: '/api/composition-titles',
    dataEndpointBuilder: (search) => `/api/compositions?lang=${lang}&search=${encodeURIComponent(search)}`
  });

  const columns = [
    { id: 'expander', header: '', cell: () => null },
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

  return (
    <EnhancedTable
      data={data}
      loading={loadingData}
      columns={columns}
      groupByKey="opus"
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      columnWidths={columnWidths}
      itemsPerPage={10}
      tableName={t('composition')}
      Search={<Search search={search} setSearch={setSearch} options={titles} loading={loadingTitles} />}
    />
  );
}
