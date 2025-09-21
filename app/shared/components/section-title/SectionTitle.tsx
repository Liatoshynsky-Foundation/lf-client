import { Box, SxProps, Theme, Typography } from '@mui/material';
import Image from 'next/image';

import { imageSizes, styles } from './SectionTitle.styles';
import { sxToArray } from '~/utils/sxToArray';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

interface SectionTitleProps {
  icon?: boolean;
  mb?: number | string;
  gridColumn?: object;
  title: string;
  sx?: SxProps<Theme>;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon = true, mb, title, gridColumn, sx }) => {
  const sizesAttribute = generateSizesAttribute(imageSizes);

  return (
    <Box sx={[styles.container(mb), ...sxToArray(sx)]}>
      {icon && (
        <Box sx={styles.image} data-testid="title-icon">
          <Image src="/icons/ellipse.svg" alt="ellipse" fill sizes={sizesAttribute} />
        </Box>
      )}
      <Typography sx={styles.title(gridColumn)} component="h2">
        {title}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
