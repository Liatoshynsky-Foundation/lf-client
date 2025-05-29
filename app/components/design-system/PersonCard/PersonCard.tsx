import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './PersonCard.styles';
import Image from 'next/image';

interface PersonCardProps {
  imgURL: string;
  name: string;
  description: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  imgURL,
  name,
  description,
}) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.cardContent}>
        <Box sx={styles.photoWrapper}>
          <Image
            alt={name}
            src={imgURL}
            width={185}
            height={166}
            style={styles.image}
          />
        </Box>
        <Box sx={styles.textWrapper}>
          <Typography sx={styles.name}>{name}</Typography>
          <Typography sx={styles.description}>{description}</Typography>
        </Box>
      </Box>
      <Box sx={styles.logoWrapper}>
        <Box component="img" src='/images/light-logo.svg' alt="Logo" sx={styles.logo} />
      </Box>
    </Box>
  );
};

export default PersonCard;
