import InputAdornment from '@mui/material/InputAdornment';
import React, { ReactNode } from 'react';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type IconType = string | ReactNode;

export const renderAdornmentIcon = (icon: IconType, position: 'start' | 'end') => {
  if (!icon) return null;

  return (
    <InputAdornment position={position}>
      {typeof icon === 'string' ? <SvgImage src={icon} alt={`${position} icon`} width={24} height={24} /> : icon}
    </InputAdornment>
  );
};
