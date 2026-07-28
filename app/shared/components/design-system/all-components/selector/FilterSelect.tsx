'use client';
import { Box, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import FilterSelectItem from '~/ds-components/selector/FilterSelectItem/FilterSelectItem';

import ClearFilterButton from '../clear-filter-button/ClearFilterButton';
import { DropdownFilterPopper, DropdownFilterPopperHandle } from '../dropdown-filter-popper/DropdownFilterPopper';
import { styles } from './FilterSelect.styles';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  label: string;
  options: FilterOption[];
  defaultValues?: string[];
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  maxSelections?: number;
  onAdd?: (value: string, label: string, allSelected: string[]) => void;
  onRemove?: (value: string, label: string, allSelected: string[]) => void;
}

export const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  options,
  defaultValues,
  variant = 'filled',
  disabled = false,
  maxSelections,
  onAdd,
  onRemove
}) => {
  const t = useTranslations('filtering');
  const [selectedValues, setSelectedValues] = useState<string[]>(() => defaultValues ?? []);
  const listRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<DropdownFilterPopperHandle>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValues(defaultValues ?? []);
  }, [defaultValues]);

  const handleOptionClick = (option: FilterOption) => {
    const isSelected = selectedValues.includes(option.value);
    const newValues = isSelected
      ? selectedValues.filter((val) => val !== option.value)
      : [...selectedValues, option.value];
    if (isSelected) {
      onRemove?.(option.value, option.label, newValues);
    } else {
      onAdd?.(option.value, option.label, newValues);
    }
    setSelectedValues(newValues);
  };

  const handleClear = () => {
    setSelectedValues([]);
    onRemove?.('', '', []);
    popperRef.current?.focusTrigger();
  };

  const isMaxReached = maxSelections ? selectedValues.length >= maxSelections : false;

  return (
    <DropdownFilterPopper
      popperRef={popperRef}
      label={label}
      variant={variant}
      disabled={disabled}
      chipCount={selectedValues.length}
      onClearChip={handleClear}
      autoFocusRef={firstItemRef}
    >
      {() => (
        <Box sx={styles.container}>
          <Box
            ref={listRef}
            role="listbox"
            aria-multiselectable="true"
            aria-label={label}
            tabIndex={-1}
            sx={styles.listBox}
          >
            <Box sx={styles.scrollContainer}>
              {options.map((option, index) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <FilterSelectItem
                    key={option.value}
                    ref={index === 0 ? firstItemRef : undefined}
                    label={option.label}
                    selected={isSelected}
                    disabled={!isSelected && isMaxReached}
                    onClick={() => handleOptionClick(option)}
                  />
                );
              })}
            </Box>
          </Box>
          <Box>
            <Divider sx={styles.divider} />
            <ClearFilterButton onClick={handleClear}>{t('clear')}</ClearFilterButton>
          </Box>
        </Box>
      )}
    </DropdownFilterPopper>
  );
};
