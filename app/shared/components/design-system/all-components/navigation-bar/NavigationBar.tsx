'use client';

import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';

import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import DesktopNav from './dekstop-nav/DesktopNav';
import MobileNav from './mobile-nav/MobileNav';
import type { contactsData, LinkIcon, ScrollDirection } from '~/types/types/common.types';

import type { NavigationDTO } from '~/domain/dto/navigation.dto';

interface NavigationBarProps {
  navLabels: NavigationDTO[];
  specialNav: NavigationDTO | null;
  scrollDirection: ScrollDirection;
  contacts: contactsData;
  socialLinks: LinkIcon[];
}

const NavigationBar = ({ navLabels, specialNav, scrollDirection, contacts, socialLinks }: NavigationBarProps) => {
  const { isDesktop } = useBreakpoints();
  const [isMounted, setIsMounted] = useState(false);

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
        <MobileNav navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />
      )}
    </>
  );
};

export default NavigationBar;
