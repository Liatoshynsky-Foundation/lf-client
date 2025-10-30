'use client';

import { Svg } from '~/components/colored-svg/ColoredSvg';
import Button from '~/ds-components/button/Button';
import { rgbaClearFilterButton } from '~/ds-components/theme/colors';

import { styles } from './ClearFilterButton.styles';

import TrashIcon from '~/public/icons/trash-2.svg';

interface ClearFilterButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function ClearFilterButton({ onClick, children }: ClearFilterButtonProps) {
  return (
    <Button
      variant="text"
      startIcon={<Svg Component={TrashIcon} alt="clear" stroke={rgbaClearFilterButton.defaultTextColor} />}
      onClick={onClick}
      sx={styles.button}
    >
      {children}
    </Button>
  );
}
