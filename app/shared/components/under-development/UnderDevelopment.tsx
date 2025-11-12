import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import React from 'react';

import Button from '../design-system/all-components/button/Button';
import PaperComponent from '../paper-component/PaperComponent';
import { styles } from './UnderDevelopment.styles';

import ColoredLayout from '~/layouts/colored-layout/ColoredLayout';

const UnderDevelopment: React.FC = () => {
  const t = useTranslations('underDevelopment');

  return (
    <ColoredLayout sx={styles.container} wrapperSx={styles.wrapper}>
      <PaperComponent sx={styles.paper} childrenSx={styles.paperChildren}>
        <Box sx={styles.contentBox}>
          <Box sx={styles.logoWrapper}>
            <Box sx={styles.logoBox}>
              <Image
                src="/images/dark-logo.svg"
                alt="logo"
                width={214}
                height={90}
                priority
                style={{ width: '100%', height: 'auto' }}
              />
            </Box>
          </Box>

          <Typography component="h1" variant="h4" sx={styles.title}>
            {t('title')}
          </Typography>

          <Typography sx={styles.subtitle}>{t('subtitle')}</Typography>

          <Link href="/" passHref>
            <Button variant="contained" size="large" color="tertiary" sx={styles.button}>
              {t('button')}
            </Button>
          </Link>
        </Box>
      </PaperComponent>
    </ColoredLayout>
  );
};

export default UnderDevelopment;
