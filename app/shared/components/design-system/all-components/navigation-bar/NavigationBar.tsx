'use client';

import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import DesktopNav from './dekstop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';
import type { ScrollDirection } from '~/types/types/common.types';

import type { NavigationDTO } from '~/domain/dto/navigation.dto';

const NavigationBar = ({
  navLabels,
  specialNav,
  scrollDirection
}: {
  navLabels: NavigationDTO[];
  specialNav: NavigationDTO | null;
  scrollDirection: ScrollDirection;
}) => {
  const { isDesktop } = useBreakpoints();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <CircularProgress />;
  }

  return isDesktop ? (
    <DesktopNav navLabels={navLabels} specialNav={specialNav} scrollDirection={scrollDirection} />
  ) : (
    <MobileNav />
  );
};

export default NavigationBar;
