import { CustomLinkProps } from './CustomLink.types';
import { CustomLinkStyles } from './CustomLink.styles';
import Button from '@mui/material/Button';
import { NextLinkComposed } from './NextLink';
import { Typography } from '@mui/material';

const CustomLink = ({ path, children, startIcon, endIcon }: CustomLinkProps) => {
  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      size="small"
      sx={CustomLinkStyles.button}
      component={NextLinkComposed}
      disableElevation
      disableRipple
      to={{ pathname: path }}
    >
      <Typography sx={CustomLinkStyles.typography}>{children}</Typography>
    </Button>
  );
};

export default CustomLink;
