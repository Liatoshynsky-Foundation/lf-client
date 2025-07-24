'use client';

import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import DesktopNav from './dekstop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';
import { NavLabels } from '~/types/types/navLabels';

const NavigationBar = ({ navLabels }: { navLabels: NavLabels }) => {
  const { isLaptopAndAbove } = useBreakpoints();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <CircularProgress />;
  }

  return isLaptopAndAbove ? <DesktopNav navLabels={navLabels} /> : <MobileNav />;
};

export default NavigationBar;
