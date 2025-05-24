import { Box } from '@mui/material';
import React from 'react';
import FooterCopyrights from './FooterCopyrights/FooterCopyrights';
import {
  Locale,
  getTranslations
} from '~/lib/i18n';


interface FooterProps {
  readonly lang: Locale;
}

export default async function Footer({
   lang
}: FooterProps) {
  const { t } = await getTranslations(lang, 'footer');

  const footerData = {
    text: t('copyright'),
    links: [
      { label: t('link_privacy'), href: '/privacy' },
      { label: t('link_terms'), href: '/terms' },
      { label: t('link_media'), href: '/media' },
    ],
  };

  return (
    <Box component="footer">
      <FooterCopyrights text={footerData.text} links={footerData.links} />
    </Box>
  );
}