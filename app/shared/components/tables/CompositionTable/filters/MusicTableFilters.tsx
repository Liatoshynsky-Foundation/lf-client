'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';

import { FilterSelect } from '~/ds-components/selector/FilterSelect';

import { FilterPanel } from '~/shared/components/filters/FilterPanel';
import { YearNumericFilter } from '~/shared/components/tables/WorksTable/filters/YearNumericFilter';

type Option = { label: string; value: string };

interface MusicTableFiltersProps {
  labelOpus?: string;
  labelGenre?: string;
  opusesOptions: Option[];
  genresOptions: Option[];
  defaultOpuses: string[];
  defaultGenres: string[];
  yearFilter: [number, number];
  onOpusesChange: (values: string[]) => void;
  onGenresChange: (values: string[]) => void;
  onYearChange: (value: [number, number]) => void;
  onClearAllFilters: () => void;
}

export function MusicTableFilters({
  labelOpus = 'Opus',
  labelGenre = 'Genre',
  opusesOptions,
  genresOptions,
  defaultOpuses,
  defaultGenres,
  yearFilter,
  onOpusesChange,
  onGenresChange,
  onYearChange,
  onClearAllFilters
}: Readonly<MusicTableFiltersProps>) {
  const t = useTranslations('table.work');

  const isOpusActive = useMemo(() => defaultOpuses && defaultOpuses.length > 0, [defaultOpuses]);
  const isGenreActive = useMemo(() => defaultGenres && defaultGenres.length > 0, [defaultGenres]);
  const isYearActive = useMemo(() => {
    if (!yearFilter) return false;
    const minYear = 1900;
    const maxYear = new Date().getFullYear();
    return yearFilter[0] > minYear || yearFilter[1] < maxYear;
  }, [yearFilter]);

  const isAnyFilterActive = isOpusActive || isGenreActive || isYearActive;

  return (
    <FilterPanel isAnyFilterActive={isAnyFilterActive} onClearAllFilters={onClearAllFilters}>
      <Box sx={{ width: 'fit-content' }}>
        <FilterSelect
          label={labelOpus}
          options={opusesOptions}
          defaultValues={defaultOpuses}
          variant="filled"
          maxSelections={10}
          onAdd={(val, lab, allSelected) => onOpusesChange(allSelected)}
          onRemove={(val, lab, allSelected) => onOpusesChange(allSelected)}
        />
      </Box>

      <Box sx={{ width: 'fit-content' }}>
        <FilterSelect
          label={labelGenre}
          options={genresOptions}
          defaultValues={defaultGenres}
          variant="filled"
          maxSelections={10}
          onAdd={(val, lab, allSelected) => onGenresChange(allSelected)}
          onRemove={(val, lab, allSelected) => onGenresChange(allSelected)}
        />
      </Box>

      <Box sx={{ width: 'fit-content' }}>
        <YearNumericFilter label={t('filters.yearLabel')} value={yearFilter} onChange={onYearChange} />
      </Box>
    </FilterPanel>
  );
}
