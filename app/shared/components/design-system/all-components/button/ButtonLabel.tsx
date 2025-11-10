import { Box } from '@mui/material';
import { ReactNode } from 'react';

import { styles as labelStyles } from './Button.styles';

type ButtonLabelProps = {
  label?: string;
  shortLabel?: string;
  children?: ReactNode;
};

export const ButtonLabel: React.FC<ButtonLabelProps> = ({ label, shortLabel, children }) => {
  if (children) return <>{children}</>;

  if (shortLabel && label) {
    return (
      <>
        <Box component="span" sx={labelStyles.short}>
          {shortLabel}
        </Box>
        <Box component="span" sx={labelStyles.full}>
          {label}
        </Box>
      </>
    );
  }

  return <>{label ?? shortLabel ?? null}</>;
};
