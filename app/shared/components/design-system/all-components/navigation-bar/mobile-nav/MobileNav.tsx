import Image from 'next/image';

import { IconButton } from '~/ds-components/icon-button/IconButton';

import { styles } from './MobileNav.styles';

const MobileNav = () => (
  <IconButton size="large" customStyles={styles?.iconButton}>
    <Image src="/icons/menu-button.svg" alt="Menu" width={40} height={24} />
  </IconButton>
);

export default MobileNav;
