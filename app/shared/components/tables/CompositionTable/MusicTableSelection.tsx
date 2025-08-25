'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ColumnFiltersState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';

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
import { MusicSearch } from '~/shared/components/composition-search/MusicSearch';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type Props = {
  lang: string;
};

export default function MusicTableSection({ lang }: Readonly<Props>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);
  const t = useTranslations('table.name');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [data, setData] = useState<Music[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const bp = useBreakpoints();

  const columnWidths = getColumnWidths(bp);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set('search', search);
      router.refresh();
    } else {
      newParams.delete('search');
      router.refresh();
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  }, [router, search, searchParams, isLoading]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const endpoint = `/api/compositions?lang=${lang}&search=${encodeURIComponent(search)}`;
      const res = await fetch(endpoint);
      const json = await res.json();
      setData(json);
      setIsLoading(false);
    };

    fetchData();
  }, [search, lang]);

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

  return (
    <EnhancedTable
      data={data}
      loading={isLoading}
      columns={columns}
      groupByKey="opus"
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      columnWidths={columnWidths}
      itemsPerPage={10}
      tableName={t('composition')}
      MusicSearch={<MusicSearch search={search} setSearch={setSearch} />}
    />
  );
}
