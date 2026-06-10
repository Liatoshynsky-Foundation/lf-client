'use client';

import { Box } from '@mui/material';
import { type Locale, useLocale, useTranslations } from 'next-intl';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';

import { styles } from './BiographyGallery.styles';
import type { ElementSizes } from '~/types/types/common.types';

import { getPlainString } from '~/lib/utils/tiptapHelpers';

type LocalizedString = Record<Locale, string>;

interface FrameImage {
  id: string;
  src: string;
  alt: LocalizedString;
  caption: LocalizedString | null;
  sizes: ElementSizes;
  alignSelf: 'flex-start' | 'flex-end';
  ml: number;
}

interface BiographyGalleryProps {
  images: FrameImage[];
  durationSec?: number;
  frameRepeats?: number;
}

interface FrameProps {
  images: FrameImage[];
  interactive: boolean;
  locale: Locale;
  onPauseChange: (paused: boolean) => void;
  onPhotoKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const PHOTOS_PER_FRAME = 5;
const FOCUSABLE_PHOTO_SELECTOR = '[data-biography-photo="true"]';

const Frame: React.FC<FrameProps> = ({ images, interactive, locale, onPauseChange, onPhotoKeyDown }) => {
  return (
    <Box sx={styles.frame} data-testid="BiographyGallery-frame" aria-hidden={!interactive}>
      {images.map((img) => {
        const hasCaption = Boolean(img.caption);
        const captionForRender = hasCaption ? img.caption : ' ';

        return (
          <Box
            key={img.id}
            role="img"
            aria-label={getPlainString(img.alt, locale)}
            tabIndex={interactive ? 0 : -1}
            data-biography-photo={interactive ? 'true' : undefined}
            onMouseEnter={() => onPauseChange(true)}
            onMouseLeave={() => onPauseChange(false)}
            onFocus={() => onPauseChange(true)}
            onBlur={() => onPauseChange(false)}
            onKeyDown={interactive ? onPhotoKeyDown : undefined}
            sx={{
              ...styles.imageWrapper,
              alignSelf: img.alignSelf,
              ml: img.ml,
              width: img.sizes.width
            }}
            data-testid={`BiographyGallery-photoWrapper-${img.id}`}
          >
            <ImageWithCaption
              src={img.src}
              alt={img.alt}
              caption={captionForRender}
              sizes={img.sizes}
              align="left"
              containerSx={{ width: '100%' }}
              imageSx={{
                width: '100%',
                height: img.sizes.height
              }}
              captionClassName={hasCaption ? 'bioCaption--real' : 'bioCaption--placeholder'}
              captionSx={[styles.captionBase, hasCaption ? styles.captionAnimated : { opacity: 0 }]}
              dataTestId={`BiographyGallery-image-${img.id}`}
            />
          </Box>
        );
      })}
    </Box>
  );
};

function chunk<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];

  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }

  return res;
}

export default function BiographyGallery({
  images,
  durationSec = 60,
  frameRepeats = 4
}: Readonly<BiographyGalleryProps>): React.ReactElement {
  const t = useTranslations('biography.gallery');
  const locale = useLocale() as Locale;
  const [paused, setPaused] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const handlePhotoKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }

    const root = rootRef.current;

    if (!root) {
      return;
    }

    const focusables = Array.from(root.querySelectorAll<HTMLDivElement>(FOCUSABLE_PHOTO_SELECTOR));
    const currentIndex = focusables.indexOf(event.currentTarget);

    if (currentIndex === -1) {
      return;
    }

    event.preventDefault();

    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (currentIndex + delta + focusables.length) % focusables.length;
    focusables[nextIndex]?.focus();
  }, []);

  const trackContent = useMemo(() => {
    const framesImages = chunk(images, PHOTOS_PER_FRAME);
    const framesToRender = framesImages.slice(0, frameRepeats);

    const out: React.ReactNode[] = [];

    for (let i = 0; i < framesToRender.length; i += 1) {
      out.push(
        <Frame
          key={`frame-a-${i}`}
          images={framesToRender[i]}
          interactive
          locale={locale}
          onPauseChange={setPaused}
          onPhotoKeyDown={handlePhotoKeyDown}
        />
      );
    }

    for (let i = 0; i < framesToRender.length; i += 1) {
      out.push(
        <Frame
          key={`frame-b-${i}`}
          images={framesToRender[i]}
          interactive={false}
          locale={locale}
          onPauseChange={setPaused}
        />
      );
    }

    return out;
  }, [images, frameRepeats, handlePhotoKeyDown, locale]);

  return (
    <Box
      ref={rootRef}
      role="group"
      aria-roledescription={t('roleDescription')}
      aria-label={t('navigationHint')}
      sx={styles.root}
      data-testid="BiographyGallery"
    >
      <Box sx={styles.track(durationSec, paused)} data-testid="BiographyGallery-track">
        {trackContent}
      </Box>
    </Box>
  );
}
