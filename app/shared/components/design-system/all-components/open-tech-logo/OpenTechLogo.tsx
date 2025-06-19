import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from './OpenTechLogo.styles';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

const LOGO_CONFIG = {
  academy: {
    src: '/images/opentech-academy.svg',
    width: 232,
    height: 16,
    alt: 'OpenTech Academy logo'
  },
  default: {
    src: '/images/opentech.svg',
    width: 165,
    height: 16,
    alt: 'OpenTech logo'
  }
} as const;

interface OpenTechLogoProps {
  label: string;
  showAcademy?: boolean;
}

const OpenTechLogo: React.FC<OpenTechLogoProps> = ({ label, showAcademy = true }) => {
  const logoConfig = showAcademy ? LOGO_CONFIG.academy : LOGO_CONFIG.default;

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.label}>{label}</Typography>

      <SvgImage src={logoConfig.src} width={logoConfig.width} height={logoConfig.height} alt={logoConfig.alt} />
    </Box>
  );
};
export default OpenTechLogo;
