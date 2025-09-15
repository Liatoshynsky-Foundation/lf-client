'use client';
import { Box, FormControl, Input, MenuItem, Select, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import Button from '../../design-system/all-components/button/Button';
import ButtonGroup from '../../design-system/all-components/button-group/ButtonGroup';
import PaperComponent from '../../paper-component/PaperComponent';
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

  const [selected, setSelected] = useState<DonateType>('donation');
  const [donationSum, setDonationSum] = useState<number | ''>('');
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [touched, setTouched] = useState(false);

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

  const suggestButtons = proposedSum[currency].map((item) => (
    <Button
      key={item}
      id={item.toString()}
      variant="outlined"
      onClick={() => {
        const newSum = (donationSum || 0) + item;
        setDonationSum(newSum);
        if (touched) setHasError(newSum === 0);
      }}
    >
      <Typography variant="customSemiBold18">+{item}</Typography>
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

  const handleSubmit = () => {
    setTouched(true);
    setHasError(donationSum === 0 || donationSum === '');
  };

  return (
    <PaperComponent sx={style.paper} childrenSx={style.paperChildren} square>
      <Typography variant="h4">
        {selected === 'donation' && t('donationTitle')}
        {selected === 'subscription' && t('subscribeTitle')}
      </Typography>
      <ButtonGroup defaultActiveButton={0} buttons={Buttons} palette="tertiary" sx={style.btnGroup} />
      <Box sx={{ ...style.sumInputs, ...(hasError ? style.errorBorder : {}) }}>
        <Input
          disableUnderline
          type="number"
          inputProps={{ 'aria-invalid': hasError }}
          value={donationSum}
          onChange={(e) => {
            const val = e.target.value === '' || +e.target.value < 0 ? '' : Number(e.target.value);
            setDonationSum(val);
            if (touched) {
              setHasError(val === '' || val === 0);
            }
          }}
          sx={{ ...style.moneyInput, ...(hasError ? style.moneyInputError : {}) }}
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
      <Button color="primary" variant="contained" fullWidth onClick={handleSubmit}>
        <Typography variant="customSemiBold18">
          {selected === 'donation' ? t('donationButton') : t('subscribeButton')}
        </Typography>
      </Button>
    </PaperComponent>
  );
}
export default DonationForm;
