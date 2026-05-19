'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Button from '~/ds-components/button/Button';

import { styles } from './BaseCard.styles';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export type Variant = 'news' | 'press';

export type CropRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface BaseCardProps {
  image: string;
  crop?: CropRect | null;
  title: string;
  publicationDate: string;
  description: string;
  href: string;
  variant: Variant;
  dataTestId?: string;
}

function buildCroppedStyle(
  crop: CropRect,
  natW: number,
  natH: number,
  containerW: number,
  containerH: number
): React.CSSProperties {
  const scaleX = containerW / crop.width;
  const scaleY = containerH / crop.height;
  const scale = Math.max(scaleX, scaleY);
  const translateX = -(crop.x * scale) + (containerW - crop.width * scale) / 2;
  const translateY = -(crop.y * scale) + (containerH - crop.height * scale) / 2;
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: natW,
    height: natH,
    maxWidth: 'none',
    transformOrigin: '0 0',
    transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`
  };
}

const BUTTON_CONFIG = {
  news: { showIcon: false },
  press: { showIcon: true }
} as const;

export default function BaseCard({
  image,
  crop,
  title,
  publicationDate,
  description,
  href,
  variant,
  dataTestId = 'BaseCard'
}: Readonly<BaseCardProps>) {
  const t = useTranslations('news');
  const buttonConfig = BUTTON_CONFIG[variant];
  const isExternalLink = href.startsWith('http://') || href.startsWith('https://');

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [natSize, setNatSize] = useState({ w: 0, h: 0 });
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!crop) return;
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth) {
      setNatSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  }, [crop]);

  const handleImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    setNatSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight });
  }, []);

  const croppedImgStyle = useMemo((): React.CSSProperties => {
    if (!natSize.w || !natSize.h || !containerSize.w || !containerSize.h) {
      return { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' };
    }
    return buildCroppedStyle(crop!, natSize.w, natSize.h, containerSize.w, containerSize.h);
  }, [crop, natSize, containerSize]);

  const cardContent = (
    <Box component="article" sx={styles.card} data-testid={dataTestId} aria-label={title}>
      <Box ref={containerRef} sx={styles.imageContainer} data-testid={`${dataTestId}-imageContainer`}>
        {crop != null ? (
          <img ref={imgRef} src={image} alt={title} loading="lazy" onLoad={handleImageLoad} style={croppedImgStyle} />
        ) : (
          <Image src={image} alt={title} fill style={styles.image} sizes="(max-width: 768px) 100vw, 33vw" />
        )}
      </Box>

      <Box sx={styles.content} data-testid={`${dataTestId}-content`}>
        <Typography sx={styles.title} data-testid={`${dataTestId}-title`}>
          {title}
        </Typography>

        <Typography sx={styles.date} data-testid={`${dataTestId}-date`}>
          {t('publishedAtLabel')} {publicationDate}
        </Typography>

        <Typography sx={styles.description} data-testid={`${dataTestId}-description`}>
          {description}
        </Typography>

        <Box sx={styles.buttonWrapper} data-testid={`${dataTestId}-buttonWrapper`}>
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            fullWidth
            endIcon={
              buttonConfig.showIcon ? (
                <SvgImage src="/icons/external-link.svg" alt="arrow" width={20} height={20} />
              ) : undefined
            }
            data-testid={`${dataTestId}-button`}
          >
            {variant === 'news' ? t('viewButton') : t('goToButton')}
          </Button>
        </Box>
      </Box>
    </Box>
  );

  if (isExternalLink) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      {cardContent}
    </Link>
  );
}
