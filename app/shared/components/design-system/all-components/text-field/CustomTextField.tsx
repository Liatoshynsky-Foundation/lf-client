import * as React from 'react';
import { TextField, InputAdornment, SxProps } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import { outlinedStyles, standardStyles } from './CustomTextField.styles';

type TextFieldProps = Readonly<{
  variant?: 'standard' | 'outlined';
  disabled?: boolean;
  value?: string;
  label?: string;
  startIcon?: StaticImageData | string;
  endIcon?: StaticImageData | string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  sx?: SxProps;
}>;

export default function CustomTextField({
  variant = 'standard',
  disabled,
  value,
  label,
  startIcon,
  endIcon,
  placeholder,
  onChange,
  error,
  sx,
  ...props
}: TextFieldProps) {
  const variantStyles =
    variant === 'outlined' ? outlinedStyles : standardStyles;

  return (
    <TextField
      id={label ?? 'custom-text-field'}
      variant={variant}
      disabled={disabled}
      value={value}
      label={label}
      placeholder={placeholder}
      onChange={onChange}
      error={error}
      sx={{ ...variantStyles, ...sx }}
      slotProps={{
        input: {
          startAdornment: startIcon && (
            <InputAdornment position="start">
              <Image src={startIcon} alt="start icon" width={24} height={24} />
            </InputAdornment>
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end">
              <Image src={endIcon} alt="end icon" width={24} height={24} />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
