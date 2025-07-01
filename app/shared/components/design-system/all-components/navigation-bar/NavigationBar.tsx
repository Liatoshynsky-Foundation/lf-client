'use client';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import DesktopNav from './dekstop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';
import { NavLabels } from '~/types/types/navLabels';

const NavigationBar = ({ navLabels }: { navLabels: NavLabels }) => {
  const { isLaptopAndAbove } = useBreakpoints();

  return isLaptopAndAbove ? <DesktopNav navLabels={navLabels} /> : <MobileNav />;
};

export default NavigationBar;
