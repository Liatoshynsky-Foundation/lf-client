import { Box, Typography } from '@mui/material';
import React, { useRef } from 'react';

import { CopyButton } from '~/components/copy-button/CopyButton';

import { PaymentMethod } from './VolunteerDonation';
import { styles } from './VolunteerDonation.styles';

interface PaymentMethodItemProps {
  method: PaymentMethod;
  hint: string;
}

export const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ method, hint }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  return (
    <Box sx={styles.card}>
      <Box sx={styles.paymentMethodContainer}>
        {method.label && <Typography sx={styles.label}>{method.label}:</Typography>}

        <Box sx={styles.valueContainer}>
          <Typography component="span" ref={textRef} sx={styles.value}>
            {method.value}
          </Typography>

          <CopyButton targetRef={textRef} hint={hint} iconSize="medium" />
        </Box>
      </Box>
    </Box>
  );
};
