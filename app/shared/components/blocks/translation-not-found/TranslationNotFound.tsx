import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import PaperComponent from '~/components/paper-component/PaperComponent';

import Button from '../../design-system/all-components/button/Button';
import { styles } from './TranslationNotFound.styles';

export default function TranslationNotFound() {
  return (
    <PaperComponent childrenSx={styles.container} sx={styles.wrapper}>
      <Box sx={styles.imageContainer}>
        <Image alt="filimon-translator" src="/images/filimon-translator.png" layout="fill" objectFit="contain" />
      </Box>
      <Typography variant="customBold48">CoMing SoOn</Typography>
      <Typography variant="customMedium16">
        Our archive cat Filimon has taken on a new role — translator. He’s working on this page, so the English version
        will appear very soon.
      </Typography>
      <Button variant="contained" color="tertiary">
        Return to Ukrainian
      </Button>
    </PaperComponent>
  );
}
