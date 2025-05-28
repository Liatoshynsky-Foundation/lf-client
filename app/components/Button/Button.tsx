'use client';
import { forwardRef, ReactNode } from 'react';
import {
  Button as MuiButton,
  CircularProgress,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

import { buttonBaseStyles, variantStyles, sizeStyles } from './Button.styles';

const sizes = ['large', 'medium', 'small'] as const;

const variants = ['filled', 'outlined', 'text'] as const;

type BaseButtonProps = {
  size?: (typeof sizes)[number];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  label?: string;
} & (
  | {
      color?: 'primary' | 'secondary';
      variant?: (typeof variants)[number];
    }
  | {
      color: 'tertiary';
      variant?: 'filled';
    }
);

export type ButtonProps = BaseButtonProps &
  Omit<MuiButtonProps, keyof BaseButtonProps>;

type Ref = MuiButtonProps['ref'];

const Button = forwardRef(
  (
    {
      size = 'medium',
      variant = 'filled',
      color = 'secondary',
      label,
      className,
      disabled,
      loading,
      startIcon,
      endIcon,
      children,
      ...props
    }: ButtonProps,
    forwardedRef: Ref,
  ) => {
    const loader = (
      <CircularProgress color="inherit" data-testid="loader" size={25} />
    );
    const isDisabled = disabled || loading;

    const content = (
      <>
        {startIcon}
        <span className="lf-btn-label">{label || children}</span>
        {endIcon}
      </>
    );

    return (
      <MuiButton
        sx={{
          ...buttonBaseStyles,
          ...sizeStyles[size],
          ...(color === 'tertiary'
            ? variantStyles.tertiary.filled
            : variantStyles[color]?.[variant]),
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
  },
);
Button.displayName = 'Button';

export default Button;
