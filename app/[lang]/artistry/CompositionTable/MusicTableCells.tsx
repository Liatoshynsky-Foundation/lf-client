'use client';

import { Box, TableCell, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';

import type { Music } from './MusicTableSelection';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Button from '~/shared/components/design-system/all-components/button/Button';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export const renderOpusHeader = () => (
  <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
    Опус
  </Typography>
);

export const renderNameHeader = () => (
  <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
    Назва
  </Typography>
);

export const renderYearHeader = () => (
  <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
    Рік
  </Typography>
);

export const renderGenreHeader = () => (
  <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
    Жанр
  </Typography>
);

export const renderPlayCell = () => (
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
);

export const renderNameCell = (info: CellContext<Music, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const renderYearCell = (info: CellContext<Music, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const renderGenreCell = (info: CellContext<Music, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const renderActionsCell = () => (
  <Box display="flex" justifyContent="flex-end" gap={2} pr={5}>
    <Button variant="outlined">Переглянути ноти</Button>
    <IconButton size="small" variant={IconButtonColorVariant.Secondary}>
      <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
    </IconButton>
  </Box>
);

export const renderOpusGroupLabel = (items: Music[]) => (
  <Typography variant="customItalic16" color={mainHexPallete.blue[800]}>
    {items[0]?.opus}
  </Typography>
);

export const renderOpusTitleGroupLabel = (items: Music[], border: string) => (
  <TableCell colSpan={3} sx={{ px: 0, py: 2, borderBottom: `2px solid ${border}` }}>
    <Typography variant="customBold16" fontWeight={600}>
      {items[0]?.opusTitle}
    </Typography>
  </TableCell>
);
