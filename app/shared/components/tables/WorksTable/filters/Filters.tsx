import { Box } from '@mui/material';
import React, { useMemo } from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';
import { FilterSelect } from '~/ds-components/selector/FilterSelect';

import { YearNumericFilter } from './YearNumericFilter';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';

import Delete from '~/public/icons/trash-2.svg';

interface AuthorFilterOption {
  label: string;
  value: string;
}

interface WorkTableFiltersProps {
  authorFilter: string[];
  yearFilter: [number, number];
  onAuthorFilterChange: (value: string[]) => void;
  onYearFilterChange: (value: [number, number]) => void;
  onClearAllFilters: () => void;
  authors: AuthorFilterOption[];
}

export function WorkTableFilters({
  authorFilter,
  yearFilter,
  onAuthorFilterChange,
  onYearFilterChange,
  onClearAllFilters,
  authors
}: Readonly<WorkTableFiltersProps>) {
  const isAuthorFilterActive = useMemo(() => authorFilter && authorFilter.length > 0, [authorFilter]);
  const isYearFilterActive = useMemo(() => {
    if (!yearFilter) {
      return false;
    }
    const minYear = 1900;
    const maxYear = new Date().getFullYear();
    return yearFilter[0] > minYear || yearFilter[1] < maxYear;
  }, [yearFilter]);
  const isAnyFilterActive = isAuthorFilterActive || isYearFilterActive;

  const authorOptions = authors;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        flexWrap: 'wrap'
      }}
    >
      <Box sx={{ width: 'fit-content' }}>
        <FilterSelect
          label="Автор"
          options={authorOptions}
          defaultValues={authorFilter}
          variant="filled"
          maxSelections={10}
          onAdd={(val, label, allSelected) => onAuthorFilterChange(allSelected)}
          onRemove={(val, label, allSelected) => onAuthorFilterChange(allSelected)}
        />
      </Box>
      <Box sx={{ width: 'fit-content' }}>
        <YearNumericFilter
          label="Рік написання"
          value={yearFilter}
          onChange={onYearFilterChange}
          onChangeCommitted={onYearFilterChange}
        />
      </Box>
      {isAnyFilterActive && (
        <IconButton
          type={IconButtonVariant.outlined}
          variant={IconButtonColorVariant.Secondary}
          size="medium"
          onClick={onClearAllFilters}
        >
          <Delete />
        </IconButton>
      )}
    </Box>
  );
}
