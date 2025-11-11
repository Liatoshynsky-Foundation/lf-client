'use client';
import { Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { styles } from './ArrowCarousel.styles';

interface ArrowCarouselProps {
  direction: 'left' | 'right';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ArrowCarousel: React.FC<ArrowCarouselProps> = ({ direction, onClick, disabled = false, ...props }) => {
  const arrowLeft = '/icons/chevron-left.svg';
  const arrowRight = '/icons/chevron-right.svg';
  const Icon = (
    <Image
      src={direction === 'left' ? arrowLeft : arrowRight}
      alt={direction === 'left' ? 'Previous' : 'Next'}
      width={16}
      height={32}
    />
  );
  return (
    <Box>
      <IconButton
        onClick={onClick}
        aria-label={`${direction === 'left' ? 'Previous' : 'Next'} slide`}
        disabled={disabled}
        sx={{ ...styles.iconButton, ...(direction === 'left' ? { pr: '12px' } : { pl: '12px' }) }}
        {...props}
      >
        {Icon}
      </IconButton>
    </Box>
  );
};

export default ArrowCarousel;
