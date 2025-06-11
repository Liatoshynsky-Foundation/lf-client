import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from '~/components/FoundationFounders/FoundationWasCreated/FoundationWasCreated.styles';
import { SvgImage } from '~/components/svg-image/SvgImage';

interface FoundationWasCreatedProps {
  title: string;
  description: string;
}

const FoundationWasCreated: React.FC<FoundationWasCreatedProps> = ({ title, description }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.ellipseWrapper}>
        <SvgImage src="icons/ellipse.svg" alt="ellipse" width={32} height={30} />
      </Box>
      <Box sx={styles.text}>
        <Typography sx={styles.title}>{title}</Typography>
        <Typography sx={styles.description}>{description}</Typography>
      </Box>
    </Box>
  );
};

export default FoundationWasCreated;
