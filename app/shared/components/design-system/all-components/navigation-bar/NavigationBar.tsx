'use client';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import DesktopNav from './dekstop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';

const NavigationBar = () => {
  const { isLaptopAndAbove } = useBreakpoints();

  return isLaptopAndAbove ? <DesktopNav /> : <MobileNav />;
};

export default NavigationBar;
