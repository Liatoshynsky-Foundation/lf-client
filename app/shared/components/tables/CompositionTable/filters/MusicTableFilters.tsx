'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';
import { FilterSelect } from '~/ds-components/selector/FilterSelect';

import { styles } from './MusicTableFilters.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import { CategoryNameDTO, GenreNameDTO } from '~/domain/dto/table.dto';
import Delete from '~/public/icons/trash-2.svg';
import TooltipCustom from '~/shared/components/design-system/all-components/tooltip/Tooltip';
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
  const t = useTranslations('filtering');

  const categoryOrder = categoryFilter.length > 0 ? 1 : 3;
  const genreOrder = genreFilter.length > 0 ? 2 : 3;

  return (
    <Box sx={styles.container} data-testid="MusicTableFilters">
      <Box sx={styles.row}>
        <Box sx={{ order: categoryOrder }} data-testid="MusicTableFilters-category">
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

        <Box sx={{ order: genreOrder }} data-testid="MusicTableFilters-genre">
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

        <Box sx={{ order: 3 }} data-testid="MusicTableFilters-year">
          <YearNumericFilter
            label={yearLabel ?? 'Year'}
            value={yearFilter}
            onChange={onYearChange}
            onChangeCommitted={onYearChangeCommitted}
            minYear={minYear}
            maxYear={maxYear}
          />
        </Box>

        <Box sx={{ order: 4, alignSelf: 'center' }} data-testid="MusicTableFilters-clear">
          {onClearAllFilters && isAnyFilterActive && (
            <TooltipCustom title={t('clearAll')} placement="top">
              <IconButton
                type={IconButtonVariant.outlined}
                variant={IconButtonColorVariant.Secondary}
                size="medium"
                onClick={onClearAllFilters}
                sx={{ border: 'none', padding: 0 }}
              >
                <Delete />
              </IconButton>
            </TooltipCustom>
          )}
        </Box>
      </Box>
    </Box>
  );
}
