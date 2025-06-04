'use client';

import { Box, Typography } from '@mui/material';
import { SvgImage } from '../svg-image/SvgImage';
import { imageSizes, styles } from './SectionTitle.styles';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface SectionTitleProps {
  icon?: boolean;
  mb?: number | string;
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon = true, mb, children }) => {
  const { isLaptopAndAbove } = useBreakpoints();

  return (
    <Box sx={styles.container(mb)}>
      {icon && <SvgImage src="/icons/ellipse.svg" alt="ellipse" {...imageSizes(isLaptopAndAbove)} />}
      <Typography sx={styles.title} component="h2">
        {children}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
