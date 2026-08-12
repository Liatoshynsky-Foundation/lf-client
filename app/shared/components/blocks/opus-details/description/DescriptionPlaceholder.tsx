import { Box, Typography } from '@mui/material';
import Image from 'next/image';

import { styles } from './DescriptionPlaceholder.styles';

export type DescriptionPlaceholderProps = {
  title: string;
  subtitle: string;
  imageAlt: string;
};

const DescriptionPlaceholder = ({ title, subtitle, imageAlt }: Readonly<DescriptionPlaceholderProps>) => {
  return (
    <Box sx={styles.root} data-testid="OpusDetails-placeholder">
      <Box sx={styles.imageWrapper}>
        <Image
          src="/images/cat_coming_soon.svg"
          alt={imageAlt}
          width={252}
          height={133}
          style={{ width: '100%', height: 'auto' }}
        />
      </Box>

      <Typography component="p" sx={styles.title}>
        {title}
      </Typography>

      <Typography component="p" sx={styles.subtitle}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default DescriptionPlaceholder;
