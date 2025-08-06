'use client';

import { ColumnFiltersState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import {
  RenderActionsCell,
  renderGenreCell,
  RenderGenreHeader,
  renderNameCell,
  RenderNameHeader,
  renderOpusGroupLabel,
  RenderOpusHeader,
  renderOpusTitleGroupLabel,
  renderPlayCell,
  renderYearCell,
  RenderYearHeader
} from './MusicTableCells';
import { Music } from '~/types/types/enhancedTable';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';
import { MusicSearch } from '~/shared/components/composition-search/MusicSearch';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

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
  const columns = [
    { id: 'expander', header: '', cell: () => null },
    {
      id: 'opus',
      header: RenderOpusHeader,
      cell: () => null,
      meta: {
        groupLabelContentFactory: renderOpusGroupLabel
      }
    },
    {
      id: 'play',
      header: '',
      cell: renderPlayCell
    },
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
      cell: renderGenreCell,
      enableSorting: false
    },
    {
      id: 'actions',
      header: '',
      cell: RenderActionsCell
    }
  ];
  return (
    <EnhancedTable
      data={data}
      loading={isLoading}
      columns={columns}
      groupByKey="opus"
      columnFilters={columnFilters}
      onColumnFiltersChange={setColumnFilters}
      columnWidths={{
        expander: '3%',
        opus: '3%',
        play: '3%',
        name: '30%',
        year: '8%',
        genre: '28%',
        actions: 'auto'
      }}
      itemsPerPage={10}
      tableName={t('composition')}
      MusicSearch={<MusicSearch search={search} setSearch={setSearch} />}
    />
  );
}
