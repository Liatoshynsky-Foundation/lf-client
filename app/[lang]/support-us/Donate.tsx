'use client';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import { WayforPayInvoice } from '~/types/types/wayForPay';

declare global {
  interface Window {
    Wayforpay: { new (): { run: (invoice: WayforPayInvoice) => void } };
  }
}

export default function DonateButtons() {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.Wayforpay) {
      const script = document.createElement('script');
      script.src = 'https://secure.wayforpay.com/server/pay-widget.js';
      document.body.appendChild(script);
    }
  }, []);

  const handleDonate = async (amount: number) => {
    setIsLoading(true);
    try {
      const res = await fetch('/create-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount
        })
      });
      const invoice = await res.json();

      if (res.ok) {
        new window.Wayforpay().run(invoice as WayforPayInvoice);
      } else {
        alert(invoice.error || 'Failed to create invoice.');
      }
    } catch (error) {
      console.error('Error during donation process.', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Box display="flex" flexDirection="row" alignItems="center" gap={2} mt={4} mb={12}>
        {[100, 200, 300].map((amount) => (
          <Button key={amount} disabled={isLoading} onClick={() => handleDonate(amount)}>
            Donate ₴{amount}
          </Button>
        ))}
      </Box>
    </div>
  );
}
