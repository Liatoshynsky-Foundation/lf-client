'use client';

import { Box } from '@mui/material';
import React from 'react';

import PartnerLogo from '../../partner-logo/PartnerLogo';
import { Partner } from '../our-partners/partners.data';
import { styles } from './OurPartnersSlider.styles';

import { BaseSlider } from '~/shared/components/base-slider';

interface OurPartnersSliderProps {
  readonly partners: Partner[];
  readonly autoScroll?: boolean;
  readonly autoScrollInterval?: number;
}

const sliderBreakpoints = {
  0: { slidesPerView: 2, spaceBetween: 0 },
  600: { slidesPerView: 3, spaceBetween: 0 },
  900: { slidesPerView: 4, spaceBetween: 0 },
  1200: { slidesPerView: 5, spaceBetween: 0 }
};

export default function OurPartnersSlider({
  partners,
  autoScroll = false,
  autoScrollInterval = 3000
}: OurPartnersSliderProps): React.ReactElement | null {
  if (!partners || !partners.length) return null;

  const renderPartner = (partner: Partner): React.ReactNode => (
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
  );

  const getPartnerKey = (partner: Partner): string => partner.id;

  const autoplayConfig = autoScroll
    ? { delay: autoScrollInterval, disableOnInteraction: false, pauseOnMouseEnter: true }
    : false;

  return (
    <Box sx={styles.wrapper}>
      <BaseSlider<Partner>
        items={partners}
        renderItem={renderPartner}
        getItemKey={getPartnerKey}
        slidesPerView={5}
        spaceBetween={0}
        breakpoints={sliderBreakpoints}
        loop={true}
        speed={800}
        autoplay={autoplayConfig}
        showNavigation={false}
        containerSx={styles.sliderContainer}
        swiperStyle={styles.swiperStyle as React.CSSProperties}
        slideStyle={styles.slideStyle as React.CSSProperties}
      />
    </Box>
  );
}
