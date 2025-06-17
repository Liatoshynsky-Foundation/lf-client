'use client';

import { Box, Button, IconButton } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

type Music = {
  id: number;
  name: string;
  year: number;
  opus?: string;
};

type Props = {
  data: Music[];
};

export default function MusicTableSection({ data }: Props) {
  const columns: ColumnDef<Music>[] = [
    { id: 'expander', header: '', cell: () => null },
    { id: 'opus', header: 'Опус', cell: () => null, meta: { isGroupLabelColumn: true } },
    { id: 'play', header: '', cell: () => <Button>▶</Button> },
    {
      accessorKey: 'name',
      header: 'Назва',
      meta: { groupLabelContent: 'Перший квартет' }
    },
    { accessorKey: 'year', header: 'Рік' },
    {
      id: 'actions',
      header: 'Жанр',
      meta: {
        groupCellRenderer: () => (
          <Box display="flex" alignItems="center" pr={0} gap={20}>
            <Button>Переглянути ноти</Button>
            <IconButton size="small">
              <Image src="/icons/ellipsis-vertical.svg" alt="menu" width={16} height={16} />
            </IconButton>
          </Box>
        )
      }
    }
  ];

  return (
    <EnhancedTable
      data={data}
      columns={columns}
      groupByKey="opus"
      columnWidths={{
        expander: '1%',
        opus: '1%',
        play: '1%',
        name: '40%',
        year: '5%',
        actions: 'auto'
      }}
      itemsPerPage={5}
    />
  );
}
