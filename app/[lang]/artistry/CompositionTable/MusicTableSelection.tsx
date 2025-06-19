'use client';

import { ColumnDef } from '@tanstack/react-table';

import { ActionsButtons, HoverPlayIcon, TableCellWithTypography, TypographyCell } from './MusicTableCells';

import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import EnhancedTable from '~/shared/components/enhanced-table/EnhancedTable';

type Music = {
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
  const columns: ColumnDef<Music>[] = [
    { id: 'expander', header: '', cell: () => null },
    {
      id: 'opus',
      header: () => <TypographyCell value="Опус" variant="customBold16" color={mainHexPallete.blue[800]} />,
      cell: () => null,
      meta: {
        groupLabelContentFactory: (items: Music[]) => (
          <TypographyCell value={items[0]?.opus} variant="customItalic16" color={mainHexPallete.blue[800]} />
        )
      }
    },
    {
      id: 'play',
      header: '',
      cell: () => <HoverPlayIcon />
    },
    {
      accessorKey: 'name',
      header: () => <TypographyCell value="Назва" variant="customBold16" color={mainHexPallete.blue[800]} />,
      cell: (info) => <TypographyCell value={info.getValue<string>()} />,
      meta: {
        groupLabelContentFactory: (items: Music[]) => (
          <TableCellWithTypography value={items[0]?.opusTitle} colSpan={3} />
        )
      }
    },
    {
      accessorKey: 'year',
      header: () => <TypographyCell value="Рік" variant="customBold16" color={mainHexPallete.blue[800]} />,
      cell: (info) => <TypographyCell value={info.getValue<string>()} />
    },
    {
      accessorKey: 'genre',
      header: () => <TypographyCell value="Жанр" variant="customBold16" color={mainHexPallete.blue[800]} />,
      cell: (info) => <TypographyCell value={info.getValue<string>()} />
    },
    {
      id: 'actions',
      header: '',
      cell: () => <ActionsButtons />
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
