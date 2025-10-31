import { Box, Typography } from '@mui/material';
import React from 'react';

import Button from '~/ds-components/button/Button';
import Logo from '~/ds-components/logo/Logo';

import { mainHexPallete } from '../../design-system/all-components/theme/colors';
import { styles } from './NotesConfirmModal.styles';

import Signature from '~/public/images/signature.svg';

type NotesConfirmModalProps = {
  title: string;
  subtitle: string;
  btnText: string;
};

const NotesConfirmModal = ({ title, subtitle, btnText }: NotesConfirmModalProps) => {
  return (
    <Box sx={styles.container} data-testid="NotesConfirmModal">
      <Logo color={mainHexPallete.brown[100]} variant="office" />
      <Typography sx={styles.title} variant="h2" data-testid="NotesConfirmModal-title">
        {title}
      </Typography>
      <Typography sx={styles.subtitle} data-testid="NotesConfirmModal-subtitle" variant="body2">
        {subtitle}
      </Typography>
      <Box sx={styles.signature} data-testid="NotesConfirmModal-signature">
        <Signature />
      </Box>
      <Button sx={styles.button} variant="contained" color="primary" fullWidth>
        {btnText}
      </Button>
    </Box>
  );
};

export default NotesConfirmModal;
