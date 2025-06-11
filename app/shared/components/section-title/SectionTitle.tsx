import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { imageSizes, styles } from './SectionTitle.styles';

import { generateSizesAttribute } from '~/lib/utils/generateSizesAttribute';

interface SectionTitleProps {
  icon?: boolean;
  mb?: number | string;
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ icon = true, mb, title }) => {
  const sizesAttribute = generateSizesAttribute(imageSizes);

  return (
    <Box sx={styles.container(mb)}>
      {icon && (
        <Box sx={styles.image} data-testid="title-icon">
          <Image src="/icons/ellipse.svg" alt="ellipse" fill sizes={sizesAttribute} />
        </Box>
      )}
      <Typography sx={styles.title} component="h2">
        {title}
      </Typography>
    </Box>
  );
};

export default SectionTitle;
