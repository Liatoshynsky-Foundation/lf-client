'use client';
import React from 'react';
import type { Swiper as SwiperType } from 'swiper';

import type { BaseCardProps } from '~/ds-components/base-card/BaseCard';
import BaseCard from '~/ds-components/base-card/BaseCard';

import { styles } from './ContentSlider.styles';

import { BaseSlider } from '~/shared/components/base-slider';

export interface ContentSliderProps {
  cards: Omit<BaseCardProps, 'variant'>[];
  variant?: 'news' | 'press';
  prevLabel: string;
  nextLabel: string;
}

type ContentSliderCard = Omit<BaseCardProps, 'variant'>;

const sliderBreakpoints = {
  600: { slidesPerView: 1.5, spaceBetween: 24 },
  900: { slidesPerView: 2.2, spaceBetween: 40 },
  1200: { slidesPerView: 3, spaceBetween: 40 }
};

export const ContentSlider: React.FC<ContentSliderProps> = ({ cards, variant = 'news', prevLabel, nextLabel }) => {
  const swiperRef = React.useRef<SwiperType | null>(null);

  const renderCard = (card: ContentSliderCard): React.ReactNode => (
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
  );

  const getCardKey = (card: ContentSliderCard): string => card.href;

  const handleSwiper = (swiper: SwiperType): void => {
    swiperRef.current = swiper;
  };

  const handleSlideFocus = (index: number): void => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <BaseSlider<ContentSliderCard>
      items={cards}
      renderItem={renderCard}
      getItemKey={getCardKey}
      slidesPerView={1.2}
      spaceBetween={40}
      breakpoints={sliderBreakpoints}
      containerSx={styles.sliderContainer}
      navContainerSx={styles.navigationContainer}
      prevLabel={prevLabel}
      nextLabel={nextLabel}
      onSwiper={handleSwiper}
      onSlideFocus={handleSlideFocus}
    />
  );
};
