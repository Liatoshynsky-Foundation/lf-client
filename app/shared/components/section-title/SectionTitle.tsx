'use client';

import { Box, Typography } from '@mui/material';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { imageSizes, styles } from './SectionTitle.styles';

interface SectionTitleProps {
  icon?: boolean;
  mb?: number | string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon = true, mb, title }) => {
  const { isLaptopAndAbove } = useBreakpoints();

  return (
    <Box sx={styles.container(mb)}>
      {icon && <SvgImage src="/icons/ellipse.svg" alt="ellipse" {...imageSizes(isLaptopAndAbove)} />}
      <Typography sx={styles.title} component="h2">
        {title}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
