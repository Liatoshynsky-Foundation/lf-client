import { InputAdornment, SxProps, TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

const CustomTextField = styled(MuiTextField)({});

type CustomBaseProps = {
  variant?: 'standard' | 'outlined';
  disabled?: boolean;
  value?: string;
  label?: string;
  startIcon?: string;
  endIcon?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  sx?: SxProps;
};

type CustomTextFieldProps = CustomBaseProps & Omit<MuiTextFieldProps, keyof CustomBaseProps>;

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
            startAdornment: effectiveStartIcon && (
              <InputAdornment position="start">
                <SvgImage src={effectiveStartIcon} alt="start icon" width={24} height={24} />
              </InputAdornment>
            ),
            endAdornment: endIcon && (
              <InputAdornment position="end">
                <SvgImage src={endIcon} alt="end icon" width={24} height={24} />
              </InputAdornment>
            )
          }
        }}
        {...props}
      />
    );
  }
);

TextField.displayName = 'TextField';

export default TextField;
