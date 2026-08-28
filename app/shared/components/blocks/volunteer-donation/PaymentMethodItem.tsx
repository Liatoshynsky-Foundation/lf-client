import { Box, Typography } from '@mui/material';
import React from 'react';

import CopyLink from '~/ds-components/copy-link/CopyLink';

import { PaymentMethod } from './VolunteerDonation';
import { styles } from './VolunteerDonation.styles';

interface PaymentMethodItemProps {
  method: PaymentMethod;
  hint: string;
}

export const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ method, hint }) => {
  return (
    <Box sx={styles.card}>
      <Box sx={styles.paymentMethodContainer}>
        {method.label && <Typography sx={styles.label}>{method.label}:</Typography>}

        <CopyLink sx={styles.value} hint={hint} size="large" value={method.value} forceShowCopyIcon={true} />
      </Box>
    </Box>
  );
};
