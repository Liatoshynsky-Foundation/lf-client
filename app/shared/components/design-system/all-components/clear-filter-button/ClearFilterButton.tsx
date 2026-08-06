import { Svg } from '~/components/colored-svg/ColoredSvg';
import Button from '~/ds-components/button/Button';

import { theme } from '../theme/Theme';
import { styles } from './ClearFilterButton.styles';

import TrashIcon from '~/public/icons/trash-2.svg';

interface ClearFilterButtonProps {
  readonly onClick: () => void;
  readonly children: React.ReactNode;
}

export default function ClearFilterButton({ onClick, children }: ClearFilterButtonProps) {
  return (
    <Button
      variant="text"
      startIcon={<Svg Component={TrashIcon} alt="" stroke={theme.palette.error.main} aria-hidden="true" />}
      onClick={onClick}
      sx={styles.button}
    >
      {children}
    </Button>
  );
}
