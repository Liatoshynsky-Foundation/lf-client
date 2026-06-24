'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import { Box, SxProps, Theme } from '@mui/material';
import React, { useId } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AutoplayOptions, SwiperModule, SwiperOptions } from 'swiper/types';

import { baseSliderStyles } from './BaseSlider.styles';
import { sxToArray } from '~/utils/sxToArray';

interface CommonBaseSliderProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T, index: number) => string;
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  breakpoints?: SwiperOptions['breakpoints'];
  loop?: boolean;
  speed?: number;
  autoplay?: AutoplayOptions | false;
  containerSx?: SxProps<Theme>;
  navContainerSx?: SxProps<Theme>;
  navButtonSx?: SxProps<Theme>;
  swiperStyle?: React.CSSProperties;
  slideStyle?: React.CSSProperties;
  onSwiper?: (swiper: SwiperType) => void;
  onSlideFocus?: (index: number) => void;
  dataTestId?: string;
}

interface NavigationOnProps {
  showNavigation?: true;
  prevLabel: string;
  nextLabel: string;
}

interface NavigationOffProps {
  showNavigation: false;
  prevLabel?: never;
  nextLabel?: never;
}

export type BaseSliderProps<T> = CommonBaseSliderProps<T> & (NavigationOnProps | NavigationOffProps);

export const BaseSlider = <T,>(props: BaseSliderProps<T>): React.ReactElement => {
  const {
    items,
    renderItem,
    getItemKey,
    slidesPerView = 1.2,
    spaceBetween = 40,
    breakpoints,
    loop = false,
    speed,
    autoplay,
    showNavigation = true,
    containerSx,
    navContainerSx,
    navButtonSx,
    swiperStyle,
    slideStyle,
    onSwiper,
    onSlideFocus,
    dataTestId
  } = props;

  const reactId = useId().replaceAll(':', '');
  const prevClass = `base-slider-prev-${reactId}`;
  const nextClass = `base-slider-next-${reactId}`;

  const modules: SwiperModule[] = [];

  if (showNavigation) modules.push(Navigation);

  if (autoplay) modules.push(Autoplay);

  return (
    <Box data-testid={dataTestId} sx={[baseSliderStyles.container, ...sxToArray(containerSx)]}>
      {showNavigation && (
        <Box sx={[baseSliderStyles.navContainer, ...sxToArray(navContainerSx)]}>
          <Box
            component="button"
            type="button"
            aria-label={props.prevLabel}
            className={prevClass}
            sx={[baseSliderStyles.navButton, ...sxToArray(navButtonSx)]}
          >
            <Box component="img" src="/icons/arrow-left.svg" alt="" sx={baseSliderStyles.navIcon} />
          </Box>
          <Box
            component="button"
            type="button"
            aria-label={props.nextLabel}
            className={nextClass}
            sx={[baseSliderStyles.navButton, ...sxToArray(navButtonSx)]}
          >
            <Box component="img" src="/icons/arrow-right.svg" alt="" sx={baseSliderStyles.navIcon} />
          </Box>
        </Box>
      )}

      <Swiper
        modules={modules}
        navigation={showNavigation ? { prevEl: `.${prevClass}`, nextEl: `.${nextClass}` } : false}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        loop={loop}
        speed={speed}
        autoplay={autoplay ?? false}
        style={swiperStyle}
        onSwiper={onSwiper}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={getItemKey(item, index)}
            style={slideStyle}
            onFocusCapture={onSlideFocus ? () => onSlideFocus(index) : undefined}
          >
            {renderItem(item, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
