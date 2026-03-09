'use client';
import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import CopyLink from '~/ds-components/copy-link/CopyLink';

import { currencyList, currencyType, paymentDetails, paymentFields } from './constants';
import { styles } from './PaymentDetails.styles';

function PaymentDetails() {
  const [currency, setCurrency] = useState<currencyType>('uah');
  const selectedPaymentDetails = useMemo(() => paymentDetails[currency], [currency]);
  const t = useTranslations('supportUs.payment');

  const switcherSx = useMemo(() => {
    const buttonsCount = currencyList.length;

    return {
      ...styles.buttonGroup,
      '& [aria-label="indicator"]': {
        ...styles.buttonGroup['& [aria-label="indicator"]'],
        width: {
          xs: `calc((100% - 8px) / ${buttonsCount})`,
          sm: '66px'
        }
      }
    };
  }, []);

  return (
    <Box data-testid="PaymentDetails">
      <ButtonGroup
        sx={switcherSx}
        defaultActiveButton={0}
        buttons={currencyList.map((currency) => (
          <Button
            sx={styles.currencyBtn}
            value={currency}
            key={currency}
            onClick={() => setCurrency(currency as currencyType)}
          >
            {currency.toUpperCase()}
          </Button>
        ))}
        data-testid="PaymentDetails-currencySwitcher"
      />

      <Box sx={styles.paymentDetailsContainer}>
        {paymentFields.map(({ label, key, isIban }) => (
          <Box sx={styles.paymentDetailsRow} key={label}>
            <Typography component="h6" variant="customSemiBold20">
              {label}
            </Typography>

            {isIban ? (
              <CopyLink
                hint={t('copyHint')}
                size="large"
                value={selectedPaymentDetails[key]}
                forceShowCopyIcon={true}
                sx={styles.iban}
                iconSx={styles.ibanIcon}
              />
            ) : (
              <Typography variant="customSemiBold20">{selectedPaymentDetails[key]}</Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PaymentDetails;
