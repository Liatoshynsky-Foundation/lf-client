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
    width = '100%';
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

interface SearchProps<T> {
  setSearch: (value: string) => void;
  search: string;
  options: T[];
  setFilterParams: (params: Record<string, string | number | string[] | null>) => void;
}

export const Search = <T extends { title?: string | { en?: string; uk?: string } }>({
  search,
  setSearch,
  options,
  setFilterParams
}: SearchProps<T>) => {
  const [value, setValue] = useState<T | null>(null);
  const [focused, setFocused] = useState(false);
  const [opened, setOpened] = useState(false);
  const [inputValue, setInputValue] = useState(search);
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const DEBOUNCE_TIME_MS = 800;
  const t = useTranslations('search');

  const debouncedInputChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setFilterParams({ search: value });
      }, DEBOUNCE_TIME_MS),
    [setFilterParams, setSearch]
  );

  const handleInputChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      if (!opened) {
        setOpened(true);
      }
      setInputValue(value);
      setSearch(value);
      setFilterParams({ search: value });
      debouncedInputChange(value);
    },
    [debouncedInputChange, opened, setFilterParams, setSearch]
  );

  const handleIconClick = () => {
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setSearch('');
    setInputValue('');
    setValue(null);
    setOpened(false);
    setFilterParams({ search: '' });
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
          setFocused(false);
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

  const renderOption = useCallback(({ key, ...props }: object & { key: React.Key }, option: T): React.ReactNode => {
    return (
      <div {...props} key={key}>
        <ListItem disableGutters>
          <Typography variant="customMedium16">
            {typeof option.title === 'string' ? option.title : option.title?.en || option.title?.uk || ''}
          </Typography>
        </ListItem>
      </div>
    );
  }, []);

  const getOptionLabel = (option: T) => {
    if (typeof option.title === 'string') {
      return option.title;
    } else if (option.title && typeof option.title === 'object') {
      return option.title.en || option.title.uk || '';
    }
    return '';
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
      inputValue={inputValue}
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
