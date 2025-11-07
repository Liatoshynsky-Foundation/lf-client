import { Button } from '@mui/material';

import { styles } from './MobileNav.styles';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileNav = ({ isOpen, onToggle }: MobileNavProps) => {
  const { isMobile } = useBreakpoints();

  return (
    <Button
      onClick={onToggle}
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
  );
};

export default MobileNav;
