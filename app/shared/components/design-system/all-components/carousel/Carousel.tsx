'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

import ArrowCarousel from '~/ds-components/arrow-carousel/ArrowCarousel';

import { SIZES, styles } from './Carousel.styles';

interface Image {
  id: number;
  src: string;
  alt: string;
}

interface CarouselProps {
  images: Image[];
  title?: string;
  initialIndex?: number;
}

const Carousel = ({ images, title, initialIndex = 0 }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleImageClick = useCallback(
    (index: number) => {
      if (index !== activeIndex) {
        setActiveIndex(index);
      }
    },
    [activeIndex]
  );
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === images.length - 1;

  return (
    <Box sx={{ gridColumn: '1 / -1', position: 'relative' }}>
      <Box sx={styles.fullWidthContainerStyles}>
        <Box sx={styles.centeredCarouselWrapperStyles}>
          <Box sx={styles.carouselContainerStyles}>
            <Box sx={styles.getCarouselTrackStyles(activeIndex)}>
              {images.map((image, index) => {
                const isActive = index === activeIndex;

                return (
                  <Box
                    key={image.id}
                    data-testid={`carousel-image-${index}`}
                    data-active={isActive}
                    sx={styles.getImageContainerStyles(isActive, index, activeIndex)}
                    onClick={() => handleImageClick(index)}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        ...styles.styledImageStyles
                      }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes={isActive ? `${SIZES.activeWidth}px` : `${SIZES.inactiveWidth}px`}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {title && (
              <Box sx={styles.getCaptionStyles()}>
                <Typography variant="caption">{title}</Typography>
              </Box>
            )}

            <Box sx={styles.getArrowContainerStyles('left', isFirstSlide)}>
              <ArrowCarousel direction="left" onClick={goToPrev} disabled={isFirstSlide} />
            </Box>

            <Box sx={styles.getArrowContainerStyles('right', isLastSlide)}>
              <ArrowCarousel direction="right" onClick={goToNext} disabled={isLastSlide} />
            </Box>

            <Box sx={styles.dotsContainerStyles}>
              {images.map((_, index) => (
                <Box
                  key={`dot-${index}`}
                  data-testid={`carousel-dot-${index}`}
                  data-active={index === activeIndex}
                  sx={styles.getDotStyles(index === activeIndex)}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;
