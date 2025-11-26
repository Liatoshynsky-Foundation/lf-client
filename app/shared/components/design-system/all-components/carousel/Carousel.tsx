'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';

import ArrowCarousel from '~/ds-components/arrow-carousel/ArrowCarousel';

import { styles } from './Carousel.styles';

interface Image {
  id: number;
  src: string;
  alt: string;
  description?: string;
}

interface CarouselProps {
  images: Image[];
  initialIndex?: number;
  infiniteLoop?: boolean;
}

const Carousel = ({ images, initialIndex = 0, infiniteLoop = false }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === images.length - 1;

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

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX || 0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentX = e.touches[0].clientX || 0;
    setDragOffset(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (Math.abs(dragOffset) < 50) return;
    if (dragOffset > 0) {
      if (infiniteLoop || !isFirstSlide) goToPrev();
    }
    if (dragOffset < 0) {
      if (infiniteLoop || !isLastSlide) goToNext();
    }

    setDragOffset(0);
  };

  const handleKey = useCallback(
    (e: { key: string }) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    },
    [goToNext, goToPrev]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <Box data-testid="carousel">
      <Box sx={styles.carouselTrackStyles}>
        {images.map((image, index) => {
          const isActive = index === activeIndex;
          return (
            <Box
              key={image.id}
              data-testid={`carousel-image-${index}`}
              data-active={isActive}
              onClick={() => handleImageClick(index)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              sx={styles.getImageWrapperStyles(index, activeIndex, isActive)}
            >
              <Image src={image.src} alt={image.alt} style={{ objectFit: 'cover' }} loading="lazy" fill />
            </Box>
          );
        })}
        <Box sx={styles.getArrowContainerStyles('left', isFirstSlide)}>
          <ArrowCarousel direction="left" onClick={goToPrev} disabled={isFirstSlide} />
        </Box>
        <Box sx={styles.getArrowContainerStyles('right', isLastSlide)}>
          <ArrowCarousel direction="right" onClick={goToNext} disabled={isLastSlide} />
        </Box>
      </Box>
      <Box sx={styles.carouselFooterStyles}>
        <Box key={images[activeIndex].description} sx={styles.captionStyles} data-testid="carousel-caption">
          <Typography variant="caption">{images[activeIndex]?.description}</Typography>
        </Box>
        <Box sx={styles.dotsContainerStyles}>
          {images.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <Box
                key={`dot-${image.id}`}
                data-testid={`carousel-dot-${index}`}
                data-active={isActive}
                sx={styles.getDotStyles(isActive)}
                onClick={() => goToSlide(index)}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;
