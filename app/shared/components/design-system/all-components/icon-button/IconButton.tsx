'use client';

import {
  CircularProgress,
  IconButtonProps as MuiIconButtonProps,
  IconButton as MuiIconButton,
} from '@mui/material';
import { FC } from 'react';
import { IconButtonStyles } from './IconButton.styles';

enum IconButtonColorVariant {
  Primary = 'primary',
  PrimaryOutlined = 'primaryOutlined',
  Secondary = 'secondary',
  SecondaryOutlined = 'secondaryOutlined',
  Tertiary = 'tertiary',
  Error = 'error',
}
enum IconButtonVariant{
  filled = 'filled',
  outlined = 'outlined'
}
interface IconButtonProps extends Omit<MuiIconButtonProps, 'type'> {
  variant?: IconButtonColorVariant;
  outlined?: boolean;
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  toggleAble?: boolean;
  isToggled?: boolean;
  type?: IconButtonVariant;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({
  variant = IconButtonColorVariant.Error,
  size = 'medium',
  loading = false,
  disabled = false,
  type = IconButtonVariant.outlined,
  onClick,
  children,
  ...props
}) => {
  let styleClasses = variant as string;
  if(type === IconButtonVariant.outlined && (variant === IconButtonColorVariant.Primary || variant === IconButtonColorVariant.Secondary)){
    styleClasses+="Otlined";
  }
  const loaderSizes = {
    small: 16,
    medium: 20,
    large: 24,
  };
  const loader = (
    <CircularProgress data-testid="loader" size={loaderSizes[size]} />
  );
  const buttonContent = loading ? loader : children;
  return (
    <MuiIconButton
      disabled={disabled}
      onClick={onClick}
      size={size}
      sx={IconButtonStyles[styleClasses as keyof typeof IconButtonStyles]}
      {...props}
    >
      {buttonContent}
    </MuiIconButton>
  );
};
