import { Paper } from '@mui/material';
import { ReactNode } from 'react';

import { IconButton } from '../design-system/all-components/icon-button/IconButton';
import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './PaperComponent.styles';

type PaperComponentProps = Readonly<{
  children: ReactNode;
  isModal: boolean;
  onClose?: () => void;
  sx?: object;
}>;

export default function PaperComponent({ children, isModal, onClose, sx }: PaperComponentProps) {
  return (
    <Paper
      sx={{
        ...styles.container,
        ...(isModal ? styles.modal : styles.block),
        ...sx
      }}
    >
      {isModal && onClose && (
        <IconButton onClick={onClose} sx={styles.icon}>
          <SvgImage src="/icons/x.svg" alt="closing modal" width={40} height={40} />
        </IconButton>
      )}
      <div style={{ transform: 'skewY(2deg)', width: '100%' }}>{children}</div>
    </Paper>
  );
}
