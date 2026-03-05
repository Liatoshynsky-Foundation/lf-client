import { Box, Typography } from '@mui/material';
import { useLocale } from 'next-intl';
import React from 'react';

import CopyLink from '~/ds-components/copy-link/CopyLink';

import { PaymentMethod } from './VolunteerDonation';
import { styles } from './VolunteerDonation.styles';

interface PaymentMethodItemProps {
  method: PaymentMethod;
  hint: string;
}

export const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ method, hint }) => {
  const locale = useLocale();

  return (
    <Box sx={styles.card}>
      <Box sx={styles.paymentMethodContainer}>
        {method.label && <Typography sx={styles.label}>{method.label[locale]}:</Typography>}

        <CopyLink hint={hint} size="large" value={method.value} />
      </Box>
    </Box>
  );
};
