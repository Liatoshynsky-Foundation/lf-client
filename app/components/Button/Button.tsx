import { forwardRef, ReactNode } from 'react';
import {
  Button as MuiButton,
  CircularProgress,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

import { buttonBaseStyles, variantStyles, sizeStyles } from './Button.styles';

const sizes = ['large', 'medium', 'small'] as const;

const variants = ['filled', 'outlined', 'text'] as const;

const color = ['primary', 'secondary', 'tertiary'] as const;

type BaseButtonProps = {
  variant?: (typeof variants)[number];
  color?: (typeof color)[number];
  size?: (typeof sizes)[number];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  to?: string;
};

export type ButtonProps = BaseButtonProps &
  Omit<MuiButtonProps, keyof BaseButtonProps>;

type Ref = MuiButtonProps['ref'];

const Button = forwardRef(
  (
    {
      size = 'medium',
      variant = 'filled',
      color = 'secondary',
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
        <span className="lf-btn-label">{children}</span>
        {endIcon}
      </>
    );

    return (
      <MuiButton
        sx={{
          ...buttonBaseStyles,
          ...(sizeStyles[size] ?? {}),
          ...(variantStyles[color]?.[variant] ?? {}),
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
