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
  const baseTestId = dataTestId || `FundCard-${id}`;

  return (
    <Box component="article" sx={styles.card} data-testid={baseTestId} aria-label={`${number}: ${title}`}>
      <Typography sx={styles.fundNumber} data-testid={`${baseTestId}-number`}>
        {number}
      </Typography>

      <Typography className="fundTitle" sx={styles.fundTitle} data-testid={`${baseTestId}-title`}>
        {title}
      </Typography>

      <Box className="fundLine" sx={styles.fundLine} data-testid={`${baseTestId}-line`} />
    </Box>
  );
}
