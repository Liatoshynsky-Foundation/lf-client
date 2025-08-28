import { Button } from '@mui/material';
import Image from 'next/image';

import { styles } from './MobileNav.styles';

const MobileNav = () => (
  <Button sx={styles.iconButton} variant="text" color="primary" size="medium">
    <Image src="/icons/menu-button.svg" alt="Menu" width={40} height={24} />
  </Button>
);

export default MobileNav;
