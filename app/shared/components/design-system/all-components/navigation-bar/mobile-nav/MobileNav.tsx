import { Button } from '@mui/material';
import Image from 'next/image';

import { styles } from './MobileNav.styles';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

const MobileNav = () => {
  const { isMobile } = useBreakpoints();

  return (
    <Button sx={styles.iconButton(isMobile)} variant="text" color="primary" size="medium">
      <Image src="/icons/menu-button.svg" alt="Menu" width={40} height={24} />
    </Button>
  );
};

export default MobileNav;
