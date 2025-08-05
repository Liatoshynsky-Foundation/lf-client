'use client';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';
import { Modal } from '~/ds-components/modal/Modal';

import { styles } from './CookieModal.styles';
import { PositionEnum } from '~/types/enums/common.enums';

import { Link } from '~/i18n/navigation';

export interface CookieModalProps {
  open: boolean;
  onClose: () => void;
  showPreferences: () => void;
  acceptAll: () => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({ open, onClose, showPreferences, acceptAll }) => {
  const t = useTranslations('cookie.modal');

  const renderLink = (chunks: React.ReactNode) => (
    <Link href="/privacy-policy" style={styles.link}>
      {chunks}
    </Link>
  );

  return (
    <Modal
      open={open}
      title={t('title')}
      width={520}
      height={313}
      handleClose={onClose}
      titleSx={styles.title}
      topSection={styles.topSection}
      childrenBoxSx={styles.childrenBox}
      verticalAlignment={PositionEnum.Bottom}
      horizontalAlignment={PositionEnum.Right}
      modalSx={styles.container}
    >
      <>
        <Typography variant="subtitle1">
          {t.rich('description', {
            link: renderLink
          })}
        </Typography>
        <Box sx={styles.buttonContainer}>
          <Button size="medium" variant="outlined" label={t('settingsButton')} onClick={showPreferences} />
          <Button size="medium" variant="contained" color="tertiary" label={t('acceptButton')} onClick={acceptAll} />
        </Box>
      </>
    </Modal>
  );
};
