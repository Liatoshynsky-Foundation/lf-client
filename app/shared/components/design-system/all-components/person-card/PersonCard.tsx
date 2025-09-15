'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';

import { styles } from './PersonCard.styles';

interface PersonCardProps {
  imgURL: string;
  name: string;
  description: string;
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = '/images/light-logo.svg';

const PersonCard: React.FC<PersonCardProps> = ({ imgURL, name, description, fallbackSrc = DEFAULT_FALLBACK }) => {
  const [src, setSrc] = useState<string>(imgURL);
  const [failed, setFailed] = useState(false);

  const handleError = () => {
    if (!failed) {
      setFailed(true);
      setSrc(fallbackSrc);
    }
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.photoWrapper}>
        <Image
          alt={name}
          src={src}
          width={185}
          height={166}
          style={{ ...styles.image, objectFit: failed ? 'contain' : 'cover' }}
          onError={handleError}
          loading="lazy"
        />
      </Box>
      <Box sx={styles.textWrapper}>
        <Typography sx={styles.name}>{name}</Typography>
        <Typography sx={styles.description}>{description}</Typography>
      </Box>
    </Box>
  );
};

export default PersonCard;
