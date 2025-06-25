'use client';

import { ColumnDef } from '@tanstack/react-table';

import {
  renderActionsCell,
  renderGenreCell,
  renderGenreHeader,
  renderNameCell,
  renderNameHeader,
  renderOpusGroupLabel,
  renderOpusHeader,
  renderOpusTitleGroupLabel,
  renderPlayCell,
  renderYearCell,
  renderYearHeader
} from './MusicTableCells';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

export type Music = {
  id: number;
  name: string;
  year: number;
  opus?: string;
  opusTitle?: string;
  genre?: string;
};
type Props = {
  data: Music[];
};

export default function MusicTableSection({ data }: Readonly<Props>) {
  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);

  const columns: ColumnDef<Music>[] = [
    { id: 'expander', header: '', cell: () => null },
    {
      id: 'opus',
      header: renderOpusHeader,
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
      header: renderNameHeader,
      cell: renderNameCell,
      meta: {
        groupLabelContentFactory: (items: Music[]) => renderOpusTitleGroupLabel(items, borderWithOpacity)
      }
    },
    {
      accessorKey: 'year',
      header: renderYearHeader,
      cell: renderYearCell
    },
    {
      accessorKey: 'genre',
      header: renderGenreHeader,
      cell: renderGenreCell
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
      tableName="Усі Композиції"
    />
  );
}
