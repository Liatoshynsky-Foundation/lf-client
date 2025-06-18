'use client';

import { Box, TableCell, Typography } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

import Button from '../../../shared/components/design-system/all-components/button/Button';
import { IconButton } from '../../../shared/components/design-system/all-components/icon-button/IconButton';
import { mainHexPallete } from '../../../shared/components/design-system/all-components/theme/colors';
import { SvgImage } from '../../../shared/components/svg-image/SvgImage';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import { hexToRGBA } from '~/lib/utils/hexToRGBA';
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

export default function MusicTableSection({ data }: Props) {
  const borderWithOpacity = hexToRGBA(mainHexPallete.blue[200], 0.4);
  const columns: ColumnDef<Music>[] = [
    { id: 'expander', header: '', cell: () => null },
    {
      id: 'opus',
      header: () => (
        <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
          Опус
        </Typography>
      ),
      cell: () => null,
      meta: {
        groupLabelContentFactory: (items: Music[]) => (
          <Typography variant="customItalic16" color={mainHexPallete.blue[800]}>
            {items[0].opus}
          </Typography>
        )
      }
    },
    {
      id: 'play',
      header: '',
      cell: () => (
        <Box
          sx={{
            visibility: 'hidden',
            opacity: 0,
            transition: 'opacity 0.2s ease',
            '.MuiTableRow-root:hover &': {
              visibility: 'visible',
              opacity: 1
            }
          }}
        >
          <IconButton size="small" type={IconButtonVariant.icon}>
            <SvgImage src="/icons/play.svg" alt="play" width={24} height={24} />
          </IconButton>
        </Box>
      )
    },
    {
      accessorKey: 'name',
      header: () => (
        <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
          Назва
        </Typography>
      ),
      cell: (info) => <Typography variant="customMedium16">{info.getValue<string>()}</Typography>,
      meta: {
        groupLabelContentFactory: (items: Music[]) => (
          <TableCell colSpan={3} sx={{ px: 0, py: 2, borderBottom: `2px solid ${borderWithOpacity}` }}>
            <Typography variant="customBold16" fontWeight={600}>
              {items[0].opusTitle}
            </Typography>
          </TableCell>
        )
      }
    },
    {
      accessorKey: 'year',
      header: () => (
        <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
          Рік
        </Typography>
      ),
      cell: (info) => <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
    },
    {
      accessorKey: 'genre',
      header: () => (
        <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
          Жанр
        </Typography>
      ),
      cell: (info) => <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
    },
    {
      id: 'actions',
      header: '',
      cell: () => (
        <Box display="flex" justifyContent="flex-end" gap={2} pr={5}>
          <Button variant="outlined">Переглянути ноти</Button>
          <IconButton size="small" variant={IconButtonColorVariant.Secondary}>
            <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
          </IconButton>
        </Box>
      )
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
