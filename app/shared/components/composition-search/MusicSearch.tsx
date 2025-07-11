import { Autocomplete, AutocompleteRenderInputParams, InputAdornment, List, ListItem, Typography } from '@mui/material';
import debounce from 'lodash.debounce';
import React, { SyntheticEvent, useCallback, useMemo, useRef, useState } from 'react';

import { mainHexPallete } from '~/ds-components/theme/colors';
import { SvgImage } from '../svg-image/SvgImage';
import { CustomBorderTextField, MusicSearchStyles } from './MusicSearchStyles';
import { Music } from '~/types/types/enhancedTable';

import { flattenedMusicDataArrayType, flattenMusicDataArray } from '~/lib/utils/flattenMusicDataArray';
export interface MusicSearchProps {
  onFilterChange: (value: string) => void;
  data: Music[];
}

export const MusicSearch: React.FC<MusicSearchProps> = ({ onFilterChange, data }) => {
  const [value, setValue] = useState<flattenedMusicDataArrayType | null>(null);
  const flattenedMusicDataArray = flattenMusicDataArray(data);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const DEBOUNCE_TIME_MS = 400;
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
  const onChange = (event: unknown, value: flattenedMusicDataArrayType | null) => {
    setValue(value);
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

  const renderOption = (props: object, option: flattenedMusicDataArrayType): React.ReactNode => {
    return (
      <List {...props}>
        <ListItem disableGutters key={option.name}>
          <Typography variant="customMedium16">{option.name}</Typography>
        </ListItem>
      </List>
    );
  };
  const getOptionLabel = (option: flattenedMusicDataArrayType) => option.name || '';
  return (
    <div>
      <Autocomplete
        id="music-search"
        options={flattenedMusicDataArray}
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
        noOptionsText={<Typography variant="customMedium16">Не знайдено</Typography>}
      />
    </div>
  );
};
