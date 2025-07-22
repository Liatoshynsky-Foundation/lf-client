'use client';

import { ColumnDef, ColumnFiltersState } from '@tanstack/react-table';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';

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

import { advancedSearchFilter } from '~/lib/utils/advancedSearchFilters';
import { hexToRGBA } from '~/lib/utils/hexToRGBA';
import { MusicSearch } from '~/shared/components/composition-search/MusicSearch';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

type Props = {
  lang: string;
  initialSearch?: string;
  initialData: Music[];
};

export default function MusicTableSection({ lang, initialData }: Readonly<Props>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);
  const t = useTranslations('table.name');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [data, setData] = useState(initialData);

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (search) {
      newParams.set('search', search);
    } else {
      newParams.delete('search');
    }
    router.replace(`?${newParams.toString()}`, { scroll: false });
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/compositions?lang=${lang}&search=${search}`);
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, [search, lang]);

  const columns = useMemo<ColumnDef<Music>[]>(
    () => [
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
        accessorKey: 'name',
        header: RenderNameHeader,
        cell: renderNameCell,
        enableSorting: false,
        meta: {
          groupLabelContentFactory: (items: Music[]) => renderOpusTitleGroupLabel(items, borderWithOpacity)
        },
        filterFn: (row, columnId, filterValue: string) => {
          const name = row.getValue<string>(columnId);
          const result = advancedSearchFilter(name, filterValue);
          return result;
        }
      },
      {
        accessorKey: 'year',
        header: RenderYearHeader,
        cell: renderYearCell,
        enableSorting: false
      },
      {
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
    ],
    []
  );

  return (
    <EnhancedTable
      data={data}
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
      MusicSearch={
        <MusicSearch
          search={search}
          setSearch={setSearch}
          // onFilterChange={(names: string) =>
          //   setColumnFilters((prev) => [...prev.filter((f) => f.id !== 'name'), { id: 'name', value: names }])
          // }
        />
      }
    />
  );
}
