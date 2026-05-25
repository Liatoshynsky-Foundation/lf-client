'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';

import { styles } from './BaseCard.styles';

import { type CropRect } from '~/lib/utils/cropUtils';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import { useImageCrop } from '~/shared/hooks/use-image-crop/useImageCrop';

export type Variant = 'news' | 'press';

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

  const { containerRef, imgRef, handleImageLoad, croppedImgStyle } = useImageCrop(crop);

  const cardContent = (
    <Box component="article" sx={styles.card} data-testid={dataTestId} aria-label={title}>
      <Box ref={containerRef} sx={styles.imageContainer} data-testid={`${dataTestId}-imageContainer`}>
        {crop ? (
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
