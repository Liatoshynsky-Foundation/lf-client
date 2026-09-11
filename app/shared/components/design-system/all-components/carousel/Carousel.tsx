'use client';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';

import ArrowCarousel from '~/ds-components/arrow-carousel/ArrowCarousel';

import { styles } from './Carousel.styles';

import { CropRect } from '~/lib/utils/cropUtils';
import CroppedImage from '~/shared/components/cropped-image/CroppedImage';
import { isValidUrl } from '~/shared/utils/isValidUrl';

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
  const [failedImageIds, setFailedImageIds] = useState<Set<string | number>>(new Set());

  const validImages = React.useMemo(() => {
    return (images || []).filter((img) => isValidUrl(img.src) && !failedImageIds.has(img.id));
  }, [images, failedImageIds]);

  const [activeIndex, setActiveIndex] = useState(initialIndex ?? 0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handleImageError = useCallback((id: string | number) => {
    setFailedImageIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  useEffect(() => {
    if (validImages.length > 0 && activeIndex >= validImages.length) {
      setActiveIndex(validImages.length - 1);
    }
  }, [validImages.length, activeIndex]);

  const total = validImages.length;

  const goToNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => {
      if (infiniteLoop) {
        return (prev + 1) % total;
      }
      return prev < total - 1 ? prev + 1 : prev;
    });
  }, [total, infiniteLoop]);

  const goToPrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => {
      if (infiniteLoop) {
        return (prev - 1 + total) % total;
      }
      return prev > 0 ? prev - 1 : prev;
    });
  }, [total, infiniteLoop]);

  const isFirstSlide = !infiniteLoop && activeIndex === 0;
  const isLastSlide = !infiniteLoop && activeIndex === validImages.length - 1;

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
      if (infiniteLoop || activeIndex < validImages.length - 1) {
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

  if (validImages.length === 0) {
    return null;
  }

  return (
    <Box data-testid="carousel">
      <Box sx={styles.carouselTrackStyles}>
        {validImages.map((image, index) => {
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
              <CroppedImage
                src={image.src}
                alt={image.alt}
                crop={image.crop}
                fill={true}
                onError={() => handleImageError(image.id)}
              />
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
        <Box key={validImages[activeIndex]?.description} sx={styles.captionStyles} data-testid="carousel-caption">
          <Typography sx={styles.captionStyles} variant="customItalic14">
            {validImages[activeIndex]?.description}
          </Typography>
        </Box>
        <Box sx={styles.dotsContainerStyles}>
          {validImages.map((image, index) => {
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
