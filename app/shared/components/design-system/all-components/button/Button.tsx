'use client';

import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslations } from 'next-intl';
import { ElementType, forwardRef, ReactNode } from 'react';

import { ButtonLabel } from './ButtonLabel';

import { Link } from '~/i18n/navigation';

const CustomButton = styled(MuiButton)({});

interface ExtraProps {
  href?: string;
  target?: string;
  rel?: string;
  scroll?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export type ButtonProps = {
  size?: 'large' | 'medium' | 'small';
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  label?: string;
  shortLabel?: string;
  link?: string;
  externalLink?: boolean;
} & Omit<MuiButtonProps, 'size'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, shortLabel, link, externalLink, disabled, loading, startIcon, endIcon, children, sx, ...props }, ref) => {
    const t = useTranslations('common');
    const isDisabled = disabled ?? loading;

    let component: ElementType = 'button';

    if (link && !isDisabled) {
      component = externalLink ? 'a' : Link;
    }

    const extraProps: ExtraProps = {};

    if (link && !isDisabled) {
      extraProps.href = link;
      if (externalLink) {
        extraProps.target = '_blank';
        extraProps.rel = 'noopener noreferrer';
      } else {
        extraProps.scroll = true;
      }
    }

    return (
      <CustomButton
        component={component}
        ref={ref}
        disabled={isDisabled}
        startIcon={!loading ? startIcon : undefined}
        endIcon={!loading ? endIcon : undefined}
        sx={{
          width: 'fit-content',
          ...(link && { textDecoration: 'none' }),
          ...sx
        }}
        {...props}
        {...extraProps}
      >
        {loading ? (
          <CircularProgress color="inherit" size={25} aria-label={label ?? t('loading')} data-testid="loader" />
        ) : (
          <ButtonLabel label={label} shortLabel={shortLabel}>
            {children}
          </ButtonLabel>
        )}
      </CustomButton>
    );
  }
);

Button.displayName = 'Button';
export default Button;
