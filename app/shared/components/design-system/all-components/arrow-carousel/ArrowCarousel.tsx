'use client';

import { Box } from '@mui/material';
import React from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { styles } from './ArrowCarousel.styles';

import ChevronLeft from '~/public/icons/chevron-left.svg';
import ChevronRight from '~/public/icons/chevron-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';

interface ArrowCarouselProps {
  direction: 'left' | 'right';
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ArrowCarousel: React.FC<ArrowCarouselProps> = ({ direction, onClick, disabled = false, ...props }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <Box>
      <IconButton
        onClick={onClick}
        aria-label={`${direction === 'left' ? 'Previous' : 'Next'} slide`}
        disabled={disabled}
        sx={{
          ...styles.iconButton,
          ...(direction === 'left' ? { pr: '12px' } : { pl: '12px' })
        }}
        {...props}
      >
        <Svg
          Component={Icon}
          alt={direction === 'left' ? 'Previous' : 'Next'}
          stroke="rgba(252, 252, 252, 1)"
          width="48px"
          height="48px"
        />
      </IconButton>
    </Box>
  );
};

export default ArrowCarousel;
