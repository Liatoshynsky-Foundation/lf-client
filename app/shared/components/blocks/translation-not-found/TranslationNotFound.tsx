'use client';

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import PaperComponent from '~/components/paper-component/PaperComponent';
import Button from '~/ds-components/button/Button';

import { styles } from './TranslationNotFound.styles';

import ColoredLayout from '~/shared/layouts/colored-layout/ColoredLayout';

interface TranslationNotFoundProps {
  redirectLocale?: 'uk' | 'en';
}

export default function TranslationNotFound({ redirectLocale = 'uk' }: Readonly<TranslationNotFoundProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('translationNotFound');

  const handleRedirect = () => {
    if (!pathname) return;
    const newPath = `/${redirectLocale}` + pathname.replace(/^\/[a-z]{2}(?:-[A-Z]{2})?(?:\/|$)/, '/');
    router.push(newPath);
  };

  return (
    <ColoredLayout
      sx={styles.layout}
      wrapperSx={styles.wrapperLayout}
      gridSx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}
    >
      <PaperComponent childrenSx={styles.container} sx={styles.wrapper}>
        <Box sx={styles.imageContainer}>
          <Image alt="filimon-translator" src="/images/filimon-translator.png" layout="fill" objectFit="contain" />
        </Box>
        <Typography variant="customBold48">{t('title')}</Typography>
        <Typography variant="customMedium16">{t('description')}</Typography>
        <Button variant="contained" color="tertiary" onClick={handleRedirect}>
          {t('button')}
        </Button>
      </PaperComponent>
    </ColoredLayout>
  );
}
