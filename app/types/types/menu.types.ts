import { SxProps, Theme } from '@mui/material';

export type IconPosition = Readonly<'left' | 'right'>;

export type OverflowMenuItemConfig = Readonly<{
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  containerSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  disabled?: boolean;
  hidden?: boolean;
  onClick: () => void;
}>;

export type TriggerProps = React.HTMLAttributes<HTMLElement> & {
  'data-testid'?: string;
};
