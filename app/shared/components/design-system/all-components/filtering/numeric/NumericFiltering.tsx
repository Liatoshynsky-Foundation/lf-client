'use client';

import { Box, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ClearFilterButton from '~/ds-components/clear-filter-button/ClearFilterButton';
import { DesignSystemSlider } from '~/ds-components/slider/Slider';
import TextField from '~/ds-components/text-field/TextField';

import { styles } from './NumericFiltering.styles';

import { getFilteringSchema } from '~/validators/filtering.schema';

interface NumericFilteringProps {
  value: [number, number];
  onChange: (numbers: [number, number]) => void;
  onChangeCommitted: (numbers: [number, number]) => void;
  minNumber?: number;
  maxNumber?: number;
}

const minDistance = 1;

const NumericFiltering: React.FC<NumericFilteringProps> = ({
  value,
  onChange,
  minNumber = 1900,
  maxNumber = new Date().getFullYear(),
  onChangeCommitted
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

  const handleSliderChange = useCallback((event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) return;

    let [newMin, newMax] = newValue;

    if (activeThumb === 0) {
      newMin = Math.min(newMin, newMax - minDistance);
    } else {
      newMax = Math.max(newMax, newMin + minDistance);
    }

    setInputNumbers([String(newMin), String(newMax)]);
    setErrors({});
  }, []);

  const handleSliderChangeCommitted = useCallback(
    (event: Event | React.SyntheticEvent, newValue: number | number[]) => {
      if (!Array.isArray(newValue)) return;
      const [newMin, newMax] = newValue;
      onChangeCommitted([newMin, newMax]);
    },
    [onChangeCommitted]
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
    onChangeCommitted([minNumber, maxNumber]);
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
          value={[Number(inputNumbers[0]), Number(inputNumbers[1])]}
          onChange={handleSliderChange}
          onChangeCommitted={handleSliderChangeCommitted}
        />
      </Box>
      <Box>
        <Divider sx={styles.divider} />
        <Box sx={styles.footer}>
          <ClearFilterButton onClick={handleClearFilter}>{t('clear')}</ClearFilterButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NumericFiltering;
