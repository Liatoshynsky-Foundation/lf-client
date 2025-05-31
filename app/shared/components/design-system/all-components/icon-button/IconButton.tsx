import {
  CircularProgress,
  IconButtonProps as MuiIconButtonProps,
  IconButton as MuiIconButton,
} from '@mui/material';
import { CreateStyleClasses, IconButtonStyles } from './IconButton.styles';
import {
  IconButtonColorVariant,
  IconButtonVariant,
} from '~/types/enums/common.enums';

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

export const IconButton: React.FC<IconButtonProps> = ({
  variant = IconButtonColorVariant.Primary,
  size = 'medium',
  loading = false,
  disabled = false,
  type = IconButtonVariant.filled,
  onClick,
  children,
  ...props
}) => {
  const styleClasses = CreateStyleClasses(variant, type);
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
