import * as React from 'react';
import { TextField, InputAdornment, SxProps } from '@mui/material';
import { outlinedStyles, standardStyles } from './CustomTextField.styles';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type TextFieldProps = Readonly<{
  variant?: 'standard' | 'outlined';
  disabled?: boolean;
  value?: string;
  label?: string;
  startIcon?: string;
  endIcon?: string;
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
  const effectiveStartIcon =
    variant === 'standard' ? (startIcon ?? 'icons/search-icon.svg') : startIcon;

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
          startAdornment: effectiveStartIcon && (
            <InputAdornment position="start">
              <SvgImage
                src={effectiveStartIcon}
                alt="start icon"
                width={24}
                height={24}
              />
            </InputAdornment>
          ),
          endAdornment: endIcon && (
            <InputAdornment position="end">
              <SvgImage src={endIcon} alt="end icon" width={24} height={24} />
            </InputAdornment>
          ),
        },
      }}
      {...props}
    />
  );
}
