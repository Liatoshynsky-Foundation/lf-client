import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { SvgIconProps } from '@mui/material/SvgIcon';

type IconType = ReactElement<SvgIconProps> | StaticImageData;

import { ButtonProps } from '@mui/material/Button'; 
export interface CustomLinkProps extends ButtonProps {
  frontIcon?: IconType;
  backIcon?: IconType;
  children: React.ReactNode;
  path: string;
}