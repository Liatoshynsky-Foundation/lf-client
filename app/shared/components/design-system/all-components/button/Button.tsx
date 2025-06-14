'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, ReactNode } from 'react';

const CustomButton = styled(MuiButton)({});

type Size = 'large' | 'medium' | 'small';
type Variant = 'contained' | 'outlined' | 'text';
type Color = 'primary' | 'secondary' | 'tertiary';

type BaseButtonProps = {
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  label?: string | React.ReactElement;
  variant?: Variant;
  color?: Color;
};

export type ButtonProps = BaseButtonProps & Omit<MuiButtonProps, keyof BaseButtonProps>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, disabled, loading, startIcon, endIcon, children, ...props }, ref) => {
    const isDisabled = disabled ?? loading;

    return (
      <CustomButton
        ref={ref}
        disabled={isDisabled}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        {...props}
      >
        {loading ? <CircularProgress color="inherit" size={25} /> : (label ?? children)}
      </CustomButton>
    );
  }
);

Button.displayName = 'Button';
export default Button;
