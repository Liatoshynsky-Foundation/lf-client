'use client';

import { Box, Typography } from '@mui/material';
import type { CellContext, Row } from '@tanstack/react-table';
import { useLocale, useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';

import {
  actionsCellContainerSx,
  headerTypographySx,
  iconButtonSecondaryOutlinedSx,
  iconButtonSecondaryPlainSx,
  menuLabelItemSx,
  opusGroupLabelTypographySx,
  opusTitleGroupContainerSx,
  opusTitleHoverTypographySx,
  opusTitleLinkStyle,
  opusTitleTypographySx,
  playCellSx
} from './MusicTableCells.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';
import type { CompositionWithNotes, Music } from '~/types/types/enhancedTable';
import type { OverflowMenuItemConfig } from '~/types/types/menu.types';

import { Link, useRouter } from '~/i18n/navigation';
import { formatTextWithHyphens } from '~/lib/utils/textFormater';
import ArrowRightIcon from '~/public/icons/arrow-right-from-line.svg';
import PauseIcon from '~/public/icons/pause.svg';
import PlayIcon from '~/public/icons/play.svg';
import ShareIcon from '~/public/icons/share-1.svg';
import YoutubeIcon from '~/public/icons/youtube.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import { getDynamicRoute } from '~/shared/components/constants/routes';
import { Ellipsis } from '~/shared/components/design-system/all-components/Ellipsis/Ellipsis';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import OverflowMenu from '~/shared/components/design-system/all-components/overflow-menu/OverflowMenu';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useCompositionPlayback } from '~/shared/hooks/use-composition-playback/useCompositionPlayback';

type RowProp = Readonly<{ row: Row<Music>; onAction?: (data: CompositionWithNotes) => void }>;
type GroupActionsProps = Readonly<{ items: Music[] }>;

const createHeader = (translationKey: Parameters<ReturnType<typeof useTranslations<'table.columns'>>>[0]) => {
  return function HeaderComponent() {
    const t = useTranslations('table.columns');
    return (
      <Typography variant="customBold16" sx={headerTypographySx}>
        {t(translationKey)}
      </Typography>
    );
  };
};

export const RenderOpusHeader = createHeader('opus');
export const RenderNameHeader = createHeader('name');
export const RenderYearHeader = createHeader('year');
export const RenderGenreHeader = createHeader('genre');

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

export const PlayCell = ({ row }: RowProp) => {
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
          color={'blue.800'}
        />
      </IconButton>
    </Box>
  );
};

export const ActionsCell = ({ row, onAction }: RowProp) => {
  const rowData = row.original;
  const t = useTranslations('table.buttons');
  const { isDesktop, isLaptop } = useBreakpoints();

  const hasValidNotes = rowData.sheetMusic?.some((note) => note.name || note.fileName);
  const showNotesButton = !!hasValidNotes;
  const showNotesInline = (isDesktop || isLaptop) && showNotesButton;

  const { canPlay, isCurrentTrack, isPlaying, handlePlayClick } = useCompositionPlayback(rowData);

  const handleNotesClick = () => {
    if (onAction) {
      onAction({ composition: rowData.compositionName, notes: rowData.sheetMusic || [] });
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
          stroke={'blue.800'}
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
      hidden: showNotesInline || !showNotesButton,
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
    <Typography variant="customItalic16" sx={opusGroupLabelTypographySx}>
      {formatted}
    </Typography>
  );
};

export const renderOpusTitleGroupLabel = (items: Music[]) => {
  const opusSlug = items[0]?.slug;
  const opusName = items[0]?.opusName;

  if (!opusSlug) {
    return (
      <Box sx={opusTitleGroupContainerSx}>
        <Typography variant="customBold16" sx={opusTitleTypographySx}>
          {opusName}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={opusTitleGroupContainerSx}>
      <Link
        href={getDynamicRoute.opus(opusSlug)}
        onClick={(e) => e.stopPropagation()}
        style={opusTitleLinkStyle}
        className="opus-group-link"
      >
        <Typography variant="customBold16" sx={opusTitleHoverTypographySx}>
          {opusName}
        </Typography>
      </Link>
    </Box>
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

export const GroupActionsCell = ({ items }: GroupActionsProps) => {
  const t = useTranslations('table.buttons');
  const locale = useLocale();
  const router = useRouter();

  const opusId = items[0]?.opusId;

  const playableItem = items.find((item) => item.audioAvailable && (item.audios?.length ?? 0) > 0);
  const { canPlay, isCurrentTrack, isPlaying, handlePlayClick } = useCompositionPlayback(playableItem ?? items[0]);

  const youtubeUrl = items[0]?.youtubeUrl ? `https://www.youtube.com/watch?v=${items[0].youtubeUrl}` : null;

  const handleYoutubeClick = () => {
    if (!youtubeUrl) return;
    window.open(youtubeUrl, '_blank', 'noopener,noreferrer');
  };

  const handleViewDetailsClick = () => {
    if (opusId) router.push(getDynamicRoute.opus(opusId));
  };

  const shareUrl = opusId ? `${window.location.origin}/${locale}${getDynamicRoute.opus(opusId)}` : '';

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
          stroke={'blue.800'}
        />
      ),
      disabled: !playableItem || !canPlay,
      labelSx: menuLabelItemSx,
      onClick: handlePlayClick
    },
    {
      id: 'youtube',
      label: t('watchOnYoutube'),
      icon: <Svg Component={YoutubeIcon} alt={t('watchOnYoutube')} width="24px" height="24px" stroke={'blue.800'} />,
      disabled: !youtubeUrl,
      labelSx: menuLabelItemSx,
      onClick: handleYoutubeClick
    },
    {
      id: 'share',
      label: t('copyLink'),
      icon: <Svg Component={ShareIcon} alt={t('copyLink')} width="24px" height="24px" stroke={'blue.800'} />,
      disabled: !opusId,
      labelSx: menuLabelItemSx,
      onClick: async () => {
        try {
          await navigator.clipboard.writeText(shareUrl);
        } catch {}
      }
    },
    {
      id: 'details',
      label: t('viewDetails'),
      icon: <Svg Component={ArrowRightIcon} alt={t('viewDetails')} width="24px" height="24px" stroke={'blue.800'} />,
      disabled: !opusId,
      labelSx: menuLabelItemSx,
      onClick: handleViewDetailsClick
    }
  ];

  return (
    <Box sx={actionsCellContainerSx}>
      <Box onClick={(e) => e.stopPropagation()}>
        <OverflowMenu
          items={menuItems}
          trigger={
            <IconButton
              size="small"
              variant={IconButtonColorVariant.Secondary}
              sx={iconButtonSecondaryPlainSx}
              data-testid="Artistry-opusOverflowMenuButton"
            >
              <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
            </IconButton>
          }
          dataTestId="Artistry-opusOverflowMenu"
        />
      </Box>
    </Box>
  );
};

export const renderGroupActionsCell = (items: Music[]) => <GroupActionsCell items={items} />;
