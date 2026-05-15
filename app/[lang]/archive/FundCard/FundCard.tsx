'use client';

import { Box, Typography } from '@mui/material';
import { useLocale } from 'next-intl';

import { styles } from './FundCard.styles';

import { Link } from '~/i18n/navigation';
import { getDynamicRoute } from '~/shared/components/constants/routes';

export interface FundCardProps {
  id: number;
  number: { en: string; uk: string } | string;
  title: { en: string; uk: string } | string;
}

export default function FundCard({ id, number, title }: Readonly<FundCardProps>) {
  const locale = useLocale();
  function getLocalizedText(text: { en: string; uk: string } | string) {
    if (typeof text === 'string') {
      return text;
    }
    return text[locale];
  }
  return (
    <Link href={getDynamicRoute.archiveFund(id)} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box
        component="article"
        sx={styles.card}
        data-testid="FundCard"
        aria-label={`${getLocalizedText(number)}: ${getLocalizedText(title)}`}
      >
        <Typography sx={styles.fundNumber} data-testid="FundCard-number">
          {getLocalizedText(number)}
        </Typography>

        <Typography className="fundTitle" sx={styles.fundTitle} data-testid="FundCard-title">
          {getLocalizedText(title)}
        </Typography>

        <Box className="fundLine" sx={styles.fundLine} data-testid="FundCard-line" />
      </Box>
    </Link>
  );
}
