'use client';

import { Box, Typography } from '@mui/material';
import type { CellContext, Row } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';

import {
  actionsCellContainerSx,
  headerTypographySx,
  iconButtonSecondaryOutlinedSx,
  iconButtonSecondaryPlainSx,
  playCellSx
} from './MusicTableCells.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';
import type { Music } from '~/types/types/enhancedTable';

import PauseIcon from '~/public/icons/pause.svg';
import PlayIcon from '~/public/icons/play.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
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

export const renderNameCell = (info: CellContext<Music, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const renderYearCell = (info: CellContext<Music, unknown>) => (
  <Typography variant="customMedium16">{info.getValue<string>()}</Typography>
);

export const RenderGenreCell = (info: CellContext<Music, unknown>) => {
  const genres = info.getValue<string[]>() || [];
  if (!genres.length) return null;
  return <Ellipsis text={genres.join(', ')} variant="customMedium16" />;
};

function PlayCell({ row }: { row: Row<Music> }) {
  const rowData = row.original;
  const { playTrack, togglePlay, isPlaying, src } = useAudioPlayer();

  if (!rowData.audioAvailable) return <Box />;

  const trackUrl = `/api/blob-url?blobName=${encodeURIComponent(rowData.name)}&folderName=compositions`;
  const isCurrentTrack = src?.startsWith(trackUrl);

  return (
    <Box sx={playCellSx}>
      <IconButton
        size="small"
        type={IconButtonVariant.icon}
        onClick={() => {
          if (isCurrentTrack) togglePlay();
          else playTrack(trackUrl, rowData.name);
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
}

function ActionsCell({ row }: { row: Row<Music> }) {
  const rowData = row.original;
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
}

export const RenderPlayCell = (info: CellContext<Music, unknown>) => <PlayCell row={info.row} />;

export const RenderActionsCell = (info: CellContext<Music, unknown>) => <ActionsCell row={info.row} />;

export const RenderExpanderCell = (ctx: CellContext<Music, unknown>) => {
  const { isTablet, isMobile } = useBreakpoints();
  return (isTablet || isMobile) && !ctx.row.getCanExpand() ? <PlayCell row={ctx.row} /> : null;
};

export const renderOpusGroupLabel = (items: Music[]) => (
  <Typography variant="customItalic16" color={mainHexPallete.blue[800]}>
    {items[0]?.opus}
  </Typography>
);

export const renderOpusTitleGroupLabel = (items: Music[]) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
    <Typography variant="customBold16" fontWeight={600}>
      {items[0]?.opusTitle}
    </Typography>
  </Box>
);

export const renderGroupActions = () => (
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', pr: { xs: '10px', sm: '15px', md: '40px' } }}>
    <IconButton size="small" variant={IconButtonColorVariant.Secondary} sx={iconButtonSecondaryPlainSx}>
      <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
    </IconButton>
  </Box>
);
