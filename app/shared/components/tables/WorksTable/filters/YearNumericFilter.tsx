'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useMemo, useRef } from 'react';

import DropdownMenu from '~/ds-components/dropdown-menu/DropdownMenu';
import NumericFiltering from '~/ds-components/filtering/numeric/NumericFiltering';
import { filterSelectStyles } from '~/ds-components/selector/FilterSelect.styles';

import { PositionEnum } from '~/types/enums/common.enums';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const handleToggleMenu = useCallback(() => {
    if (buttonRef.current) {
      setAnchorEl((prev) => (prev ? null : buttonRef.current));
    }
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  const numericFilterElement = useMemo(
    () => (
      <Box sx={{ minWidth: buttonRef.current?.offsetWidth }} key="numeric-filter">
        <NumericFiltering
          value={value}
          onChange={onChange}
          minNumber={minYear}
          maxNumber={maxYear}
          onChangeCommitted={onChangeCommitted}
        />
      </Box>
    ),
    [value, onChange, minYear, maxYear, onChangeCommitted]
  );

  return (
    <>
      <Box
        component="button"
        ref={buttonRef}
        sx={{ ...filterSelectStyles.root('filled', false) }}
        onClick={handleToggleMenu}
        aria-haspopup="dialog"
        aria-expanded={Boolean(anchorEl)}
      >
        <Typography sx={filterSelectStyles.label(false)}>{label}</Typography>
        <Box sx={filterSelectStyles.dropdownIcon(false)}>
          <Image src="/icons/chevron-down.svg" alt="dropdown" width={16} height={16} />
        </Box>
      </Box>
      <DropdownMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: PositionEnum.Bottom,
          horizontal: PositionEnum.Left
        }}
        transformOrigin={{
          vertical: PositionEnum.Top,
          horizontal: PositionEnum.Left
        }}
        menuList={[numericFilterElement]}
      />
    </>
  );
};
