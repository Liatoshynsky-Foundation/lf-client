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
  const Buttons = [
    <Button key="donation" onClick={() => setSelected('donation')}>
      <Typography variant="customSemiBold18">{t('donationSwitch')}</Typography>
    </Button>,
    <Button key="subscription" onClick={() => setSelected('subscription')}>
      <Typography variant="customSemiBold18">{t('subscribeSwitch')}</Typography>
    </Button>
  ];
  const CustomIcon = ({ open }: { open: boolean }) => (
    <img
      src={open ? '/icons/chevron-up.svg' : '/icons/chevron-down.svg'}
      alt="dropdown"
      style={{ width: 16, height: 16 }}
    />
  );
  const [donationSum, setDonationSum] = useState<number | ''>(0);
  const [currency, setCurrency] = useState<Currency>('UAH');
  const [openDropdown, setDropdown] = useState(false);
  const handleCurrencySwitch = (event: { target: { value: string } }) => {
    setCurrency(event.target.value as Currency);
    setDonationSum(0);
  };
  const suggestButtons = proposedSum[currency].map((item) => (
    <Button
      key={item}
      id={item.toString()}
      variant="outlined"
      onClick={() => {
        setDonationSum((a) => +a + item);
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
  return (
    <PaperComponent sx={style.paper} childrenSx={style.paperChildren} square>
      <Typography variant="h4">
        {selected === 'donation' && t('donationTitle')}
        {selected === 'subscription' && t('subscribeTitle')}
      </Typography>
      <ButtonGroup defaultActiveButton={0} buttons={Buttons} palette="tertiary" sx={style.btnGroup}></ButtonGroup>
      <Box sx={style.sumInputs}>
        <Input
          disableUnderline
          type="number"
          value={donationSum}
          onChange={(e) => {
            setDonationSum(e.target.value === '' || +e.target.value < 0 ? '' : Number(e.target.value));
          }}
          sx={style.moneyInput}
        />
        <FormControl variant="standard" sx={style.currencyInput}>
          <Select
            open={openDropdown}
            onOpen={() => setDropdown(true)}
            onClose={() => setDropdown(false)}
            disableUnderline
            value={currency}
            onChange={handleCurrencySwitch}
            IconComponent={() => <CustomIcon open={openDropdown} />}
          >
            {currencyItems}
          </Select>
        </FormControl>
      </Box>
      <Box sx={style.addBtns}>{suggestButtons}</Box>
      {selected === 'donation' && (
        <Button color="primary" variant="contained" fullWidth disabled={donationSum == 0}>
          <Typography variant="customSemiBold18">{t('donationButton')}</Typography>
        </Button>
      )}
      {selected === 'subscription' && (
        <Button color="primary" variant="contained" fullWidth disabled={donationSum == 0}>
          <Typography variant="customSemiBold18">{t('subscribeButton')}</Typography>
        </Button>
      )}
    </PaperComponent>
  );
}
export default DonationForm;
