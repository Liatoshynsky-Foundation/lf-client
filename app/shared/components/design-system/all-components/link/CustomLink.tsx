import { linkStyles } from './CustomLink.styles';
import { NextLinkComposed } from './NextLink';
import { Typography } from '@mui/material';
import { Button , ButtonProps } from '@mui/material';

export interface CustomLinkProps extends ButtonProps {
  children: React.ReactNode;
  path: string;
}
const CustomLink = ({ path, children, startIcon, endIcon }: CustomLinkProps) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      size="small"
      sx={linkStyles.button}
      component={NextLinkComposed}
      disableElevation
      disableRipple
      to={{ pathname: path }}
    >
      <Typography sx={linkStyles.typography}>{children}</Typography>
    </Button>
  );
};

export default CustomLink;
