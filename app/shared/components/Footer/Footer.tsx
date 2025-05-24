import { Box } from '@mui/material';
import React from 'react';
import FooterCopyrights from '~/shared/components/Footer/FooterCopyrights/FooterCopyrights';
import FooterContactInfo from '~/shared/components/Footer/FooterContactInfo/FooterContactInfo';
import { Locale } from "~/lib/i18n";
import {getTranslations} from "~/lib/i18n";



const contacts = {
  title: 'ГРОМАДСЬКА ОРГАНІЗАЦІЯ \n«ФУНДАЦІЯ ЛЯТОШИНСЬКОГО»',
  phone: '067 963 8366',
  email: 'liatoshynsky@gmail.com',
};

interface FooterProps {
  lang: Locale;
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
      <FooterContactInfo contacts={contacts} />
      <FooterCopyrights text={footerData.text} links={footerData.links} />
    </Box>
  );
}