'use client';

import {
  Autocomplete,
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteRenderInputParams,
  Box,
  InputAdornment,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { SyntheticEvent, useCallback, useEffect, useRef, useState } from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { SvgImage } from '../svg-image/SvgImage';
import { VirtualizedListbox } from './LazyListItem';
import { CustomBorderTextField, iconStyles, SearchStyles } from './SearchStyles';
import { TitleOption } from '~/types/types/composition.types';

import { normalizeSearch } from '~/lib/utils/normalizeSearch';

const getOptionLabel = <T extends TitleOption>(option: T | string): string => {
  if (typeof option === 'string') return option;

  const titleStr = typeof option.title === 'string' ? option.title : option.title?.en || option.title?.uk || '';

  if (option.opusContext) {
    const isSineOp = option.opusContext.numberKind?.toLowerCase() === 'sineop';
    const opusPrefix = isSineOp ? `sineop. ${option.opusContext.number}` : `op. ${option.opusContext.number}`;
    const extra = option.opusContext.additionalText ? ` ${option.opusContext.additionalText}` : '';
    const formattedOpus = `${opusPrefix}${extra}`;

    if (option.type === 'opus') {
      return `${formattedOpus} — ${titleStr}`;
    }
    if (option.type === 'composition') {
      return `${titleStr} (${formattedOpus})`;
    }
  }

  return titleStr;
};

interface SearchProps<T> {
  search: string;
  setSearch: (value: string) => void;
  options: T[];
}

function getIconStyle(isMobile: boolean, focused: boolean) {
  let width = 40;
  let borderRadius = '60px';

  if (isMobile) {
    width = 270;
    borderRadius = '8px';
  } else if (focused) {
    width = 280;
    borderRadius = '10px';
  }

  return {
    ...SearchStyles.icon,
    width,
    borderRadius
  };
}

export const Search = <T extends TitleOption>({ search, setSearch, options }: SearchProps<T>) => {
  const theme = useTheme();
  const t = useTranslations('search');

  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  const [focused, setFocused] = useState(false);
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState(search);

  const handleInputChange = useCallback(
    (_: SyntheticEvent, v: string) => {
      if (v.length > 200) return;
      if (!opened) setOpened(true);
      setInputValue(v);
    },
    [opened]
  );

  const handleClearSearch = () => {
    setValue(null);
    setInputValue('');
    setSearch('');
    setOpened(false);
  };

  const handleTriggerSearch = () => {
    inputRef.current?.focus();
    setSearch(normalizeSearch(inputValue));
    setOpened(false);
  };

  const handleSelect = useCallback(
    (_: SyntheticEvent, v: T | null, __: AutocompleteChangeReason, ___: AutocompleteChangeDetails<T> | undefined) => {
      setValue(v);
      const label = getOptionLabel(v ?? '');
      setInputValue(label);
      setSearch(normalizeSearch(label));
      setOpened(false);
    },
    [setSearch]
  );

  const handleEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setSearch(normalizeSearch(inputValue));
        setOpened(false);
      }
    },
    [inputValue, setSearch]
  );

  useEffect(() => {
    if (!focused) {
      setInputValue(search);
    }
  }, [search, focused]);

  const renderOption = useCallback((props: React.HTMLAttributes<HTMLLIElement> & { key?: React.Key }, option: T) => {
    const { key, ...rest } = props;
    return (
      <ListItem
        key={key}
        {...rest}
        disableGutters
        sx={{ height: 64, padding: 0, display: 'flex', alignItems: 'center', whiteSpace: 'normal' }}
      >
        <Typography
          variant="customMedium16"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: '1.2',
            wordBreak: 'break-word'
          }}
        >
          {getOptionLabel(option)}
        </Typography>
      </ListItem>
    );
  }, []);

  const filterOptions = useCallback((options: T[], { inputValue }: { inputValue: string }) => {
    const trimmedInput = inputValue.trim().toLowerCase();
    if (!trimmedInput) return options;

    const words = trimmedInput.split(/\s+/).filter(Boolean);

    return options
      .filter((option) => {
        const label = getOptionLabel(option).toLowerCase();
        return words.every((word) => label.includes(word));
      })
      .sort((a, b) => {
        const aLabel = getOptionLabel(a).toLowerCase();
        const bLabel = getOptionLabel(b).toLowerCase();

        if (aLabel === trimmedInput) return -1;
        if (bLabel === trimmedInput) return 1;

        if (aLabel.startsWith(trimmedInput) && !bLabel.startsWith(trimmedInput)) return -1;
        if (!aLabel.startsWith(trimmedInput) && bLabel.startsWith(trimmedInput)) return 1;

        const aIndex = aLabel.indexOf(trimmedInput);
        const bIndex = bLabel.indexOf(trimmedInput);

        if (aIndex !== bIndex) return aIndex - bIndex;

        return aLabel.localeCompare(bLabel, ['uk', 'en'], {
          sensitivity: 'base',
          numeric: true
        });
      });
  }, []);

  return (
    <Autocomplete<T, false, false, false>
      data-testid="music-search"
      options={options}
      value={value}
      onChange={handleSelect}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      filterOptions={filterOptions}
      popupIcon={null}
      clearIcon={false}
      clearOnBlur={false}
      disableListWrap
      open={opened}
      noOptionsText={<Typography>{t('notFound')}</Typography>}
      loadingText={<Typography>{t('loading')}</Typography>}
      slotProps={{
        listbox: {
          style: SearchStyles.listbox,
          component: VirtualizedListbox
        }
      }}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <CustomBorderTextField
          {...params}
          className={!isMobile && !focused ? 'search-collapsed' : undefined}
          variant="outlined"
          size="small"
          sx={{ borderColor: `${mainHexPallete.black} !important` }}
          inputRef={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setOpened(false);
            setFocused(false);
            if (inputValue !== search) {
              setSearch(inputValue);
            }
          }}
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              maxLength: 200,
              'aria-label': t('placeholder')
            },
            input: {
              ...params.InputProps,
              style: getIconStyle(isMobile, focused),
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={iconStyles} onClick={handleTriggerSearch}>
                    <SvgImage src="/icons/search-static.svg" width={24} height={24} alt="search" />
                  </Box>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {(inputValue.trim().length > 0 || value !== null) && (
                    <Box sx={iconStyles} onClick={handleClearSearch}>
                      <SvgImage src="/icons/close-icon.svg" width={24} height={24} alt="clear" />
                    </Box>
                  )}
                </InputAdornment>
              ),
              onKeyDown: handleEnter
            }
          }}
        />
      )}
    />
  );
};
