'use client';

import { Box } from '@mui/material';
import React from 'react';

import { FilterSelect } from '~/ds-components/selector/FilterSelect';

import { GenreNameDTO } from '~/domain/dto/table.dto';
import { FilterPanel } from '~/shared/components/filters/FilterPanel';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';

interface FilterOption {
  value: string;
  label: string;
}

interface MusicTableFiltersProps {
  labelGenre?: string;
  labelCategory?: string;
  genresOptions: GenreNameDTO[];
  categoriesOptions?: FilterOption[];
  genreFilter: string[];
  categoryFilter?: string[];
  yearLabel?: string;
  yearFilter: [number, number];
  onGenresChange: (values: string[]) => void;
  onCategoriesChange?: (values: string[]) => void;
  onYearChange: (value: [number, number]) => void;
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
  onClearAllFilters,
  isAnyFilterActive,
  minYear,
  maxYear
}: Readonly<MusicTableFiltersProps>) {
  return (
    <FilterPanel isAnyFilterActive={isAnyFilterActive} onClearAllFilters={onClearAllFilters}>
      <Box sx={{ width: 'fit-content' }}>
        <FilterSelect
          label={labelCategory}
          options={categoriesOptions}
          defaultValues={categoryFilter}
          variant="filled"
          maxSelections={10}
          onAdd={(val, lab, allSelected) => onCategoriesChange?.(allSelected)}
          onRemove={(val, lab, allSelected) => onCategoriesChange?.(allSelected)}
        />
      </Box>

      <Box sx={{ width: 'fit-content' }}>
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

      <Box sx={{ width: 'fit-content' }}>
        <YearNumericFilter
          label={yearLabel ?? 'Year'}
          value={yearFilter}
          onChange={onYearChange}
          minYear={minYear}
          maxYear={maxYear}
        />
      </Box>
    </FilterPanel>
  );
}
