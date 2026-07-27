'use client';

import { Button, Chip as MuiChip, ChipProps as MuiChipProps } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { baseChipStyles } from './Chip.styles';

interface CustomChipProps extends Omit<MuiChipProps, 'variant'> {
  variant?: 'filled' | 'outlined';
  onDelete?: () => void;
}

export const Chip: React.FC<CustomChipProps> = ({ variant = 'filled', disabled = false, onDelete, ...props }) => {
  const handleDeleteWrapper = React.useCallback(() => {
    if (onDelete && !disabled) {
      onDelete();
    }
  }, [onDelete, disabled]);

  return (
    <MuiChip
      {...props}
      disabled={disabled}
      onDelete={handleDeleteWrapper}
      tabIndex={-1}
      deleteIcon={
        onDelete ? (
          <Button
            data-testid="delete-icon"
            aria-label="delete"
            style={{
              all: 'unset',
              display: 'flex',
              alignItems: 'center',
              cursor: disabled ? 'not-allowed' : 'pointer'
            }}
          >
            <Image src="/icons/close-icon.svg" alt="close" width={16} height={16} priority />
          </Button>
        ) : undefined
      }
      sx={baseChipStyles(variant)}
    />
  );
};
