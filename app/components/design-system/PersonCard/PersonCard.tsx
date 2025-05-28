import React from 'react';
import { Box, Typography } from '@mui/material';
import { styles } from './PersonCard.styles';
import Logo from '../../../../public/Logo.svg';
import Image from 'next/image';

interface PersonCardProps {
  photo: string;
  name: string;
  description: string;
}

const PersonCard = ({ photo, name, description }: PersonCardProps) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.cardContent}>
        <Box sx={styles.photoWrapper}>
          <Image
            alt="Person card photo"
            src={photo}
            width={185}
            height={166}
            style={{
              objectFit: 'cover',
              borderRadius: '60% 40% 60% 40% / 55% 45% 55% 45%',
              position: 'absolute',
              top: '2px',
              left: '15px',
              transform: 'rotate(25deg)',
            }}
          />
        </Box>
        <Box sx={styles.textWrapper}>
          <Typography sx={styles.name}>{name}</Typography>
          <Typography sx={styles.description}>{description}</Typography>
        </Box>
      </Box>
      <Box sx={styles.logoWrapper}>
        <Box component="img" src={Logo.src} alt="Logo" sx={styles.logo} />
      </Box>
    </Box>
  );
};

export default PersonCard;
