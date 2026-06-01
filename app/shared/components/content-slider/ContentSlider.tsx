'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box } from '@mui/material';
import React from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { BaseCardProps } from '~/ds-components/base-card/BaseCard';
import BaseCard from '~/ds-components/base-card/BaseCard';

import { styles } from './ContentSlider.styles';

import { SvgImage } from '~/shared/components/svg-image/SvgImage';

export interface ContentSliderProps {
  cards: Omit<BaseCardProps, 'variant'>[];
  variant?: 'news' | 'press';
}

export const ContentSlider: React.FC<ContentSliderProps> = ({ cards, variant = 'news' }) => {
  return (
    <Box sx={styles.sliderContainer}>
      <Box sx={styles.navigationContainer}>
        <Box className="swiper-button-prev" sx={styles.navButton}>
          <SvgImage src="/icons/arrow-left.svg" alt="Previous" width={20} height={20} />
        </Box>
        <Box className="swiper-button-next" sx={styles.navButton}>
          <SvgImage src="/icons/arrow-right.svg" alt="Next" width={20} height={20} />
        </Box>
      </Box>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }}
        spaceBetween={40}
        slidesPerView={1.2}
        centeredSlides={false}
        breakpoints={{
          600: {
            slidesPerView: 1.5,
            spaceBetween: 24
          },
          900: {
            slidesPerView: 2.2,
            spaceBetween: 40
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 40
          }
        }}
      >
        {cards.map((card) => (
          <SwiperSlide key={card.href}>
            <BaseCard
              image={card.image}
              crop={card.crop}
              title={card.title}
              publicationDate={card.publicationDate}
              description={card.description}
              href={card.href}
              variant={variant}
              dataTestId={card.dataTestId}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
