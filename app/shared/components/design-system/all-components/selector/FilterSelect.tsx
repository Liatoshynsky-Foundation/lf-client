'use client';
import { Box, Divider } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Chip } from '~/ds-components/chip/Chip';
import FilterSelectItem from '~/ds-components/selector/FilterSelectItem/FilterSelectItem';

import ClearFilterButton from '../clear-filter-button/ClearFilterButton';
import { DropdownFilterPopper, DropdownFilterPopperHandle } from '../dropdown-filter-popper/DropdownFilterPopper';

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
      ref={popperRef}
      label={label}
      variant={variant}
      disabled={disabled}
      role="dialog"
      chip={
        selectedValues.length > 0 && (
          <Chip
            label={`${selectedValues.length} ${t('selected')}`}
            disabled={disabled}
            onDelete={handleClear}
            size="small"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation();
                handleClear();
              }
            }}
          />
        )
      }
    >
      {() => (
        <>
          <Box
            ref={listRef}
            role="listbox"
            aria-multiselectable="true"
            aria-label={label}
            tabIndex={-1}
            sx={{ padding: '0 8px' }}
          >
            <Box sx={{ maxHeight: 220, overflowY: 'auto' }}>
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <FilterSelectItem
                    key={option.value}
                    label={option.label}
                    selected={isSelected}
                    disabled={!isSelected && isMaxReached}
                    onClick={() => handleOptionClick(option)}
                  />
                );
              })}
            </Box>
          </Box>
          <Divider sx={{ my: 1 }} />
          <ClearFilterButton onClick={handleClear}>{t('clear')}</ClearFilterButton>
        </>
      )}
    </DropdownFilterPopper>
  );
};
