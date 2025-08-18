'use client';

import { Box, TableCell, Typography } from '@mui/material';
import type { CellContext } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import {
  actionsCellContainerSx,
  genreEllipsisSx,
  groupLabelCellSx,
  groupLabelRowSx,
  headerTypographySx,
  iconButtonSecondaryOutlinedSx,
  iconButtonSecondaryPlainSx
} from './MusicTableCells.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';
import type { Music } from '~/types/types/enhancedTable';

import PauseIcon from '~/public/icons/pause.svg';
import PlayIcon from '~/public/icons/play.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import Button from '~/shared/components/design-system/all-components/button/Button';
import { Ellipsis } from '~/shared/components/design-system/all-components/Ellipsis/Ellipsis';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import { useAudioPlayer } from '~/shared/context/AudioPlayerContext';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export const RenderOpusHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" sx={headerTypographySx}>
      {t('opus')}
    </Typography>
  );
};

export const RenderExpanderCell = (ctx: CellContext<Music, unknown>) => {
  const { isTablet, isMobile } = useBreakpoints();
  return (isTablet || isMobile) && !ctx.row.getCanExpand() ? RenderPlayCell(ctx) : null;
};

export const RenderNameHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" sx={headerTypographySx}>
      {t('name')}
    </Typography>
  );
};

export const RenderYearHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" sx={headerTypographySx}>
      {t('year')}
    </Typography>
  );
};

export const RenderGenreHeader = () => {
  const t = useTranslations('table.columns');
  return (
    <Typography variant="customBold16" sx={headerTypographySx}>
      {t('genre')}
    </Typography>
  );
};

export const RenderPlayCell = (info: CellContext<Music, unknown>) => {
  const rowData = info.row.original;
  const { playTrack, togglePlay, isPlaying, src } = useAudioPlayer();

  const trackUrl = `/api/blob-url?blobName=${encodeURIComponent(rowData.name)}&folderName=compositions`;
  const isCurrentTrack = src?.startsWith(trackUrl);

  if (rowData.audioAvailable)
    return (
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
        <IconButton
          size="small"
          type={IconButtonVariant.icon}
          onClick={() => {
            if (isCurrentTrack) {
              togglePlay();
            } else {
              playTrack(trackUrl, rowData.name);
            }
          }}
        >
          <Svg
            Component={isCurrentTrack && isPlaying ? PauseIcon : PlayIcon}
            alt="play/pause"
            width="24px"
            height="24px"
            color={mainHexPallete.blue[800]}
          />
        </IconButton>
      </Box>
    );
  return <Box />;
};

export const renderNameCell = (info: CellContext<Music, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const renderYearCell = (info: CellContext<Music, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const RenderGenreCell = (info: CellContext<Music, unknown>) => {
  const genres = info.getValue<string[]>() || [];
  if (!genres.length) return null;

  return <Ellipsis text={genres.join(', ')} variant="customMedium16" sx={genreEllipsisSx} />;
};

export const RenderActionsCell = (info: CellContext<Music, unknown>) => {
  const rowData = info.row.original;
  const t = useTranslations('table.buttons');
  const { isDesktop, isLaptop } = useBreakpoints();

  const shouldRender = isDesktop || isLaptop;

  return (
    <Box sx={actionsCellContainerSx}>
      {rowData.sheetAvailable &&
        shouldRender &&
        (isDesktop ? (
          <Button variant="outlined">{t('viewSheetMusic')}</Button>
        ) : (
          <IconButton size="small" variant={IconButtonColorVariant.Secondary} sx={iconButtonSecondaryOutlinedSx}>
            <SvgImage src="/icons/music-4.svg" alt={t('viewSheetMusic')} width={30} height={30} />
          </IconButton>
        ))}

      <IconButton size="small" variant={IconButtonColorVariant.Secondary} sx={iconButtonSecondaryPlainSx}>
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
  <TableCell colSpan={4} sx={groupLabelCellSx(border)}>
    <Box sx={groupLabelRowSx}>
      <Typography variant="customBold16" fontWeight={600}>
        {items[0]?.opusTitle}
      </Typography>

      <IconButton size="small" variant={IconButtonColorVariant.Secondary} sx={iconButtonSecondaryPlainSx}>
        <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
      </IconButton>
    </Box>
  </TableCell>
);
