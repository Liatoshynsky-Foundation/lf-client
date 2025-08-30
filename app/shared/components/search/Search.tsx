'use client';

import {
  Autocomplete,
  AutocompleteRenderInputParams,
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
import { CustomBorderTextField, SearchStyles } from './SearchStyles';

const getIconStyle = (isMobile: boolean, focused: boolean) => {
  let width;
  let borderRadius;

  if (isMobile) {
    width = 230;
    borderRadius = '8px';
  } else if (focused) {
    width = 280;
    borderRadius = '10px';
  } else {
    width = 40;
    borderRadius = '60px';
  }

  return {
    ...SearchStyles.icon,
    width,
    borderRadius
  };
};

const getOptionLabel = <T extends { title?: string | { en?: string; uk?: string } }>(option: T): string => {
  if (typeof option.title === 'string') return option.title;
  return option.title?.en || option.title?.uk || '';
};

const renderOption = <T extends { title?: string | { en?: string; uk?: string } }>(
  props: React.HTMLAttributes<HTMLLIElement>,
  option: T
): React.ReactNode => {
  return (
    <VirtualizedListbox>
      {[
        <ListItem {...props} disableGutters key="list-item">
          <Typography variant="customMedium16">{getOptionLabel(option)}</Typography>
        </ListItem>
      ]}
    </VirtualizedListbox>
  );
};

interface SearchProps<T> {
  setSearch: (value: string) => void;
  search: string;
  options: T[];
}

export const Search = <T extends { title?: string | { en?: string; uk?: string } }>({
  search,
  setSearch,
  options
}: SearchProps<T>) => {
  const [value, setValue] = useState<T | null>(null);
  const [focused, setFocused] = useState(false);
  const [opened, setOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const DEBOUNCE_TIME_MS = 500;
  const t = useTranslations('search');

  const debouncedInputChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, DEBOUNCE_TIME_MS),
    [setSearch]
  );

  const handleInputChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      if (!opened) {
        setOpened(true);
      }
      debouncedInputChange(value);
      setSearch(value);
    },
    [debouncedInputChange, setSearch, opened]
  );

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setSearch('');
    setFocused(false);
    setOpened(false);
  };

  const renderInput = (params: AutocompleteRenderInputParams): React.ReactNode => {
    return (
      <CustomBorderTextField
        {...params}
        variant="outlined"
        size="small"
        sx={{ borderColor: `${mainHexPallete.black} !important` }}
        inputRef={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setOpened(false);
        }}
        slotProps={{
          input: {
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start" sx={{ cursor: 'pointer' }}>
                <SvgImage
                  src={'/icons/search-static.svg'}
                  alt="search"
                  width={24}
                  height={24}
                  onClick={handleIconClick}
                />
              </InputAdornment>
            ),
            style: getIconStyle(isMobile, focused),
            endAdornment: (
              <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                <SvgImage src={'/icons/close-icon.svg'} alt="close" width={24} height={24} onClick={handleClear} />
              </InputAdornment>
            )
          }
        }}
      />
    );
  };

  return (
    <Autocomplete<T, false, false, false>
      data-testid="music-search"
      options={options}
      value={value}
      onChange={(event, value) => {
        setValue(value);
        setSearch(value ? getOptionLabel(value) : '');
      }}
      inputValue={search}
      onInputChange={handleInputChange}
      renderInput={renderInput}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      clearOnBlur={false}
      popupIcon={null}
      clearIcon={false}
      loadingText={<Typography variant="customMedium16">{t('loading')}</Typography>}
      noOptionsText={<Typography variant="customMedium16">{t('notFound')}</Typography>}
      open={!!opened}
      disableListWrap={true}
      slotProps={{
        listbox: {
          style: SearchStyles.listbox,
          component: VirtualizedListbox
        }
      }}
    />
  );
};
