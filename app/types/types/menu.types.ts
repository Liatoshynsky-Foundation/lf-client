import { SxProps, Theme } from '@mui/material';

export type IconPosition = Readonly<'left' | 'right'>;

import type { HTMLAttributes, ReactNode } from 'react';

export type OverflowMenuItemConfig = Readonly<{
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  containerSx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  disabled?: boolean;
  hidden?: boolean;
  onClick: () => void;
}>;

export type TriggerProps = HTMLAttributes<HTMLElement> & {
  'data-testid'?: string;
};
