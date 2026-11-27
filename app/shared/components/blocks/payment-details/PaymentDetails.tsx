'use client';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

import ButtonGroup from '~/ds-components/button-group/ButtonGroup';

import PaymentDetailsContent from './payment-details-content/PaymentDetailsContent';
import { styles } from './PaymentDetails.styles';

import { usePaymentDetails } from '~/shared/hooks/use-payment-details/usePaymentDetails';

function PaymentDetails() {
  const { tabs } = usePaymentDetails();
  const [activeIndex, setActiveIndex] = useState(0);

  if (tabs.length === 0) return null;

  const activeTab = tabs[activeIndex] ?? tabs[0];

  return (
    <Box data-testid="PaymentDetails">
      <Box sx={styles.tabsScroller}>
        <ButtonGroup
          sx={styles.buttonGroup}
          activeButton={activeIndex}
          buttons={tabs.map((tab, index) => (
            <Button
              sx={styles.currencyBtn}
              value={tab.id}
              key={tab.id}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            >
              {tab.name}
            </Button>
          ))}
          data-testid="PaymentDetails-currencySwitcher"
        />
      </Box>

      <Box sx={styles.paymentDetailsContainer} data-testid="PaymentDetails-content">
        <PaymentDetailsContent content={activeTab.content} />
      </Box>
    </Box>
  );
}

export default PaymentDetails;
