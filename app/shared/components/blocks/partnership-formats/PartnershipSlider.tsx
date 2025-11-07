'use client';

import { Box } from '@mui/material';
import React, { useRef, useState } from 'react';

import CardWithText from '~/ds-components/card-with-text/CardWithText';
import ImageWithBorder from '~/ds-components/image-with-border/ImageWithBorder';

import { sliderStyles } from './PartnershipSlider.styles';

interface PartnershipCard {
  icon?: string;
  title: string;
  list: string[];
}

interface PartnershipImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  borderWidth?: number;
}

interface SlideItem {
  type: 'card' | 'image';
  card?: PartnershipCard;
  image?: PartnershipImage;
}

interface PartnershipSliderProps {
  slides: SlideItem[];
}

const PartnershipSlider: React.FC<PartnershipSliderProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  //   const goToSlide = (index: number) => {
  //     if (index >= 0 && index < slides.length) {
  //       setCurrentSlide(index);
  //     }
  //   };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextSlide();
    }
    if (isRightSwipe) {
      goToPrevSlide();
    }
  };

  const renderSlideContent = (slide: SlideItem) => {
    if (slide.type === 'card' && slide.card) {
      return (
        <Box sx={sliderStyles.cardWrapper}>
          <CardWithText icon={slide.card.icon} title={slide.card.title} list={slide.card.list} />
        </Box>
      );
    }

    if (slide.type === 'image' && slide.image) {
      return (
        <Box sx={sliderStyles.imageWrapper}>
          <ImageWithBorder image={slide.image.src} alt={slide.image.alt} borderWidth={8} />
        </Box>
      );
    }

    return null;
  };

  return (
    <Box sx={sliderStyles.container}>
      <Box
        ref={sliderRef}
        sx={sliderStyles.sliderWrapper}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Box
          sx={{
            ...sliderStyles.slidesContainer,
            transform: `translateX(-${currentSlide * 100}%)`
          }}
        >
          {slides.map((slide, index) => (
            <Box key={index} sx={sliderStyles.slide}>
              {renderSlideContent(slide)}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Slider dots */}

      {/* <Box sx={sliderStyles.indicators}>
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              ...sliderStyles.indicator,
              ...(index === currentSlide ? sliderStyles.indicatorActive : {})
            }}
          />
        ))}
      </Box> */}
    </Box>
  );
};

export default PartnershipSlider;
