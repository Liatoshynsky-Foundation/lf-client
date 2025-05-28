'use client';
import { CustomLinkProps } from './Link.types';
import { linkStyles } from './Link.styles';
import Button from '@mui/material/Button';
import { NextLinkComposed } from './NextLink';
import Image from 'next/image';
import { Typography } from '@mui/material';
// import { Box } from '@mui/material';

const CustomLink = ({ path, children, startIcon, endIcon, startSVG, endSVG }: CustomLinkProps) => {
  const renderSVG = (svg: CustomLinkProps['startSVG']) => {
    if (!svg) return null;

    if (typeof svg === 'function') {
      const SVGComponent = svg;
      return <SVGComponent width={26} height={26} style={{ display: 'block' }} />;
    }

    return <Image src={svg} alt="icon" width={26} height={26} />;
  };


  return (
<Button
  startIcon={startSVG ? renderSVG(startSVG) : startIcon}
  endIcon={endSVG ? renderSVG(endSVG) : endIcon}
  size="small"
  sx={linkStyles.button}
  component={NextLinkComposed}
  disableElevation
  disableRipple
  to={{ pathname: path }}
>
  <Typography
    sx={linkStyles.typography}
  >
    {children}
  </Typography>
</Button>

  );
};

export default CustomLink;
