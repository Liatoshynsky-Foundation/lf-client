import { Button, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { linkStyles } from './CustomLink.styles';
import { NextLinkComposed } from './NextLink';

import { sxToArray } from '~/lib/utils/sxToArray';

export interface CustomLinkProps {
  children: React.ReactNode;
  path: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  sx?: SxProps<Theme>;
  labelSx?: SxProps<Theme>;
  dataTestId?: string;
  ariaLabel?: string;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  path,
  children,
  startIcon,
  endIcon,
  sx,
  labelSx,
  dataTestId,
  ariaLabel
}) => {
  const buttonSx = [linkStyles.button, ...sxToArray(sx)];
  const typoSx = [linkStyles.typography, ...sxToArray(labelSx)];

  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      size="small"
      sx={buttonSx}
      component={NextLinkComposed}
      disableElevation
      disableRipple
      to={path}
      data-testid={dataTestId}
      aria-label={ariaLabel}
    >
      <Typography sx={typoSx}>{children}</Typography>
    </Button>
  );
};

export default CustomLink;
