import { Box } from '@mui/material';
import React from 'react';
import FooterCopyrights from './FooterCopyrights/FooterCopyrights';

export const footerData = {
  text: '© 2025 Liotoshynsky Foundation. Всі права захищені.',
  links: [
    { label: 'Політика конфіденційності', href: '/privacy' },
    { label: 'Умови користування сайтом', href: '/terms' },
    { label: 'Інформація для медіа / партнерів', href: '/media' },
  ],
};

<FooterCopyrights text={footerData.text} links={footerData.links} />;
export default function Footer() {
  return (
    <Box component="footer">
      <FooterCopyrights text={footerData.text} links={footerData.links} />
    </Box>
  );
}
