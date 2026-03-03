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
import React, { SyntheticEvent, useCallback, useRef, useState } from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { SvgImage } from '../svg-image/SvgImage';
import { VirtualizedListbox } from './LazyListItem';
import { CustomBorderTextField, iconStyles, SearchStyles } from './SearchStyles';
import { TitleOption } from '~/types/types/composition.types';

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

  const handleSelect = useCallback(
    (_: SyntheticEvent, v: T | null, __: AutocompleteChangeReason, ___: AutocompleteChangeDetails<T> | undefined) => {
      setValue(v);

      const label = typeof v?.title === 'string' ? v.title : v?.title?.en || v?.title?.uk || '';

      setInputValue(label);
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

  const renderOption = useCallback((props: React.HTMLAttributes<HTMLLIElement> & { key?: React.Key }, option: T) => {
    const { key, ...rest } = props;
    return (
      <ListItem
        key={key}
        {...rest}
        disableGutters
        sx={{
          height: 64,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'normal'
        }}
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
          {typeof option.title === 'string' ? option.title : option.title?.en || option.title?.uk || ''}
        </Typography>
      </ListItem>
    );
  }, []);

  const getOptionLabel = (option: T | string) => {
    if (typeof option === 'string') return option;

    const titleStr = typeof option.title === 'string' ? option.title : option.title?.en || option.title?.uk || '';

    if (option.kind === 'opus' && option.opusNumber) {
      return `Op. ${option.opusNumber} — ${titleStr}`;
    }

    return titleStr;
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
          className={!isMobile && !focused ? 'search-collapsed' : undefined}
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
            htmlInput: {
              ...params.inputProps,
              maxLength: 200
            },
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
