'use client';
import { Box, FormControl, Input, MenuItem, Select, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import PaperComponent from '~/components/paper-component/PaperComponent';
import TurnstileWidget from '~/components/turnstileWidget/TurnstileWidget';
import Button from '~/ds-components/button/Button';
import ButtonGroup from '~/ds-components/button-group/ButtonGroup';
import { useDonation } from '~/hooks/use-donation/useDonation';

import { style } from './DonationForm.styles';
import { Currency, DonateType } from '~/types/types/common.types';

const currencies: Currency[] = ['UAH', 'USD', 'EUR', 'GBP'];
const proposedSum: Record<Currency, number[]> = {
  UAH: [200, 500, 700],
  USD: [10, 25, 50],
  EUR: [10, 20, 50],
  GBP: [10, 20, 40]
};

function DonationForm() {
  const t = useTranslations('donationForm');
  const lang = useLocale();
  const [selected, setSelected] = useState<DonateType>('donation');
  const [donationSum, setDonationSum] = useState<number | ''>('');
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [touched, setTouched] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleCurrencySwitch = (event: { target: { value: string } }) => {
    setCurrency(event.target.value as Currency);
    setDonationSum('');
    setHasError(false);
    setTouched(false);
  };

  const Buttons = [
    <Button key="donation" onClick={() => setSelected('donation')}>
      <Typography variant="customSemiBold18">{t('donationSwitch')}</Typography>
    </Button>,
    <Button key="subscription" onClick={() => setSelected('subscription')}>
      <Typography variant="customSemiBold18">{t('subscribeSwitch')}</Typography>
    </Button>
  ];

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
    setTouched(true);
    const currentAmount = Number(amount);
    const isInvalid = currentAmount <= 0;
    setHasError(isInvalid);
    if (isInvalid) {
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
      onClick={() => {
        setDonationSum(item);
        if (touched) setHasError(donationSum === 0);
      }}
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
    if (touched) {
      setHasError(val === '' || val === 0);
    }
  };

  return (
    <PaperComponent sx={style.paper} childrenSx={style.paperChildren} square>
      <Typography variant="h4">
        {selected === 'donation' && t('donationTitle')}
        {selected === 'subscription' && t('subscribeTitle')}
      </Typography>
      <ButtonGroup defaultActiveButton={0} buttons={Buttons} palette="tertiary" sx={style.btnGroup} />
      <Box sx={{ ...style.sumInputs, ...(hasError && style.errorBorder) }}>
        <Input
          disableUnderline
          type="number"
          inputProps={{ 'aria-invalid': hasError }}
          value={donationSum}
          onChange={handleInputChange}
          sx={{ ...style.moneyInput, ...(hasError && style.moneyInputError) }}
        />
        <FormControl variant="standard" sx={style.currencyInput}>
          <Select
            open={openDropdown}
            onOpen={() => setOpenDropdown(true)}
            onClose={() => setOpenDropdown(false)}
            disableUnderline
            value={currency}
            onChange={handleCurrencySwitch}
          >
            {currencyItems}
          </Select>
        </FormControl>
      </Box>
      <Box sx={style.addBtns}>{suggestButtons}</Box>

      {showCaptcha && (
        <Box sx={style.turnstileWidget}>
          <TurnstileWidget language={lang} onSuccessAction={handleCaptchaSuccess} />
        </Box>
      )}
      <Button color="primary" variant="contained" fullWidth onClick={() => handleDonateClick(donationSum as number)}>
        <Typography variant="customSemiBold18">
          {selected === 'donation' ? t('donationButton') : t('subscribeButton')}
        </Typography>
      </Button>
    </PaperComponent>
  );
}
export default DonationForm;
