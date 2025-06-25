'use client';

import { Box, Divider, styled } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import Button from '~/ds-components/button/Button';
import { DesignSystemSlider } from '~/ds-components/slider/Slider';
import TextField from '~/ds-components/text-field/TextField';
import { mainHexPallete, rgbaClearFilterButton } from '~/ds-components/theme/colors';

import { styles } from './YearFiltering.styles';

import TrashIcon from '~/public/icons/trash-2.svg';
import { getFilteringSchema } from '~/validators/filtering.schema';

interface YearFilteringProps {
  minYear: number;
  maxYear: number;
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
const sanitizeYearInput = (value: string) => value.replace(/[^\d]/g, '').slice(0, 4);

const YearFiltering: React.FC<YearFilteringProps> = ({ minYear, maxYear }) => {
  const [selectedYears, setSelectedYears] = useState<number[]>([minYear, maxYear]);
  const [inputYears, setInputYears] = useState<string[]>([String(minYear), String(maxYear)]);
  const [errors, setErrors] = useState<{ from?: string; to?: string }>({});
  const t = useTranslations('filtering');
  const tError = useTranslations('filtering.errors');

  const schema = useMemo(() => getFilteringSchema(minYear, maxYear, tError), [minYear, maxYear, tError]);

  const handleSliderChange = useCallback((event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    let [newMin, newMax] = newValue;

    if (activeThumb === 0) {
      newMin = Math.min(newMin, newMax - minDistance);
    } else {
      newMax = Math.max(newMax, newMin + minDistance);
    }

    setSelectedYears([newMin, newMax]);
    setInputYears([String(newMin), String(newMax)]);
  }, []);

  const handleInputChange = (type: 'from' | 'to') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeYearInput(e.target.value);
    const newInput = type === 'from' ? [sanitized, inputYears[1]] : [inputYears[0], sanitized];

    setInputYears(newInput);

    const parsed = schema.safeParse({ from: newInput[0], to: newInput[1] });

    if (parsed.success) {
      setSelectedYears([parsed.data.from, parsed.data.to]);
      setErrors({});
    } else {
      const fieldErrors = parsed.error.formErrors.fieldErrors;
      setErrors({
        from: fieldErrors.from?.[0],
        to: fieldErrors.to?.[0]
      });
    }
  };

  const handleClearFilter = () => {
    setInputYears([String(minYear), String(maxYear)]);
    setSelectedYears([minYear, maxYear]);
    setErrors({});
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapper}>
        <Box sx={styles.textfieldContainer}>
          <TextField
            onChange={handleInputChange('from')}
            value={inputYears[0]}
            variant="outlined"
            label={t('year.from')}
            sx={styles.textfield}
            error={Boolean(errors.from)}
            helperText={errors.from}
          />

          <TextField
            onChange={handleInputChange('to')}
            value={inputYears[1]}
            variant="outlined"
            label={t('year.to')}
            sx={styles.textfield}
            error={Boolean(errors.to)}
            helperText={errors.to}
          />
        </Box>
        <DesignSystemSlider
          size="small"
          min={minYear}
          max={maxYear}
          step={1}
          value={selectedYears}
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
                color={rgbaClearFilterButton.defaultTextColor}
                width="20px"
                height="22px"
              />
            }
            onClick={handleClearFilter}
            variant="text"
          >
            {t('year.clearFilter')}
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};

export default YearFiltering;
