'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';

import { styles } from './BaseCard.styles';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type Variant = 'news' | 'press';

export interface BaseCardProps {
  image: string;
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
  title,
  publicationDate,
  description,
  href,
  variant,
  dataTestId = 'BaseCard'
}: Readonly<BaseCardProps>) {
  const t = useTranslations('news');
  const buttonConfig = BUTTON_CONFIG[variant];

  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box component="article" sx={styles.card} data-testid={dataTestId} aria-label={title}>
        <Box sx={styles.imageContainer} data-testid={`${dataTestId}-imageContainer`}>
          <Image src={image} alt={title} fill style={styles.image} sizes="(max-width: 768px) 100vw, 33vw" />
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
    </Link>
  );
}
