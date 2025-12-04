'use client';

import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

type BreakpointsState = {
  isDesktop: boolean;
  isLaptopAndAbove: boolean;
  isLaptop: boolean;
  isTablet: boolean;
  isMobile: boolean;
};

const useBreakpoints = (): BreakpointsState => {
  const theme = useTheme();

  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(globalThis.innerWidth);
    };

    handleResize();
    globalThis.addEventListener('resize', handleResize);

    return () => globalThis.removeEventListener('resize', handleResize);
  }, []);

  const values = theme.breakpoints.values;

  const isDesktop = width !== null && width >= values.lg;
  const isLaptopAndAbove = width !== null && width >= values.md;
  const isLaptop = width !== null && width >= values.md && width < values.lg;
  const isTablet = width !== null && width >= values.sm && width < values.md;
  const isMobile = width !== null && width < values.sm;

  return { isDesktop, isLaptopAndAbove, isLaptop, isTablet, isMobile };
};

export default useBreakpoints;
