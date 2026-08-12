'use client';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import ArrowCarousel from '~/ds-components/arrow-carousel/ArrowCarousel';

import { styles } from './Carousel.styles';

import { CropRect } from '~/lib/utils/cropUtils';
import CroppedImage from '~/shared/components/cropped-image/CroppedImage';

interface CarouselImage {
  crop?: { rect: CropRect } | CropRect | null;
  id: string | number;
  src: string;
  alt: string;
  description?: string;
}

interface CarouselProps {
  images: CarouselImage[];
  initialIndex?: number;
  infiniteLoop?: boolean;
}

const Carousel = ({ images, initialIndex = 0, infiniteLoop = false }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => {
      if (infiniteLoop) {
        return (prev + 1) % images.length;
      }
      return prev < images.length - 1 ? prev + 1 : prev;
    });
  }, [images.length, infiniteLoop]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (infiniteLoop) {
        return (prev - 1 + images.length) % images.length;
      }
      return prev > 0 ? prev - 1 : prev;
    });
  }, [images.length, infiniteLoop]);

  const isFirstSlide = !infiniteLoop && activeIndex === 0;
  const isLastSlide = !infiniteLoop && activeIndex === images.length - 1;

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

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.targetTouches?.[0]) {
      setTouchStartX(e.targetTouches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX !== null && e.targetTouches?.[0]) {
      const currentTouchX = e.targetTouches[0].clientX;
      setDragOffset(currentTouchX - touchStartX);
    }
  };

  const handleTouchEnd = () => {
    if (dragOffset > 50) {
      if (infiniteLoop || activeIndex > 0) {
        goToPrev();
      }
    } else if (dragOffset < -50) {
      if (infiniteLoop || activeIndex < images.length - 1) {
        goToNext();
      }
    }

    setDragOffset(0);
    setTouchStartX(0);
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
              <CroppedImage src={image.src} alt={image.alt} crop={image.crop} fill={true} />
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
        <Box key={images[activeIndex]?.description} sx={styles.captionStyles} data-testid="carousel-caption">
          <Typography sx={styles.captionStyles} variant="customItalic14">
            {images[activeIndex]?.description}
          </Typography>
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
