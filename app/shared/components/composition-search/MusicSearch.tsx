'use client';
import { Autocomplete, AutocompleteRenderInputParams, ListItem, styled, Typography } from '@mui/material';
import debounce from 'lodash.debounce';
import React, { SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';

import TextField from '../design-system/all-components/text-field/TextField';
import { mainHexPallete } from '../design-system/all-components/theme/colors';
import { SvgImage } from '../svg-image/SvgImage';

import { musicData } from '~/[lang]/artistry/CompositionTable/MusicTable.constant';
import { useSearch } from '~/context/SearchContext';
export interface OptionType {
  name: string;
}
export interface CompositionProps {
  onFilterChange: (value: string) => void;
}
const CustomBorderTextField = styled(TextField)(() => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: `1px solid ${mainHexPallete.black} !important`
    },
    '&:hover fieldset': {
      border: `1px solid ${mainHexPallete.black} !important`
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${mainHexPallete.black} !important`
    }
  }
}));
export const MusicSearch: React.FC<CompositionProps> = ({ onFilterChange }) => {
  const getOptionsAsync = (query: string): Promise<OptionType[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(options.filter((option: OptionType) => option.name.toLowerCase().includes(query.toLowerCase())));
      }, 1500);
    });
  };

  const [options, setOptions] = useState<OptionType[]>([]);
  const [value, setValue] = useState<OptionType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchQuery, setSearchQuery } = useSearch();
  //eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionsDelayed = useCallback(
    debounce((query: string, callback: (options: OptionType[]) => void) => {
      setOptions([]);
      getOptionsAsync(query).then(callback);
    }, 500),
    []
  );
  useEffect(() => {
    setIsLoading(true);

    getOptionsDelayed(searchQuery, (movieOptions: OptionType[]) => {
      setOptions(movieOptions);
      setIsLoading(false);
    });
  }, [searchQuery, getOptionsDelayed]);

  const onChange = (event: unknown, value: OptionType | null) => {
    setValue(value);
  };

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
    },
    [debouncedInputChange, onFilterChange]
  );

  const getOptionLabel = (option: OptionType): string => option.name;

  const renderInput = (params: AutocompleteRenderInputParams): React.ReactNode => {
    return (
      <div ref={params.InputProps.ref}>
        <CustomBorderTextField
          type="text"
          {...params}
          variant="outlined"
          startIcon={<SvgImage src={'/icons/search.svg'} alt={'bell'} width={24} height={24} />}
        />
      </div>
    );
  };

  const renderOption = (props: object, option: OptionType): React.ReactNode => {
    return (
      <ListItem {...props} disableGutters key={option.name}>
        <Typography variant="customMedium16">{option.name}</Typography>
      </ListItem>
    );
  };

  // const filterOptions = (options: OptionType[]): OptionType[] => options;

  return (
    <div>
      <Autocomplete
        options={musicData}
        value={value}
        onChange={onChange}
        onInputChange={handleInputChange}
        getOptionLabel={getOptionLabel}
        renderOption={renderOption}
        renderInput={renderInput}
        loading={isLoading}
        blurOnSelect={true}
      />
    </div>
  );
};
