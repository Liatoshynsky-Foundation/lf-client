import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const styles = {
  root: (variant: 'filled' | 'outlined', disabled: boolean): SxProps => {
    let backgroundColor = 'blue.200';
    if (disabled) {
      backgroundColor = 'blue.75';
    } else if (variant === 'outlined') {
      backgroundColor = 'transparent';
    }

    let borderColor: string | undefined;
    if (variant === 'outlined') {
      borderColor = disabled ? 'blue.200' : 'black';
    }

    return {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '40px',
      gap: '8px',
      borderRadius: '28px',
      padding: '6px 8px 6px 16px',
      typography: 'customSemiBold16',
      textTransform: 'none',
      backgroundColor,
      border: variant === 'outlined' ? '1px solid' : 'none',
      borderColor,
      '&:has(> button:focus-visible)': {
        outline: '1px solid'
      }
    };
  },

  overlayButton: {
    position: 'absolute',
    inset: 0,
    cursor: 'inherit'
  } satisfies CSSProperties,

  nonInteractive: {
    pointerEvents: 'none',
    position: 'relative',
    zIndex: 1
  } satisfies CSSProperties,

  label: (disabled: boolean): SxProps => ({
    typography: 'customSemiBold16',
    color: disabled ? 'blue.700' : 'black'
  }),

  chipContainer: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },

  chipAboveOverlay: {
    position: 'relative',
    zIndex: 2
  },

  dropdownIcon: (disabled: boolean, open: boolean): SxProps => ({
    opacity: disabled ? 0.5 : 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease-in-out',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
  }),

  popoverContent: (minWidth?: number): SxProps => ({
    minWidth,
    padding: '8px 0',
    outline: 0
  })
};
