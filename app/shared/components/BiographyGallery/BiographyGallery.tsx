'use client';

import { Box } from '@mui/material';
import type { Locale } from 'next-intl';
import React, { useMemo, useState } from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';

import { styles } from './BiographyGallery.styles';
import type { ElementSizes } from '~/types/types/common.types';

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
  onHoverChange: (paused: boolean) => void;
}

const Frame: React.FC<FrameProps> = ({ images, onHoverChange }) => {
  return (
    <Box sx={styles.frame} data-testid="BiographyGallery-frame">
      {images.map((img) => {
        const hasCaption = Boolean(img.caption);
        const captionForRender = hasCaption ? img.caption : '\u00A0';

        return (
          <Box
            key={img.id}
            onMouseEnter={() => onHoverChange(true)}
            onMouseLeave={() => onHoverChange(false)}
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

const PHOTOS_PER_FRAME = 5;

function chunk<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
  return res;
}

export default function BiographyGallery({ images, durationSec = 60, frameRepeats = 4 }: BiographyGalleryProps) {
  const [paused, setPaused] = useState(false);

  const trackContent = useMemo(() => {
    const framesImages = chunk(images, PHOTOS_PER_FRAME);
    const framesToRender = framesImages.slice(0, frameRepeats);

    const out: React.ReactNode[] = [];

    for (let i = 0; i < framesToRender.length; i += 1) {
      out.push(<Frame key={`frame-a-${i}`} images={framesToRender[i]} onHoverChange={setPaused} />);
    }

    for (let i = 0; i < framesToRender.length; i += 1) {
      out.push(<Frame key={`frame-b-${i}`} images={framesToRender[i]} onHoverChange={setPaused} />);
    }

    return out;
  }, [images, frameRepeats]);

  return (
    <Box sx={styles.root} data-testid="BiographyGallery">
      <Box sx={styles.track(durationSec, paused)} data-testid="BiographyGallery-track">
        {trackContent}
      </Box>
    </Box>
  );
}
