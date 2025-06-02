'use client';

import React from 'react';
import { Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import Image from 'next/image';
import { baseChipStyles } from './Chip.styles';

interface CustomChipProps extends Omit<MuiChipProps, 'variant'> {
  variant?: 'filled' | 'outlined';
  onDelete?: () => void;
}

export const Chip: React.FC<CustomChipProps> = ({ variant = 'filled', disabled = false, onDelete, ...props }) => {
  const handleDelete = onDelete || (() => {});

  return (
    <MuiChip
      {...props}
      disabled={disabled}
      onDelete={handleDelete}
      deleteIcon={
        <button
          onClick={handleDelete}
          data-testid="delete-icon"
          aria-label="delete"
          style={{
            all: 'unset',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
          disabled={disabled}
        >
          <Image src="/icons/close-icon.svg" alt="close" width={16} height={16} priority />
        </button>
      }
      sx={baseChipStyles(variant)}
    />
  );
};
