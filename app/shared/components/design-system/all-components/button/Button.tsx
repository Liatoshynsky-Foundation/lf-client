'use client';
import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { forwardRef, ReactNode } from 'react';

import { buttonBaseStyles, sizeStyles, typographyStyles, variantStyles } from './Button.styles';

type Size = 'large' | 'medium' | 'small';

type Variant = 'filled' | 'outlined' | 'text';

type BaseButtonProps = {
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  label?: string;
} & (
  | {
      color?: 'primary' | 'secondary';
      variant?: Variant;
    }
  | {
      color: 'tertiary';
      variant?: 'filled';
    }
);

export type ButtonProps = BaseButtonProps & Omit<MuiButtonProps, keyof BaseButtonProps>;

type Ref = MuiButtonProps['ref'];

const Button = forwardRef(
  (
    {
      size = 'medium',
      variant = 'filled',
      color = 'secondary',
      label,
      disabled,
      loading,
      startIcon,
      endIcon,
      children,
      ...props
    }: ButtonProps,
    forwardedRef: Ref
  ) => {
    const loader = <CircularProgress color="inherit" data-testid="loader" size={25} />;
    const isDisabled = disabled ?? loading;

    const content = (
      <>
        {startIcon}
        <span className="lf-btn-label">{label ?? children}</span>
        {endIcon}
      </>
    );

    return (
      <MuiButton
        sx={{
          ...buttonBaseStyles,
          ...sizeStyles[size],
          ...typographyStyles[color]?.[size],
          ...(color === 'tertiary' ? variantStyles.tertiary.filled : variantStyles[color]?.[variant])
        }}
        disabled={isDisabled}
        ref={forwardedRef}
        {...props}
      >
        {loading ? (
          <>
            <span className="lf-btn-hidden-content">{content}</span>
            <span className="lf-btn-loader">{loader}</span>
          </>
        ) : (
          content
        )}
      </MuiButton>
    );
  }
);
Button.displayName = 'Button';

export default Button;
