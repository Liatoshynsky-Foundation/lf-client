'use client';
import { useRef } from 'react';

import NumericFiltering from '~/ds-components/filtering/numeric/NumericFiltering';

import { DropdownFilterPopper } from '~/shared/components/design-system/all-components/dropdown-filter-popper/DropdownFilterPopper';

interface YearNumericFilterProps {
  label: string;
  value: [number, number];
  onChange: (numbers: [number, number]) => void;
  minYear?: number;
  maxYear?: number;
  onChangeCommitted: (numbers: [number, number]) => void;
}

export const YearNumericFilter: React.FC<YearNumericFilterProps> = ({
  label,
  value,
  onChange,
  onChangeCommitted,
  minYear,
  maxYear
}) => {
  const firstFieldRef = useRef<HTMLInputElement | null>(null);

  return (
    <DropdownFilterPopper label={label} autoFocusRef={firstFieldRef}>
      {() => (
        <NumericFiltering
          value={value}
          onChange={onChange}
          minNumber={minYear}
          maxNumber={maxYear}
          onChangeCommitted={onChangeCommitted}
          autoFocusRef={firstFieldRef}
        />
      )}
    </DropdownFilterPopper>
  );
};
