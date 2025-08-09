'use client';
import { Autocomplete, AutocompleteRenderInputParams, InputAdornment, List, ListItem, Typography } from '@mui/material';
import debounce from 'lodash.debounce';
import { useTranslations } from 'next-intl';
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { Svg } from '../colored-svg/ColoredSvg';
import { IconButton } from '../design-system/all-components/icon-button/IconButton';
import { SvgImage } from '../svg-image/SvgImage';
import { VirtualizedListbox } from './LazyListItem';
import { CustomBorderTextField, MusicSearchStyles } from './MusicSearchStyles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import { CompositionTitlesDTO } from '~/domain/dto/composition.dto';
import Search from '~/public/icons/search-icon.svg';
import { usePanel } from '~/shared/context/PanelContext';
interface MusicSearchProps {
  setSearch: (value: string) => void;
  search: string;
}

export const MusicSearch: React.FC<MusicSearchProps> = ({ search, setSearch }: MusicSearchProps) => {
  const [value, setValue] = useState<CompositionTitlesDTO | null>(null);
  const [options, setOptions] = useState<CompositionTitlesDTO[]>([]);
  const [focused, setFocused] = useState(false);
  const [opened, setOpened] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { isMobile, toggle, active } = usePanel();
  console.log(active);
  const DEBOUNCE_TIME_MS = 500;
  useEffect(() => {
    const fetchAllTitles = async () => {
      setLoading(true);
      const response = await fetch('/api/titles');
      const titles = await response.json();
      setOptions(titles);
      setLoading(false);
    };
    fetchAllTitles();
  }, [search, value]);
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
    toggle();
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
                <SvgImage src={'/icons/search.svg'} alt="search" width={24} height={24} onClick={handleIconClick} />
              </InputAdornment>
            ),
            style: {
              ...MusicSearchStyles.icon,
              width: focused ? 280 : 40,
              borderRadius: focused ? '10px' : '60px'
            },
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
    <>
      {isMobile ? (
        <IconButton
          type={active ? IconButtonVariant.filled : IconButtonVariant.outlined}
          variant={active ? IconButtonColorVariant.Secondary : IconButtonColorVariant.Primary}
          onClick={handleIconClick}
        >
          <Svg Component={Search} alt="search" width="28" height="28" color={active ? '#ffffff' : '#000000'} />
        </IconButton>
      ) : (
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
              style: MusicSearchStyles.listbox,
              component: VirtualizedListbox
            }
          }}
        />
      )}
    </>
  );
};
