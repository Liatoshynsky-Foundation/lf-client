import { Autocomplete, AutocompleteRenderInputParams, InputAdornment, List, ListItem, Typography } from '@mui/material';
import debounce from 'lodash.debounce';
import { useTranslations } from 'next-intl';
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';

import { SvgImage } from '../svg-image/SvgImage';
import { VirtualizedListbox } from './LazyListItem';
import { CustomBorderTextField, MusicSearchStyles } from './MusicSearchStyles';

import { CompositionTitlesDTO } from '~/domain/dto/composition.dto';
interface MusicSearchProps {
  onFilterChange: (value: string) => void;
}

export const MusicSearch: React.FC<MusicSearchProps> = ({ onFilterChange }) => {
  const [value, setValue] = useState<CompositionTitlesDTO | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [options, setOptions] = useState<CompositionTitlesDTO[]>([]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
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
  }, [searchQuery]);
  const t = useTranslations('search');
  const debouncedInputChange = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
      }, DEBOUNCE_TIME_MS),
    [setSearchQuery]
  );

  const handleInputChange = useCallback(
    (event: SyntheticEvent, value: string) => {
      debouncedInputChange(value);
      onFilterChange(value);
      setSearchQuery(value);
    },
    [debouncedInputChange, onFilterChange]
  );
  const handleIconClick = () => {
    inputRef.current?.focus();
  };
  const handleClear = () => {
    setSearchQuery('');
  };
  const onChange = (event: unknown, value: CompositionTitlesDTO | null) => {
    setValue(value);
  };
  const renderInput = (params: AutocompleteRenderInputParams): React.ReactNode => {
    return (
      <CustomBorderTextField
        {...params}
        data-testid="music-search"
        variant="outlined"
        size="small"
        sx={{ borderColor: `${mainHexPallete.black} !important` }}
        inputRef={inputRef}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
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
  function renderOptionFn(props: object, option: CompositionTitlesDTO): React.ReactNode {
    return (
      <List {...props}>
        <ListItem disableGutters key={option._id}>
          <Typography variant="customMedium16">{option.title}</Typography>
        </ListItem>
      </List>
    );
  }

  const renderOption = useMemo(() => renderOptionFn, []);
  const getOptionLabel = (option: CompositionTitlesDTO) => option.title || '';
  return (
    <Autocomplete
      options={options}
      loading={loading}
      value={value}
      onChange={onChange}
      inputValue={searchQuery}
      onInputChange={handleInputChange}
      renderInput={renderInput}
      renderOption={renderOption}
      getOptionLabel={getOptionLabel}
      clearOnBlur={false}
      popupIcon={null}
      clearIcon={false}
      noOptionsText={<Typography variant="customMedium16">{t('notFound')}</Typography>}
      disableListWrap={true}
      slotProps={{
        listbox: {
          style: MusicSearchStyles.list,
          component: VirtualizedListbox as unknown as React.ComponentType<React.HTMLAttributes<HTMLElement>>
        }
      }}
    />
  );
};
