'use client';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

import DonationForm from '../../forms/donation-form/DonationForm';
import PaymentDetails from '../payment-details/PaymentDetails';
import { styles } from './SupportFoundation.styles';

function SupportFoundation() {
  const t = useTranslations('supportUs.donation');
  const bold = useCallback((chunks: React.ReactNode) => <b>{chunks}</b>, []);

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h2" sx={styles.sectionTitle}>
        {t('title')}
      </Typography>

      <Box sx={styles.donationSection}>
        <Box sx={styles.donationFormWrapper}>
          <DonationForm />
        </Box>
        <Box>
          <Typography variant="body2" sx={styles.sectionSubtitle}>
            {t.rich('subTitle', { b: bold })}
          </Typography>
          <PaymentDetails />
        </Box>
      </Box>
    </Box>
  );
}

export default SupportFoundation;
