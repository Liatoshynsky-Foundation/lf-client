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
import debounce from 'lodash.debounce';
import { useTranslations } from 'next-intl';
import React, { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { SvgImage } from '../svg-image/SvgImage';
import { VirtualizedListbox } from './LazyListItem';
import { CustomBorderTextField, iconStyles, SearchStyles } from './SearchStyles';

interface SearchProps<T> {
  search: string;
  setSearch: (value: string) => void;
  options: T[];
}

function getIconStyle(isMobile: boolean, focused: boolean) {
  return {
    ...SearchStyles.icon,
    width: isMobile ? 270 : focused ? 280 : 40,
    borderRadius: isMobile ? '8px' : focused ? '10px' : '60px'
  };
}

export const Search = <T extends { title?: string | { en?: string; uk?: string } }>({
  search,
  setSearch,
  options
}: SearchProps<T>) => {
  const theme = useTheme();
  const t = useTranslations('search');

  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });

  const [focused, setFocused] = useState(false);
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState<T | null>(null);
  const [inputValue, setInputValue] = useState(search);

  const debouncedInput = useMemo(
    () =>
      debounce((v: string) => {
        setInputValue(v);
      }, 200),
    []
  );

  const handleInputChange = useCallback(
    (_: SyntheticEvent, v: string) => {
      if (!opened) setOpened(true);

      setInputValue(v);
      debouncedInput(v);
    },
    [opened, debouncedInput]
  );

  const handleSelect = useCallback(
    (_: SyntheticEvent, v: T | null, __: AutocompleteChangeReason, ___: AutocompleteChangeDetails<T> | undefined) => {
      setValue(v);

      const label = typeof v?.title === 'string' ? v.title : v?.title?.en || v?.title?.uk || '';

      setSearch(label);
      setOpened(false);
    },
    [setSearch]
  );

  const handleEnter = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        setSearch(inputValue);
        setOpened(false);
      }
    },
    [inputValue, setSearch]
  );

  const renderOption = useCallback(
    (props: React.HTMLAttributes<HTMLLIElement>, option: T) => (
      <li {...props}>
        <ListItem
          disableGutters
          sx={{
            padding: '8px 12px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block', // VERY important!
            width: '100%', // ensures full control,
            height: '64px'
          }}
        >
          <Typography variant="customMedium16">
            {typeof option.title === 'string' ? option.title : option.title?.en || option.title?.uk || ''}
          </Typography>
        </ListItem>
      </li>
    ),
    []
  );

  const getOptionLabel = (option: T) => {
    if (typeof option.title === 'string') return option.title;
    if (typeof option.title === 'object') return option.title.en || option.title.uk || '';
    return '';
  };

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
      popupIcon={null}
      clearIcon={false}
      clearOnBlur={false}
      disableListWrap
      open={!!opened}
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
          variant="outlined"
          size="small"
          sx={{ borderColor: `${mainHexPallete.black} !important` }}
          inputRef={inputRef}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setOpened(false);
            setFocused(false);
          }}
          slotProps={{
            input: {
              ...params.InputProps,
              style: getIconStyle(isMobile, focused),
              startAdornment: (
                <InputAdornment position="start">
                  <Box sx={iconStyles} onClick={() => inputRef.current?.focus()}>
                    <SvgImage src="/icons/search-static.svg" width={24} height={24} alt="search" />
                  </Box>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {(inputValue.trim().length > 0 || value !== null) && (
                    <Box
                      sx={iconStyles}
                      onClick={() => {
                        setValue(null);
                        setInputValue('');
                        setSearch('');
                        setOpened(false);
                      }}
                    >
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
