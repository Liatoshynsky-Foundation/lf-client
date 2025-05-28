// import { ReactElement } from 'react';
// import { SvgIconProps } from '@mui/material/SvgIcon';
import { StaticImageData } from 'next/image';
type SVGType = StaticImageData | string | React.FC<React.SVGProps<SVGSVGElement>>;
import { ButtonProps } from '@mui/material/Button'; 
export interface CustomLinkProps extends ButtonProps {
  startSVG?: SVGType;
  endSVG?: SVGType;
  children: React.ReactNode;
  path: string;
}