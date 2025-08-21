'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { forwardRef, ReactNode } from 'react';

import { Link } from '~/i18n/navigation';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

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
  ({ label, shortLabel, link, disabled, loading, startIcon, endIcon, children, ...props }, ref) => {
    const isDisabled = disabled ?? loading;

    const { isMobile } = useBreakpoints();
    label = isMobile && shortLabel ? shortLabel : label;

    const content = (
      <CustomButton
        ref={ref}
        disabled={isDisabled}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        {...props}
      >
        {loading ? <CircularProgress color="inherit" size={25} data-testid="loader" /> : (label ?? children)}
      </CustomButton>
    );

    return link ? <Link href={link}>{content}</Link> : content;
  }
);

Button.displayName = 'Button';
export default Button;
