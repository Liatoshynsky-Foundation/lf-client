'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, ReactNode } from 'react';

import { ButtonLabel } from './ButtonLabel';

import { Link } from '~/i18n/navigation';

const CustomButton = styled(MuiButton)({});

type Size = 'large' | 'medium' | 'small';
type Variant = 'contained' | 'outlined' | 'text';

type BaseButtonProps = {
  size?: Size;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  label?: string;
  shortLabel?: string;
  link?: string;
  externalLink?: boolean;
} & (
  | {
      color?: 'primary' | 'secondary';
      variant?: Variant;
    }
  | {
      color: 'tertiary';
      variant?: 'contained';
    }
);
export type ButtonProps = BaseButtonProps & Omit<MuiButtonProps, keyof BaseButtonProps>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, shortLabel, link, externalLink, disabled, loading, startIcon, endIcon, children, ...props }, ref) => {
    const isDisabled = disabled ?? loading;

    const content = (
      <CustomButton
        ref={ref}
        disabled={isDisabled}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        {...props}
      >
        {loading ? (
          <CircularProgress color="inherit" size={25} data-testid="loader" />
        ) : (
          <ButtonLabel label={label} shortLabel={shortLabel}>
            {children}
          </ButtonLabel>
        )}
      </CustomButton>
    );

    if (!link) return content;

    if (externalLink) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }

    return (
      <Link style={{ width: 'fit-content' }} href={link} scroll onClickCapture={() => window.scrollTo({ top: 0 })}>
        {content}
      </Link>
    );
  }
);

Button.displayName = 'Button';
export default Button;
