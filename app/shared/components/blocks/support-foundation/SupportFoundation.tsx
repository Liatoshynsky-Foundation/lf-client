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
      <Typography variant="h2" sx={styles.sectionTitle} data-testid="SupportUsPage-mainTitle">
        {t('title')}
      </Typography>

      <Box sx={styles.donationSection}>
        <Box sx={styles.donationFormWrapper}>
          <DonationForm data-testid="SupportUsPage-donationForm" />
        </Box>
        <Box sx={styles.infoSection} data-testid="SupportUsPage-infoSection">
          <Typography variant="body2" sx={styles.sectionSubtitle} data-testid="SupportUsPage-infoSection-subtitle">
            {t.rich('subTitle', { b: bold })}
          </Typography>
          <PaymentDetails data-testid="SupportUsPage-paymentDetails" />
        </Box>
      </Box>
    </Box>
  );
}

export default SupportFoundation;
