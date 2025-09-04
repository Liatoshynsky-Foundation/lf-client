'use client';

import { Box, Divider, styled } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import Button from '~/ds-components/button/Button';
import { DesignSystemSlider } from '~/ds-components/slider/Slider';
import TextField from '~/ds-components/text-field/TextField';
import { mainHexPallete, rgbaClearFilterButton } from '~/ds-components/theme/colors';

import { styles } from './NumericFiltering.styles';

import TrashIcon from '~/public/icons/trash-2.svg';
import { getFilteringSchema } from '~/validators/filtering.schema';

interface NumericFilteringProps {
  value: [number, number];
  onChange: (numbers: [number, number]) => void;
  minNumber?: number;
  maxNumber?: number;
}

const CustomButton = styled(Button)(() => ({
  lineHeight: '140%',
  color: rgbaClearFilterButton.defaultTextColor,
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  borderRadius: '8px',

  '&:hover': {
    backgroundColor: mainHexPallete.red[50],
    color: rgbaClearFilterButton.defaultTextColor
  },
  '&:focus-visible': {
    color: mainHexPallete.red[700]
  },
  '&:active': {
    color: mainHexPallete.red[700]
  },

  '& svg': {
    color: rgbaClearFilterButton.defaultTextColor
  },
  '&:hover svg': {
    color: rgbaClearFilterButton.defaultTextColor
  },
  '&:focus-visible svg': {
    color: mainHexPallete.red[700]
  },
  '&:active svg': {
    color: mainHexPallete.red[700]
  }
}));

const minDistance = 1;

const NumericFiltering: React.FC<NumericFilteringProps> = ({
  value,
  onChange,
  minNumber = 1900,
  maxNumber = new Date().getFullYear()
}) => {
  const [inputNumbers, setInputNumbers] = useState<string[]>([String(value[0]), String(value[1])]);
  const [errors, setErrors] = useState<{ from?: string; to?: string }>({});

  const t = useTranslations('filtering');
  const tError = useTranslations('filtering.errors');

  const schema = useMemo(() => getFilteringSchema(minNumber, maxNumber, tError), [minNumber, maxNumber, tError]);

  useEffect(() => {
    setInputNumbers([String(value[0]), String(value[1])]);
    setErrors({});
  }, [value]);

  const handleSliderChange = useCallback(
    (event: Event, newValue: number | number[], activeThumb: number) => {
      if (!Array.isArray(newValue)) return;

      let [newMin, newMax] = newValue;

      if (activeThumb === 0) {
        newMin = Math.min(newMin, newMax - minDistance);
      } else {
        newMax = Math.max(newMax, newMin + minDistance);
      }

      setInputNumbers([String(newMin), String(newMax)]);
      setErrors({});
      onChange([newMin, newMax]);
    },
    [onChange]
  );

  const handleInputChange = (type: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    const updatedInputs = type === 'from' ? [newNumber, inputNumbers[1]] : [inputNumbers[0], newNumber];

    setInputNumbers(updatedInputs);

    const parsed = schema.safeParse({ from: updatedInputs[0], to: updatedInputs[1] });

    if (parsed.success) {
      setErrors({});
      onChange([parsed.data.from, parsed.data.to]);
    } else {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      setErrors({
        from: fieldErrors.from?.[0],
        to: fieldErrors.to?.[0]
      });
    }
  };

  const handleClearFilter = () => {
    setInputNumbers([String(minNumber), String(maxNumber)]);
    setErrors({});
    onChange([minNumber, maxNumber]);
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.textfieldContainer}>
          <TextField
            onChange={handleInputChange('from')}
            value={inputNumbers[0]}
            variant="outlined"
            label={t('numeric.from')}
            sx={styles.textfield}
            error={Boolean(errors.from)}
            helperText={errors.from}
          />

          <TextField
            onChange={handleInputChange('to')}
            value={inputNumbers[1]}
            variant="outlined"
            label={t('numeric.to')}
            sx={styles.textfield}
            error={Boolean(errors.to)}
            helperText={errors.to}
          />
        </Box>
        <DesignSystemSlider
          size="small"
          min={minNumber}
          max={maxNumber}
          step={1}
          value={value}
          onChange={handleSliderChange}
        />
      </Box>
      <Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.footer}>
          <CustomButton
            startIcon={
              <Svg
                Component={TrashIcon}
                alt="trash"
                stroke={rgbaClearFilterButton.defaultTextColor}
                width="20px"
                height="22px"
              />
            }
            onClick={handleClearFilter}
            variant="text"
          >
            {t('numeric.clearFilter')}
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NumericFiltering;
