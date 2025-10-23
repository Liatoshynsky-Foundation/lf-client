'use client';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import ButtonGroup from '~/ds-components/button-group/ButtonGroup';

import { SvgImage } from '../../svg-image/SvgImage';
import { currencyList, currencyType, paymentDetails, paymentFields } from './constants';
import { styles } from './PaymentDetails.styles';

function PaymentDetails() {
  const [currency, setCurrency] = useState<currencyType>('uah');
  const selectedPaymentDetails = useMemo(() => paymentDetails[currency], [currency]);

  const handleCopyIban = useCallback(async () => {
    await navigator.clipboard.writeText(selectedPaymentDetails.iban);
  }, [selectedPaymentDetails.iban]);

  return (
    <Box>
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
      />

      <Box sx={styles.paymentDetailsContainer}>
        {paymentFields.map(({ label, key, isIban }) => (
          <Box sx={styles.paymentDetailsRow} key={label}>
            <Typography component="h6" variant="customSemiBold20">
              {label}
            </Typography>

            {isIban ? (
              <Typography variant="customSemiBold20" sx={styles.iban}>
                <Typography component="span" variant="customSemiBold20" sx={styles.ibanText}>
                  {selectedPaymentDetails[key]}
                </Typography>
                <IconButton size="small" onClick={handleCopyIban}>
                  <SvgImage src="/icons/content-copy.svg" alt="content copy" width={24} height={24} />
                </IconButton>
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
