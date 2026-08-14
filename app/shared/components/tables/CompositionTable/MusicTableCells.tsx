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
  menuLabelItemSx,
  playCellSx
} from './MusicTableCells.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';
import type { CompositionWithNotes, Music } from '~/types/types/enhancedTable';
import type { OverflowMenuItemConfig } from '~/types/types/menu.types';

import { Link } from '~/i18n/navigation';
import { formatTextWithHyphens } from '~/lib/utils/textFormater';
import PauseIcon from '~/public/icons/pause.svg';
import PlayIcon from '~/public/icons/play.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import { getDynamicRoute } from '~/shared/components/constants/routes';
import { Ellipsis } from '~/shared/components/design-system/all-components/Ellipsis/Ellipsis';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import OverflowMenu from '~/shared/components/design-system/all-components/overflow-menu/OverflowMenu';
import { mainHexPallete } from '~/shared/components/design-system/all-components/theme/colors';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useCompositionPlayback } from '~/shared/hooks/use-composition-playback/useCompositionPlayback';

type RowProp = Readonly<{ row: Row<Music>; onAction?: (data: CompositionWithNotes) => void }>;

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

export const renderYearCell = (info: CellContext<Music, unknown>) => {
  const value = info.getValue<string | number | null | undefined>();
  if (value == null) return null;
  return <Typography variant="customMedium16">{value}</Typography>;
};

export const RenderGenreCell = (info: CellContext<Music, unknown>) => {
  const genres = info.getValue<string[]>() || [];
  if (!genres.length) return null;
  return <Ellipsis text={genres.join(', ')} variant="customMedium16" />;
};

export const PlayCell: React.FC<RowProp> = ({ row }) => {
  const rowData = row.original;
  const { canPlay, isCurrentTrack, isPlaying, handlePlayClick } = useCompositionPlayback(rowData);

  if (!canPlay) return <Box />;

  return (
    <Box sx={playCellSx}>
      <IconButton size="small" type={IconButtonVariant.icon} onClick={handlePlayClick}>
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
};

export const ActionsCell: React.FC<RowProp> = ({ row, onAction }) => {
  const rowData = row.original;
  const t = useTranslations('table.buttons');
  const { isDesktop, isLaptop } = useBreakpoints();

  const showNotesInline = isDesktop || isLaptop;

  const { canPlay, isCurrentTrack, isPlaying, handlePlayClick } = useCompositionPlayback(rowData);

  const handleNotesClick = () => {
    if (onAction) {
      onAction({ composition: rowData.name, notes: rowData.sheetMusic || [] });
    }
  };

  const menuItems: OverflowMenuItemConfig[] = [
    {
      id: 'play',
      label: t('listenToComposition'),
      icon: (
        <Svg
          Component={isCurrentTrack && isPlaying ? PauseIcon : PlayIcon}
          alt="play/pause"
          width="24px"
          height="24px"
          color={mainHexPallete.blue[800]}
        />
      ),
      disabled: !canPlay,
      labelSx: menuLabelItemSx,
      onClick: handlePlayClick
    },
    {
      id: 'notes',
      label: t('viewSheetMusic'),
      icon: <SvgImage src="/icons/music-4.svg" alt={t('viewSheetMusic')} width={24} height={24} />,
      disabled: false,
      hidden: showNotesInline,
      labelSx: menuLabelItemSx,
      onClick: handleNotesClick
    }
  ];

  return (
    <Box sx={actionsCellContainerSx}>
      {showNotesInline &&
        (isDesktop ? (
          <Button onClick={handleNotesClick} variant="outlined">
            {t('viewSheetMusic')}
          </Button>
        ) : (
          <IconButton
            onClick={handleNotesClick}
            size="small"
            variant={IconButtonColorVariant.Secondary}
            sx={iconButtonSecondaryOutlinedSx}
          >
            <SvgImage src="/icons/music-4.svg" alt={t('viewSheetMusic')} width={30} height={30} />
          </IconButton>
        ))}

      <OverflowMenu
        items={menuItems}
        trigger={
          <IconButton
            size="small"
            variant={IconButtonColorVariant.Secondary}
            sx={iconButtonSecondaryPlainSx}
            data-testid="Artistry-overflowMenuButton"
          >
            <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
          </IconButton>
        }
        dataTestId="Artistry-overflowMenu"
      />
    </Box>
  );
};

export const RenderPlayCell = (info: CellContext<Music, unknown>) => <PlayCell row={info.row} />;

export const RenderActionsCell = (
  info: CellContext<Music, unknown>,
  onAction: (data: CompositionWithNotes) => void
) => <ActionsCell row={info.row} onAction={onAction} />;

export const RenderExpanderCell = (ctx: CellContext<Music, unknown>) => {
  const { isTablet, isMobile } = useBreakpoints();
  return (isTablet || isMobile) && !ctx.row.getCanExpand() ? <PlayCell row={ctx.row} /> : null;
};

export const renderOpusGroupLabel = (items: Music[]) => {
  const formatted = formatTextWithHyphens(items[0]?.opus, 10);
  return (
    <Typography variant="customItalic16" color={mainHexPallete.blue[800]} sx={{ whiteSpace: 'pre-line' }}>
      {formatted}
    </Typography>
  );
};

export const renderOpusTitleGroupLabel = (items: Music[]) => {
  const opusId = items[0]?.opusId;
  const opusTitle = items[0]?.opusTitle;

  if (!opusId) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
        <Typography variant="customBold16" fontWeight={600}>
          {opusTitle}
        </Typography>
      </Box>
    );
  }

  return (
    <Link
      href={getDynamicRoute.opus(opusId)}
      onClick={(e) => e.stopPropagation()}
      style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', textDecoration: 'none', color: 'inherit' }}
      className="opus-group-link"
    >
      <Box sx={{ '&:hover': { textDecoration: 'underline' } }}>
        <Typography variant="customBold16" fontWeight={600}>
          {opusTitle}
        </Typography>
      </Box>
    </Link>
  );
};

export const renderOpusYearGroupLabel = (items: Music[]) => {
  const year = items[0]?.opusYear;
  if (!year) return null;
  return <Typography variant="customMedium16">{year}</Typography>;
};

export const renderOpusGenreGroupLabel = (items: Music[]) => {
  const genres = items[0]?.opusGenres;
  if (!genres || genres.length === 0) return null;
  return <Typography variant="customMedium16">{genres.join(', ')}</Typography>;
};
