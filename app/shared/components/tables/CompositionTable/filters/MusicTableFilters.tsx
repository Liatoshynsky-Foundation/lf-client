'use client';

import { Box, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';
import { FilterSelect } from '~/ds-components/selector/FilterSelect';

import { filterGridHelper } from './MusicTableFilters.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import { CategoryNameDTO, GenreNameDTO } from '~/domain/dto/table.dto';
import Delete from '~/public/icons/trash-2.svg';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';

interface MusicTableFiltersProps {
  labelGenre: string;
  labelCategory: string;
  genresOptions: GenreNameDTO[];
  categoriesOptions: CategoryNameDTO[];
  genreFilter: string[];
  categoryFilter: string[];
  yearLabel: string;
  yearFilter: [number, number];
  onGenresChange: (values: string[]) => void;
  onCategoriesChange: (values: string[]) => void;
  onYearChange: (value: [number, number]) => void;
  onYearChangeCommitted: (value: [number, number]) => void;
  onClearAllFilters?: () => void;
  isAnyFilterActive: boolean;
  minYear?: number;
  maxYear?: number;
}

export function MusicTableFilters({
  labelGenre = 'Genre',
  genresOptions,
  categoriesOptions = [],
  genreFilter,
  labelCategory = 'Category',
  categoryFilter = [],
  yearFilter,
  yearLabel = 'Year',
  onGenresChange,
  onCategoriesChange,
  onYearChange,
  onYearChangeCommitted,
  onClearAllFilters,
  isAnyFilterActive,
  minYear,
  maxYear
}: Readonly<MusicTableFiltersProps>) {
  const [hasCategorySelected, setHasCategorySelected] = useState<boolean>(categoryFilter.length > 0);
  const [hasGenreSelected, setHasGenreSelected] = useState<boolean>(genreFilter.length > 0);
  const [hasYearSelected, setHasYearSelected] = useState<boolean>(
    yearFilter[0] !== undefined && yearFilter[1] !== undefined
  );
  const isLess350 = useMediaQuery('(max-width:350px)');
  const isLess420 = useMediaQuery('(max-width:419px)');
  const isLess450 = useMediaQuery('(max-width:450px)');
  const isBetween420And550 = useMediaQuery('(min-width:420px) and (max-width:549px)');
  const isGreater550 = useMediaQuery('(min-width:550px)');
  const isGreater700 = useMediaQuery('(min-width:701px)');
  const isGreater500 = useMediaQuery('(min-width:501px)');

  useEffect(() => {
    setHasCategorySelected(categoryFilter.length > 0);
  }, [categoryFilter]);

  useEffect(() => {
    setHasGenreSelected(genreFilter.length > 0);
  }, [genreFilter]);

  useEffect(() => {
    setHasYearSelected(yearFilter[0] !== undefined && yearFilter[1] !== undefined);
  }, [yearFilter]);

  const screenSize = {
    isLess350,
    isLess420,
    isLess450,
    isGreater500,
    isGreater700,
    isBetween420And550,
    isGreater550
  };

  const layout = filterGridHelper(screenSize, { hasCategorySelected, hasGenreSelected, hasYearSelected });
  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gap: 2,
        gridTemplateColumns: layout.gridTemplateColumns,
        gridTemplateRows: layout.gridTemplateRows,
        alignContent: 'start',
        alignItems: 'start'
      }}
    >
      <Box sx={layout.containers.category}>
        <FilterSelect
          label={labelCategory}
          options={categoriesOptions.map((c) => ({ value: c.key, label: c.name }))}
          defaultValues={categoryFilter}
          variant="filled"
          maxSelections={10}
          onAdd={(val, lab, allSelected) => onCategoriesChange(allSelected)}
          onRemove={(val, lab, allSelected) => onCategoriesChange(allSelected)}
        />
      </Box>

      <Box sx={layout.containers.genre}>
        <FilterSelect
          label={labelGenre}
          options={genresOptions.map((g) => ({ value: g.key, label: g.name }))}
          defaultValues={genreFilter}
          variant="filled"
          maxSelections={10}
          onAdd={(val, lab, allSelected) => onGenresChange(allSelected)}
          onRemove={(val, lab, allSelected) => onGenresChange(allSelected)}
        />
      </Box>

      <Box sx={layout.containers.year}>
        <YearNumericFilter
          label={yearLabel ?? 'Year'}
          value={yearFilter}
          onChange={onYearChange}
          onChangeCommitted={onYearChangeCommitted}
          minYear={minYear}
          maxYear={maxYear}
        />
      </Box>

      <Box sx={{ ...layout.containers.clear }}>
        {onClearAllFilters && isAnyFilterActive && (
          <IconButton
            type={IconButtonVariant.outlined}
            variant={IconButtonColorVariant.Secondary}
            size="medium"
            onClick={onClearAllFilters}
            sx={{ border: 'none' }}
          >
            <Delete />
          </IconButton>
        )}
      </Box>
    </Box>
  );
}
