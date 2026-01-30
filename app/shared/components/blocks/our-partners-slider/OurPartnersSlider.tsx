'use client';

import 'swiper/css';
import { Box } from '@mui/material';
import React from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import PartnerLogo from '../../partner-logo/PartnerLogo';
import { Partner } from '../our-partners/partners.data';
import { styles } from './OurPartnersSlider.styles';

interface OurPartnersSliderProps {
  readonly partners: Partner[];
  readonly autoScroll?: boolean;
  readonly autoScrollInterval?: number;
}

export default function OurPartnersSlider({
  partners,
  autoScroll = false,
  autoScrollInterval = 3000
}: OurPartnersSliderProps) {
  if (!partners || partners.length === 0) return null;

  const sliderBreakpoints = {
    0: {
      slidesPerView: 2,
      spaceBetween: 0
    },
    600: {
      slidesPerView: 3,
      spaceBetween: 0
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 0
    },
    1200: {
      slidesPerView: 5,
      spaceBetween: 0
    }
  };

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.sliderContainer}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={5}
          loop={true}
          speed={800}
          /* eslint-disable */
          autoplay={
            autoScroll
              ? {
                  delay: autoScrollInterval,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }
              : false
          }
          breakpoints={sliderBreakpoints}
          style={styles.swiperStyle as React.CSSProperties}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id} style={styles.slideStyle as React.CSSProperties}>
              <Box sx={styles.slideItem}>
                <PartnerLogo
                  link={partner.link}
                  image={
                    <img
                      src={partner.img}
                      alt={partner.name}
                      width={200}
                      height={100}
                      style={styles.logoImage as React.CSSProperties}
                    />
                  }
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
