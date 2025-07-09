'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import {
  renderActionsCell,
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
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

type Props = {
  data: Music[];
};

export default function MusicTableSection({ data }: Readonly<Props>) {
  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);
  const t = useTranslations('table.name');

  const columns: ColumnDef<Music>[] = [
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
      cell: renderActionsCell
    }
  ];

  return (
    <EnhancedTable
      data={data}
      columns={columns}
      groupByKey="opus"
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
    />
  );
}
