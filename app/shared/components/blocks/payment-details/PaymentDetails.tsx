'use client';
import { Box, Button, Typography } from '@mui/material';
import { useMemo, useRef, useState } from 'react';

import ButtonGroup from '~/ds-components/button-group/ButtonGroup';

import { currencyList, currencyType, paymentDetails, paymentFields } from './constants';
import { styles } from './PaymentDetails.styles';

import { CopyButton } from '~/shared/components/copy-button/CopyButton';

function PaymentDetails() {
  const [currency, setCurrency] = useState<currencyType>('uah');
  const selectedPaymentDetails = useMemo(() => paymentDetails[currency], [currency]);
  const ibanRef = useRef<HTMLSpanElement>(null);

  return (
    <Box data-testid="PaymentDetails">
      <ButtonGroup
        sx={styles.buttonGroup}
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
              <Typography component="div" variant="customSemiBold20" sx={styles.iban}>
                <Typography component="span" variant="customSemiBold20" sx={styles.ibanText} ref={ibanRef}>
                  {selectedPaymentDetails[key]}
                </Typography>
                <CopyButton targetRef={ibanRef} hint="IBAN is copied" iconSize="large" />
              </Typography>
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
