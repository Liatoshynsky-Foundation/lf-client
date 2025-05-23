import { Box } from '@mui/material';
import React from 'react';
import FooterCopyrights from '~/components/Footer/FooterCopyrights/FooterCopyrights';
import FooterContactInfo from '~/components/Footer/FooterContactInfo/FooterContactInfo';

export const footerData = {
  text: '© 2025 Liotoshynsky Foundation. Всі права захищені.',
  links: [
    { label: 'Політика конфіденційності', href: '/privacy' },
    { label: 'Умови користування сайтом', href: '/terms' },
    { label: 'Інформація для медіа / партнерів', href: '/media' },
  ],
};

const contacts = {
  title: 'ГРОМАДСЬКА ОРГАНІЗАЦІЯ \n«ФУНДАЦІЯ ЛЯТОШИНСЬКОГО»',
  phone: '067 963 8366',
  email: 'liatoshynsky@gmail.com',
};

export default function Footer() {
  return (
    <Box component="footer">
      <FooterContactInfo contacts={contacts} />
      <FooterCopyrights text={footerData.text} links={footerData.links} />
    </Box>
  );
}