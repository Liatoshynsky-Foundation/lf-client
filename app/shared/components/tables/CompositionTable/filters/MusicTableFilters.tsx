'use client';

import { Box } from '@mui/material';
import React from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';
import { FilterSelect } from '~/ds-components/selector/FilterSelect';

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
  const categoryOrder = categoryFilter.length > 0 ? 1 : 2;
  const genreOrder = genreFilter.length > 0 ? 1 : 2;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'flex-start'
      }}
    >
      <Box sx={{ order: categoryOrder }}>
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

      <Box sx={{ order: genreOrder }}>
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

      <Box sx={{ order: 3 }}>
        <YearNumericFilter
          label={yearLabel ?? 'Year'}
          value={yearFilter}
          onChange={onYearChange}
          onChangeCommitted={onYearChangeCommitted}
          minYear={minYear}
          maxYear={maxYear}
        />
      </Box>

      <Box sx={{ order: 4 }}>
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
