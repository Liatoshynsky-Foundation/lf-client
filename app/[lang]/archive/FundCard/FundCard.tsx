'use client';

import { Box, Typography } from '@mui/material';
import { useLocale } from 'next-intl';

import { styles } from './FundCard.styles';

import { Link } from '~/i18n/navigation';

export interface FundCardProps {
  id: number;
  number: { en: string; uk: string };
  title: { en: string; uk: string };
}

export default function FundCard({ id, number, title }: Readonly<FundCardProps>) {
  const locale = useLocale();
  return (
    <Link href={`/archive/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box
        component="article"
        sx={styles.card}
        data-testid="FundCard"
        aria-label={`${number[locale]}: ${title[locale]}`}
      >
        <Typography sx={styles.fundNumber} data-testid="FundCard-number">
          {number[locale]}
        </Typography>

        <Typography className="fundTitle" sx={styles.fundTitle} data-testid="FundCard-title">
          {title[locale]}
        </Typography>

        <Box className="fundLine" sx={styles.fundLine} data-testid="FundCard-line" />
      </Box>
    </Link>
  );
}
