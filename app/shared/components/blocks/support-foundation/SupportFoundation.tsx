'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import PaymentDetails from '~/components/blocks/payment-details/PaymentDetails';
import DonationForm from '~/components/forms/donation-form/DonationForm';

import { renderBold } from '../../rich-text/RichTextComponents';
import { styles } from './SupportFoundation.styles';

function SupportFoundation() {
  const t = useTranslations('supportUs.donation');

  return (
    <Box sx={styles.wrapper} data-testid="SupportFoundation">
      <Typography variant="h1" sx={styles.sectionTitle} data-testid="SupportFoundation-title">
        {t('title')}
      </Typography>

      <Box sx={styles.donationFormWrapper}>
        <DonationForm />
      </Box>
      <Box sx={styles.infoSection} data-testid="SupportFoundation-infoSection">
        <Typography variant="body2" sx={styles.sectionSubtitle} data-testid="SupportFoundation-infoSection-subtitle">
          {t.rich('subTitle', { b: renderBold })}
          <br />
          <br />
          {t.rich('methods.wayForPay', { b: renderBold })}
          <br />
          <br />
          {t.rich('methods.iban', { b: renderBold })}
        </Typography>
        <PaymentDetails />
      </Box>
    </Box>
  );
}

export default SupportFoundation;
