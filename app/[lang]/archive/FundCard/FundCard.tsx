'use client';

import { Box, Typography } from '@mui/material';

import { styles } from './FundCard.styles';

import { Link } from '~/i18n/navigation';
import { getDynamicRoute } from '~/shared/components/constants/routes';

export interface FundCardProps {
  id: number;
  number: string;
  title: string;
}

export default function FundCard({ id, number, title }: Readonly<FundCardProps>) {
  return (
    <Link href={getDynamicRoute.archiveFund(id)} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Box component="article" sx={styles.card} data-testid="FundCard" aria-label={`${number}: ${title}`}>
        <Typography sx={styles.fundNumber} data-testid="FundCard-number">
          {number}
        </Typography>

        <Typography className="fundTitle" sx={styles.fundTitle} data-testid="FundCard-title">
          {title}
        </Typography>

        <Box className="fundLine" sx={styles.fundLine} data-testid="FundCard-line" />
      </Box>
    </Link>
  );
}
