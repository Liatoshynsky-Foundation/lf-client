'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';

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
}

const Carousel = ({ images, initialIndex = 0 }: CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);
  // NOSONAR_START
  // const [isDragging, setIsDragging] = useState(false);
  // const [touchStartX, setTouchStartX] = useState(0);
  // const [dragOffset, setDragOffset] = useState(0);
  // NOSONAR_END

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

  // NOSONAR_START
  // const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  //   setTouchStartX(e.touches[0].clientX || 0);
  //   setIsDragging(true);
  // };

  // const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  //   if (!isDragging) return;
  //   const currentX = e.touches[0].clientX || 0;
  //   setDragOffset(currentX - touchStartX);
  // };

  // const handleTouchEnd = () => {
  //   if (Math.abs(dragOffset) > 50) {
  //     if (dragOffset > 0) {
  //       if (infiniteLoop || !isFirstSlide) goToPrev();
  //     } else {
  //       if (infiniteLoop || !isLastSlide) goToNext();
  //     }
  //   }
  //   setIsDragging(false);
  //   setDragOffset(0);
  // };

  // const handleKey = useCallback(
  //   (e: { key: string }) => {
  //     if (e.key === 'ArrowRight') goToNext();
  //     if (e.key === 'ArrowLeft') goToPrev();
  //   },
  //   [goToNext, goToPrev]
  // );

  // useEffect(() => {
  //   document.addEventListener('keydown', handleKey);
  //   return () => document.removeEventListener('keydown', handleKey);
  // }, [handleKey]);
  // NOSONAR_END

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
                    onClick={() => handleImageClick(index)}
                    // NOSONAR_START
                    // onTouchStart={handleTouchStart}
                    // onTouchMove={handleTouchMove}
                    // onTouchEnd={handleTouchEnd}
                    // NOSONAR_END
                    sx={styles.getImageContainerStyles(isActive, index, activeIndex)}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        ...styles.styledImageStyles
                      }}
                    >
                      <Image src={image.src} alt={image.alt} loading="lazy" fill />
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {images[activeIndex]?.description && (
              <Box key={images[activeIndex].description} sx={styles.getCaptionStyles()} data-testid="carousel-caption">
                <Typography variant="caption">{images[activeIndex].description}</Typography>
              </Box>
            )}

            <Box sx={styles.getArrowContainerStyles('left', isFirstSlide)}>
              <ArrowCarousel direction="left" onClick={goToPrev} disabled={isFirstSlide} />
            </Box>

            <Box sx={styles.getArrowContainerStyles('right', isLastSlide)}>
              <ArrowCarousel direction="right" onClick={goToNext} disabled={isLastSlide} />
            </Box>

            <Box sx={styles.dotsContainerStyles}>
              {images.map((image, index) => (
                <Box
                  key={`dot-${image.id}`}
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
