'use client';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';

import TurnstileWidget from './TurnstileWidget';
import { WayforPayInvoice } from '~/types/types/wayForPay';

declare global {
  interface Window {
    Wayforpay: { new (): { run: (invoice: WayforPayInvoice) => void } };
  }
}

export default function DonateButtons() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

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
      const res = await fetch('/api/create-invoice', {
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

  const handleDonateClick = (amount: number) => {
    setSelectedAmount(amount);
    if (!captchaToken) {
      setShowCaptcha(true);
    }
  };

  const handleCaptchaSuccess = (token: string) => {
    setCaptchaToken(token);
    setShowCaptcha(false);
  };

  // Effect to handle donation when both amount and token are set
  useEffect(() => {
    const donateIfReady = async () => {
      if (!selectedAmount || !captchaToken) return;
      setIsLoading(true);
      try {
        const response = await fetch('/api/verify', {
          method: 'POST',
          body: JSON.stringify({ token: captchaToken })
        });
        if (!response.ok) {
          setShowCaptcha(true);
          setCaptchaToken(null);
          setIsLoading(false);
          return;
        }
        const data = await response.json();
        if (data.success) {
          await handleDonate(selectedAmount);
          setSelectedAmount(null);
        } else {
          setShowCaptcha(true);
          setCaptchaToken(null);
        }
      } catch {
        setShowCaptcha(true);
        setCaptchaToken(null);
      } finally {
        setIsLoading(false);
      }
    };
    donateIfReady();
  }, [selectedAmount, captchaToken]);

  return (
    <div>
      {showCaptcha && <TurnstileWidget language="uk" onSuccess={handleCaptchaSuccess} />}
      <Box display="flex" flexDirection="row" alignItems="center" gap={2} mt={4} mb={12}>
        {[100, 200, 300].map((amount) => (
          <Button key={amount} disabled={isLoading} onClick={() => handleDonateClick(amount)}>
            Donate ₴{amount}
          </Button>
        ))}
      </Box>
    </div>
  );
}
