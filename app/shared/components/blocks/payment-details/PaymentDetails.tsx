'use client';
import { Box, IconButton, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { SvgImage } from '../../svg-image/SvgImage';
import { currencyList, currencyType, paymentDetails, paymentFields } from './constants';
import { styles } from './PaymentDetails.styles';

function PaymentDetails() {
  const [currency, setCurrency] = useState<currencyType>('uah');
  const selectedPaymentDetails = useMemo(() => paymentDetails[currency], [currency]);

  const handleChange = useCallback((_: React.MouseEvent<HTMLElement>, newCurrency: string) => {
    setCurrency(newCurrency as currencyType);
  }, []);

  const handleCopyIban = useCallback(async () => {
    await navigator.clipboard.writeText(selectedPaymentDetails.iban);
  }, [selectedPaymentDetails.iban]);

  return (
    <Box mt={'100px'} mb={'100px'} sx={{ gridColumn: '1 / -1' }}>
      <ToggleButtonGroup
        sx={styles.buttonContainer}
        value={currency}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        {currencyList.map((currency) => (
          <ToggleButton sx={styles.currencyBtn} value={currency} key={currency}>
            {currency.toUpperCase()}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Box sx={styles.paymentDetailsContainer}>
        {paymentFields.map(({ label, key, isIban }) => (
          <Box sx={styles.paymentDetailsRow} key={label}>
            <Typography component="h6" variant="customSemiBold20">
              {label}
            </Typography>

            {isIban ? (
              <Typography variant="customSemiBold20" sx={styles.iban}>
                {selectedPaymentDetails[key]}
                <IconButton size="small" sx={styles.copyIcon} onClick={handleCopyIban}>
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
