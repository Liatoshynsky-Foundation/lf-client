'use client';

import { Link } from '@mui/material';
import { useTranslations } from 'next-intl';

import { styles } from './SkipToMainContentLink.styles';

export const SkipToMainContentLink = ({ href = '#main', ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const t = useTranslations('common');

  return (
    <Link href={href} {...props} sx={styles.link}>
      {t('skipToMainContent')}
    </Link>
  );
};
