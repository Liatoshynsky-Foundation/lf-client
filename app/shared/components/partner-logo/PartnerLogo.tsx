import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { styles } from './PartnerLogo.styles';

interface PartnerLogoProps {
  link: string;
  image: React.ReactNode;
}

const PartnerLogo = ({ link, image }: PartnerLogoProps) => {
  return (
    <Box sx={styles.partnerLogo}>
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {image}
      </Link>
    </Box>
  );
};

export default PartnerLogo;
