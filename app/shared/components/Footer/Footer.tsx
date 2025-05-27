import { Box } from '@mui/material';
import React from 'react';
import FooterCopyrights from '~/shared/components/Footer/FooterCopyrights/FooterCopyrights';
import FooterContactInfo from '~/shared/components/Footer/FooterContactInfo/FooterContactInfo';
import { getTranslations } from 'next-intl/server';

const contacts = {
  title: 'ГРОМАДСЬКА ОРГАНІЗАЦІЯ \n«ФУНДАЦІЯ ЛЯТОШИНСЬКОГО»',
  phone: '067 963 8366',
  email: 'liatoshynsky@gmail.com',
};

export default async function Footer() {
  const t = await getTranslations('footer');

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