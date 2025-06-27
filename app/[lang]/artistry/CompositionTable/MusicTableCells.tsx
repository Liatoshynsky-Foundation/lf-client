'use client';

import { Box, TableCell, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';
import type { Music } from '~/types/types/enhancedTable';

import Button from '~/shared/components/design-system/all-components/button/Button';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export const RenderOpusHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
      {t('opus')}
    </Typography>
  );
};

export const RenderNameHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
      {t('name')}
    </Typography>
  );
};

export const RenderYearHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
      {t('year')}
    </Typography>
  );
};

export const RenderGenreHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" color={mainHexPallete.blue[800]}>
      {t('genre')}
    </Typography>
  );
};

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

export const renderGenreCell = (info: CellContext<Music, unknown>) => {
  const genresArray = info.getValue<string[]>();
  if (!genresArray || genresArray.length === 0) {
    return null;
  }
  const genresString = genresArray.join(', ');
  return <Typography variant="customMedium16">{genresString}</Typography>;
};

export const renderActionsCell = (info: CellContext<Music, unknown>) => {
  const rowData = info.row.original;
  return (
    <Box display="flex" justifyContent="flex-end" gap={2} pr={5}>
      {rowData.sheetAvailable && <Button variant="outlined">Переглянути ноти</Button>}
      <IconButton size="small" variant={IconButtonColorVariant.Secondary}>
        <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
      </IconButton>
    </Box>
  );
};

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
