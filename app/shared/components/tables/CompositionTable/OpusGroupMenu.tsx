'use client';

import { Box, Snackbar } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';

import { actionsCellContainerSx, iconButtonSecondaryPlainSx, menuLabelItemSx } from './MusicTableCells.styles';
import { IconButtonColorVariant } from '~/types/enums/common.enums';
import type { Music } from '~/types/types/enhancedTable';
import type { OverflowMenuItemConfig } from '~/types/types/menu.types';

import { getPathname, useRouter } from '~/i18n/navigation';
import { getDynamicRoute } from '~/shared/components/constants/routes';
import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import OverflowMenu from '~/shared/components/design-system/all-components/overflow-menu/OverflowMenu';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import { useCompositionPlayback } from '~/shared/hooks/use-composition-playback/useCompositionPlayback';

type OpusGroupMenuProps = Readonly<{ group: Music[] }>;

const COPIED_FEEDBACK_DURATION = 2500;

export const OpusGroupMenu: React.FC<OpusGroupMenuProps> = ({ group }) => {
  const t = useTranslations('table.buttons');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();

  const [copied, setCopied] = useState(false);

  const firstComposition = group[0];
  const { opusId, opusYoutubeUrl } = firstComposition;

  const { canPlay, isCurrentTrack, isPlaying, handlePlayClick } = useCompositionPlayback(firstComposition);

  const isPlayingCurrent = isCurrentTrack && isPlaying;

  const handleWatchYoutube = (): void => {
    if (opusYoutubeUrl) {
      window.open(opusYoutubeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleShare = async (): Promise<void> => {
    if (!opusId) {
      return;
    }

    const path = getPathname({ href: getDynamicRoute.opus(opusId), locale });
    const shareUrl = `${window.location.origin}${path}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[UI:OpusGroupMenu] Failed to copy opus URL to clipboard:', error);
    }
  };

  const handleViewDetails = (): void => {
    if (opusId) {
      router.push(getDynamicRoute.opus(opusId));
    }
  };

  const menuItems: OverflowMenuItemConfig[] = [
    {
      id: 'play',
      label: t('listenToComposition'),
      icon: (
        <SvgImage
          src={isPlayingCurrent ? '/icons/pause.svg' : '/icons/play.svg'}
          alt={t('listenToComposition')}
          width={24}
          height={24}
        />
      ),
      disabled: !canPlay,
      labelSx: menuLabelItemSx,
      onClick: handlePlayClick
    },
    {
      id: 'youtube',
      label: t('watchOnYouTube'),
      icon: <SvgImage src="/icons/youtube.svg" alt={t('watchOnYouTube')} width={24} height={24} />,
      hidden: !opusYoutubeUrl,
      labelSx: menuLabelItemSx,
      onClick: handleWatchYoutube
    },
    {
      id: 'share',
      label: t('share'),
      icon: <SvgImage src="/icons/share.svg" alt={t('share')} width={24} height={24} />,
      labelSx: menuLabelItemSx,
      onClick: handleShare
    },
    {
      id: 'details',
      label: t('viewDetails'),
      icon: <SvgImage src="/icons/arrow-right-from-line.svg" alt={t('viewDetails')} width={24} height={24} />,
      divider: true,
      disabled: !opusId,
      labelSx: menuLabelItemSx,
      onClick: handleViewDetails
    }
  ];

  return (
    <Box sx={actionsCellContainerSx}>
      <OverflowMenu
        items={menuItems}
        trigger={
          <IconButton
            size="small"
            variant={IconButtonColorVariant.Secondary}
            sx={iconButtonSecondaryPlainSx}
            onClick={(e) => e.stopPropagation()}
            data-testid="Artistry-opusGroupMenuButton"
          >
            <SvgImage src="/icons/ellipsis-vertical.svg" alt="menu" width={24} height={24} />
          </IconButton>
        }
        dataTestId="Artistry-opusGroupMenu"
      />

      <Snackbar
        open={copied}
        autoHideDuration={COPIED_FEEDBACK_DURATION}
        onClose={() => setCopied(false)}
        message={tCommon('copied')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};
