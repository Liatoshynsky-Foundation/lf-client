'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import SectionTitle from '~/components/section-title/SectionTitle';

import { PaymentMethodItem } from './PaymentMethodItem';
import { imageSizes, styles } from './VolunteerDonation.styles';

import { type CropRect } from '~/lib/utils/cropUtils';

const PUBLIC_STORAGE_BASE_URL = process.env.NEXT_PUBLIC_STORAGE_BASE_URL ?? '';

export interface PaymentMethod {
  label: string;
  value: string;
}

export interface VolunteerDonationProps {
  data?: {
    title: string | Record<'uk' | 'en', string>;
    paymentMethods: PaymentMethod[];
    image?: {
      src: string;
      generatedSrc?: string;
      crop?: CropRect | null;
    };
    imageSrc?: string;
    caption?: string | Record<'uk' | 'en', string>;
  };
}

const VolunteerDonation: React.FC<VolunteerDonationProps> = ({ data }) => {
  const t = useTranslations('common');
  if (!data) return null;

  const rawSrc = data.image?.generatedSrc || data.image?.src || data.imageSrc;

  const getFinalSrc = (src?: string): string => {
    if (!src) return '';
    if (src.startsWith('http') || src.startsWith('/')) {
      return src;
    }
    return `${PUBLIC_STORAGE_BASE_URL}/photos${src}`;
  };

  const finalSrc = getFinalSrc(rawSrc);

  const crop = data.image?.crop || null;
  const titleText = typeof data.title === 'string' ? data.title : 'Volunteer Donation';
  const captionText = typeof data.caption === 'string' ? data.caption : '';

  return (
    <Box sx={styles.mainContainer}>
      <SectionTitle
        title={data.title}
        sx={styles.title}
        icon={false}
        gridColumn={{ xs: '1 / -1', sm: '4 / -1', md: '6 / -1' }}
      />

      <Box sx={styles.contentWrapper}>
        {(data.paymentMethods || []).map((method, idx) => (
          <PaymentMethodItem key={`${method.value}-${idx}`} method={method} hint={t('copied')} />
        ))}
      </Box>

      {finalSrc && (
        <ImageWithCaption
          src={finalSrc}
          alt={titleText}
          caption={captionText}
          crop={crop}
          captionSx={styles.captionSx}
          align="right"
          sizes={imageSizes.sizes}
          border={imageSizes.border}
          containerSx={styles.img}
          imageSx={imageSizes.imageSx}
        />
      )}
    </Box>
  );
};

export default VolunteerDonation;
