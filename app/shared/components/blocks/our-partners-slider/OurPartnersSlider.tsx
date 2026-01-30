'use client';

import { Box } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import PartnerLogo from '../../partner-logo/PartnerLogo';
import { Partner } from '../our-partners/partners.data';
import { styles } from './OurPartnersSlider.styles';

interface OurPartnersSliderProps {
  partners: Partner[];
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export default function OurPartnersSlider({
  partners,
  autoScroll = false,
  autoScrollInterval = 3000
}: OurPartnersSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  const infinitePartners = [...partners, ...partners, ...partners];

  useEffect(() => {
    if (!autoScroll || !scrollContainerRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const itemWidth = scrollContainer.scrollWidth / infinitePartners.length;

    const startAutoScroll = () => {
      autoScrollTimerRef.current = setInterval(() => {
        if (scrollContainer) {
          const currentScroll = scrollContainer.scrollLeft;
          const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const scrollAmount = itemWidth;

          if (currentScroll >= maxScroll - scrollAmount) {
            scrollContainer.scrollLeft = scrollAmount * partners.length;
          } else {
            scrollContainer.scrollLeft += scrollAmount;
          }
        }
      }, autoScrollInterval);
    };

    const stopAutoScroll = () => {
      if (autoScrollTimerRef.current) {
        clearInterval(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
    };

    startAutoScroll();

    scrollContainer.addEventListener('mouseenter', stopAutoScroll);
    scrollContainer.addEventListener('mouseleave', startAutoScroll);

    return () => {
      stopAutoScroll();
      scrollContainer.removeEventListener('mouseenter', stopAutoScroll);
      scrollContainer.removeEventListener('mouseleave', startAutoScroll);
    };
  }, [autoScroll, autoScrollInterval, partners.length, infinitePartners.length]);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.sliderContainer}>
        <Box ref={scrollContainerRef} sx={styles.scrollContainer}>
          {infinitePartners.map((partner, index) => (
            <Box key={`${partner.id}-${index}`} sx={styles.slideItem}>
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
          ))}
        </Box>
      </Box>
    </Box>
  );
}
