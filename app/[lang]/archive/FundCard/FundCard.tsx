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
      component="article"
      sx={styles.card}
      data-testid={dataTestId || `FundCard-${id}`}
      aria-label={`${number}: ${title}`}
    >
      <Typography sx={styles.fundNumber} data-testid={`${dataTestId || `FundCard-${id}`}-number`}>
        {number}
      </Typography>

      <Typography className="fundTitle" sx={styles.fundTitle} data-testid={`${dataTestId || `FundCard-${id}`}-title`}>
        {title}
      </Typography>

      <Box className="fundLine" sx={styles.fundLine} data-testid={`${dataTestId || `FundCard-${id}`}-line`} />
    </Box>
  );
}
