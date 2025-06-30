import { SxProps, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { renderAdornmentIcon } from './render-icon';

const CustomTextField = styled(MuiTextField)({});

type CustomBaseProps = {
  variant?: 'standard' | 'outlined';
  disabled?: boolean;
  value?: string;
  label?: string;
  startIcon?: string | React.ReactNode;
  endIcon?: string | React.ReactNode;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  sx?: SxProps;
};

export type CustomTextFieldProps = CustomBaseProps & Omit<MuiTextFieldProps, keyof CustomBaseProps>;

const TextField = React.forwardRef<HTMLInputElement, CustomTextFieldProps>(
  (
    { variant = 'standard', disabled, value, label, startIcon, endIcon, placeholder, onChange, error, sx, ...props },
    ref
  ) => {
    const effectiveStartIcon = variant === 'standard' ? (startIcon ?? 'icons/search-icon.svg') : startIcon;

    return (
      <CustomTextField
        id={label ?? 'custom-text-field'}
        variant={variant}
        disabled={disabled}
        value={value}
        label={label}
        placeholder={placeholder}
        onChange={onChange}
        error={error}
        sx={sx}
        inputRef={ref}
        slotProps={{
          input: {
            startAdornment: renderAdornmentIcon(effectiveStartIcon, 'start'),
            endAdornment: renderAdornmentIcon(endIcon, 'end')
          }
        }}
        {...props}
      />
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
