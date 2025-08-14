'use client';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  InputAdornment,
  List,
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

import { CompositionTitlesDTO } from '~/domain/dto/composition.dto';
interface SearchProps {
  setSearch: (value: string) => void;
  search: string;
  options: CompositionTitlesDTO[];
  loading?: boolean;
}
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

export const Search: React.FC<SearchProps> = ({ search, setSearch, options, loading }: SearchProps) => {
  const [value, setValue] = useState<CompositionTitlesDTO | null>(null);
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
  };
  const onChange = (event: unknown, value: CompositionTitlesDTO | null) => {
    setValue(value);
    const params = new URLSearchParams(window.location.search);
    setSearch(value?.title as string);
    params.set('search', value?.title as string);
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
  function renderOptionFn(
    { key, ...props }: object & { key: React.Key },
    option: CompositionTitlesDTO
  ): React.ReactNode {
    return (
      <List {...props} key={key}>
        <ListItem disableGutters>
          <Typography variant="customMedium16">{option.title}</Typography>
        </ListItem>
      </List>
    );
  }

  const renderOption = useMemo(() => renderOptionFn, []);
  const getOptionLabel = (option: CompositionTitlesDTO) => option.title || '';
  return (
    <Autocomplete
      data-testid="music-search"
      options={options}
      loading={loading}
      value={value}
      onChange={onChange}
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
