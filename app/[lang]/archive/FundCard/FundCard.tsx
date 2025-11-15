'use client';

import { Box, Typography } from '@mui/material';

import { styles } from './FundCard.styles';

export interface FundCardProps {
  id: number;
  number: string;
  title: string;
  dataTestId?: string;
}

export default function FundCard({ id, number, title, dataTestId }: Readonly<FundCardProps>) {
  return (
    <Box
      sx={styles.card}
      data-testid={dataTestId || `FundCard-${id}`}
      role="article"
      aria-label={`${number}: ${title}`}
    >
      <Typography sx={styles.fundNumber} data-testid={`${dataTestId || `FundCard-${id}`}-number`}>
        {number}
      </Typography>

      <Typography sx={styles.fundTitle} data-testid={`${dataTestId || `FundCard-${id}`}-title`}>
        {title}
      </Typography>

      <Box className="fund-line" sx={styles.fundLine} data-testid={`${dataTestId || `FundCard-${id}`}-line`} />
    </Box>
  );
}
