import { Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import MobileMenuOverlay from './mobile-overlay/MobileMenuOverlay';
import { styles } from './MobileNav.styles';
import { contactsData, LinkIcon } from '~/types/types/common.types';

import { NavigationDTO } from '~/domain/dto/navigation.dto';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MobileNavProps {
  navLabels: NavigationDTO[];
  contacts: contactsData;
  socialLinks: LinkIcon[];
}

const MobileNav = ({ navLabels, contacts, socialLinks }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useBreakpoints();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <>
      <Button
        onClick={toggle}
        sx={styles.iconButton(isMobile)}
        className={isOpen ? 'menu opened' : 'menu'}
        aria-label="Main Menu"
        variant="text"
        color="primary"
        size="medium"
      >
        <svg
          width="40"
          height="22"
          viewBox="0 0 40 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible' }}
        >
          <rect className="line top" y="5" width="40" height="2" fill="#190D03" />
          <rect className="line bottom" y="15" width="40" height="2" fill="#190D03" />
        </svg>
      </Button>
      <MobileMenuOverlay open={isOpen} navLabels={navLabels} contacts={contacts} socialLinks={socialLinks} />
    </>
  );
};

export default MobileNav;
