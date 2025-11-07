'use client';

import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import DesktopNav from './dekstop-nav/DesktopNav';
import MobileMenuOverlay from './mobile-nav/mobile-overlay/MobileMenuOverlay';
import MobileNav from './mobile-nav/MobileNav';
import type { ScrollDirection } from '~/types/types/common.types';

import type { NavigationDTO } from '~/domain/dto/navigation.dto';

interface NavigationBarProps {
  navLabels: NavigationDTO[];
  specialNav: NavigationDTO | null;
  scrollDirection: ScrollDirection;
}

const NavigationBar = ({ navLabels, specialNav, scrollDirection }: NavigationBarProps) => {
  const { isDesktop } = useBreakpoints();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <CircularProgress />;
  }

  return (
    <>
      {isDesktop ? (
        <DesktopNav navLabels={navLabels} specialNav={specialNav} scrollDirection={scrollDirection} />
      ) : (
        <MobileNav isOpen={isMobileMenuOpen} onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      )}

      <MobileMenuOverlay open={isMobileMenuOpen && !isDesktop} />
    </>
  );
};

export default NavigationBar;
