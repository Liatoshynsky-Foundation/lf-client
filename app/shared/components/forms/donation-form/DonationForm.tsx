'use client';
import { Box, FormControl, Input, MenuItem, Select, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import PaperComponent from '~/components/paper-component/PaperComponent';
import TurnstileWidget from '~/components/turnstileWidget/TurnstileWidget';
import Button from '~/ds-components/button/Button';
import { useDonation } from '~/hooks/use-donation/useDonation';

import { style } from './DonationForm.styles';
import { Currency } from '~/types/types/common.types';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

const currencies: Currency[] = ['UAH', 'USD', 'EUR', 'GBP'];
const proposedSum: Record<Currency, number[]> = {
  UAH: [200, 500, 700],
  USD: [10, 25, 50],
  EUR: [10, 20, 50],
  GBP: [10, 20, 40]
};

const MIN_DONATION_AMOUNT = 0;
const isValidDonationAmount = (value: number | ''): boolean => typeof value === 'number' && value > MIN_DONATION_AMOUNT;

function DonationForm() {
  const t = useTranslations('donationForm');
  const lang = useLocale();
  const { isMobile } = useBreakpoints();
  const [donationSum, setDonationSum] = useState<number | ''>('');
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const handleCurrencySwitch = (event: { target: { value: string } }) => {
    setCurrency(event.target.value as Currency);
    setDonationSum('');
    setHasError(false);
  };

  const onVerificationFailure = useCallback(() => {
    setShowCaptcha(true);
    setCaptchaToken(null);
  }, []);

  const { donate } = useDonation({
    lang,
    currency,
    onVerificationFailure
  });

  useEffect(() => {
    if (globalThis.window !== undefined && !globalThis.window.Wayforpay) {
      const script = document.createElement('script');
      script.src = 'https://secure.wayforpay.com/server/pay-widget.js';
      document.body.appendChild(script);
    }
  }, []);

  const handleDonateClick = (amount: number) => {
    const currentAmount = Number(amount);
    const isInvalid = !isValidDonationAmount(currentAmount);
    setHasError(isInvalid);
    if (isInvalid) {
      amountInputRef.current?.focus();
      return;
    }
    setSelectedAmount(currentAmount);
    if (!captchaToken) {
      setShowCaptcha(true);
    }
  };

  const handleCaptchaSuccess = (token: string) => {
    setCaptchaToken(token);
    setShowCaptcha(false);
  };

  useEffect(() => {
    const donateIfReady = async () => {
      try {
        if (!selectedAmount || !captchaToken) return;
        await donate({ amount: selectedAmount, captchaToken });
        setSelectedAmount(null);
        setCaptchaToken(null);
      } catch {
        setSelectedAmount(null);
        setShowCaptcha(false);
      }
    };
    donateIfReady();
  }, [selectedAmount, captchaToken, donate]);

  const suggestButtons = proposedSum[currency].map((item) => (
    <Button
      key={item}
      id={item.toString()}
      variant="outlined"
      size={isMobile ? 'small' : 'medium'}
      onClick={() => {
        setDonationSum(item);
        if (hasError) {
          setHasError(false);
        }
      }}
      data-testid={`DonationForm-suggestButton-${item}`}
    >
      <Typography variant="customSemiBold18">{item}</Typography>
      <Typography variant="customMedium16" sx={style.currencySuggestion}>
        {currency}
      </Typography>
    </Button>
  ));
  const currencyItems = currencies.map((c) => (
    <MenuItem key={c} value={c}>
      <Typography variant="body1">{c.toUpperCase()}</Typography>
    </MenuItem>
  ));

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' || +e.target.value < 0 ? '' : Number(e.target.value);
    setDonationSum(val);
    if (hasError) {
      setHasError(false);
    }
  };

  return (
    <PaperComponent sx={style.paper} childrenSx={style.paperChildren} square data-testid="DonationForm">
      <Box sx={style.headerTexts}>
        <Typography data-testid="DonationForm-title" variant="h4">
          {t('donationTitle')}
        </Typography>
        <Typography data-testid="DonationForm-description" variant="customSemiBold18">
          {t('donationDescription')}
        </Typography>
      </Box>
      <Box sx={style.formContent}>
        <Box sx={style.amountSection}>
          <Box sx={{ ...style.sumInputs, ...(hasError && style.errorBorder) }}>
            <Input
              disableUnderline
              type="number"
              inputRef={amountInputRef}
              inputProps={{ 'aria-invalid': hasError }}
              value={donationSum}
              onChange={handleInputChange}
              placeholder="0"
              sx={{
                ...style.moneyInput,
                ...(hasError && style.moneyInputError)
              }}
              data-testid="DonationForm-moneyInput"
            />
            <FormControl variant="standard" sx={style.currencyInput}>
              <Select
                open={openDropdown}
                onOpen={() => setOpenDropdown(true)}
                onClose={() => setOpenDropdown(false)}
                disableUnderline
                value={currency}
                onChange={handleCurrencySwitch}
                data-testid="DonationForm-currencySelect"
              >
                {currencyItems}
              </Select>
            </FormControl>
          </Box>
          <Box sx={style.addBtns} data-testid="DonationForm-suggestButtonsContainer">
            {suggestButtons}
          </Box>
        </Box>

        {showCaptcha && (
          <Box sx={style.turnstileWidget}>
            <TurnstileWidget language={lang} onSuccessAction={handleCaptchaSuccess} />
          </Box>
        )}
        <Button
          color="primary"
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
          fullWidth
          onClick={() => handleDonateClick(donationSum as number)}
          data-testid="DonationForm-donateButton"
        >
          <Typography variant="customSemiBold18">{t('donationButton')}</Typography>
        </Button>
      </Box>
    </PaperComponent>
  );
}
export default DonationForm;
