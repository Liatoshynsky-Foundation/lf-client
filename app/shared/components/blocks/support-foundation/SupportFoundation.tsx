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
    <Box sx={styles.wrapper} data-testid="SupportFoundation">
      <Typography variant="h2" sx={styles.sectionTitle} data-testid="SupportFoundation-title">
        {t('title')}
      </Typography>

      <Box sx={styles.donationSection} data-testid="SupportFoundation-donationSection">
        <Box sx={styles.donationFormWrapper}>
          <DonationForm />
        </Box>
        <Box sx={styles.infoSection} data-testid="SupportFoundation-infoSection">
          <Typography variant="body2" sx={styles.sectionSubtitle} data-testid="SupportFoundation-infoSection-subtitle">
            {t.rich('subTitle', { b: bold })}
          </Typography>
          <PaymentDetails />
        </Box>
      </Box>
    </Box>
  );
}

export default SupportFoundation;
