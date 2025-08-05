'use client';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';
import { Modal } from '~/ds-components/modal/Modal';
import Switch from '~/ds-components/switch/Switch';

import { styles } from './CookiePreferencesModal.styles';
import { PositionEnum } from '~/types/enums/common.enums';

export interface CookiePreferencesModalProps {
  open: boolean;
  onClose: () => void;
  saveSettings: () => void;
  checked: boolean;
  onChecked: (value: boolean) => void;
}

export const CookiePreferencesModal: React.FC<CookiePreferencesModalProps> = ({
  open,
  onClose,
  saveSettings,
  checked = true,
  onChecked
}) => {
  const t = useTranslations('cookie.preferences');

  return (
    <Modal
      open={open}
      title={t('title')}
      width={632}
      height={399}
      handleClose={onClose}
      titleSx={styles.title}
      topSection={styles.topSection}
      childrenBoxSx={styles.childrenBox}
      verticalAlignment={PositionEnum.Bottom}
      horizontalAlignment={PositionEnum.Right}
      modalSx={styles.container}
    >
      <Box sx={styles.innerContainer}>
        <Typography sx={styles.description}>{t('description')}</Typography>
        <Box sx={styles.analyticsContainer}>
          <Typography variant="customBold16">{t('analytics')}</Typography>
          <Box sx={styles.analyticsDescriptioContainer}>
            <Typography sx={styles.analysticsDescription}>{t('analyticsDescription')}</Typography>
            <Switch checked={checked} onChange={(event) => onChecked(event.target.checked)} />
          </Box>
        </Box>
        <Box sx={styles.buttonContainer}>
          <Button size="medium" variant="outlined" onClick={() => onChecked(true)}>
            {t('selectAllButton')}
          </Button>
          <Button size="medium" variant="contained" color="tertiary" onClick={saveSettings}>
            {t('saveSettingsButton')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
