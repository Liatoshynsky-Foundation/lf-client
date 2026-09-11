'use client';

import { Box, type BoxProps } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import React from 'react';

import { styles } from './ImageCarouselSection.styles';
import { sxToArray } from '~/utils/sxToArray';

import { CropRect } from '~/lib/utils/cropUtils';
import Carousel from '~/shared/components/design-system/all-components/carousel/Carousel';
import { IMAGES } from '~/shared/constants/assets';
import { isValidUrl } from '~/shared/utils/isValidUrl';

export type ImageCarouselSectionProps = BoxProps & {
  data?: {
    images?: Array<{
      id?: string | number;
      src: string;
      generatedSrc?: string;
      alt: Record<'uk' | 'en', string> | string;
      caption?: Record<'uk' | 'en', string> | string;
      crop?: { rect: CropRect } | null;
    }>;
  };
};

const ImageCarouselSection: React.FC<ImageCarouselSectionProps> = ({ sx, data, ...props }) => {
  const t = useTranslations('warCarousel');
  const locale = useLocale() as 'uk' | 'en';

  const carouselImages = React.useMemo(() => {
    const getLocalizedText = (field: Record<'uk' | 'en', string> | string | undefined) => {
      if (!field) return '';
      if (typeof field === 'string') return field;
      return field[locale] || field['uk'] || '';
    };

    const defaultImages = [
      {
        id: 1,
        src: IMAGES.WAR_IN_UKRAINE_CAROUSEL(1),
        alt: 'Carousel Image 1',
        description: t('photo1')
      },
      {
        id: 2,
        src: IMAGES.WAR_IN_UKRAINE_CAROUSEL(2),
        alt: 'Carousel Image 2',
        description: t('photo2')
      },
      {
        id: 3,
        src: IMAGES.WAR_IN_UKRAINE_CAROUSEL(3),
        alt: 'Carousel Image 3',
        description: t('photo3')
      }
    ];

    if (!data?.images || data.images.length === 0) {
      return defaultImages;
    }

    return data.images
      .filter((img) => isValidUrl(img.src))
      .map((img, index) => {
        const parsedCrop = img.crop?.rect || null;

        return {
          id: img.id || index,
          src: img.src,
          alt: getLocalizedText(img.alt),
          description: getLocalizedText(img.caption),
          crop: parsedCrop
        };
      });
  }, [data?.images, locale, t]);

  if (carouselImages.length === 0) {
    return null;
  }

  return (
    <Box sx={[styles.carouselSectionContainer, ...sxToArray(sx)]} {...props}>
      <Carousel images={carouselImages} infiniteLoop={true} />
    </Box>
  );
};

export default ImageCarouselSection;
