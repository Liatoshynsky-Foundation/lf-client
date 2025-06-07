import { Box, Link, Typography } from '@mui/material';
import React from 'react';

import { styles } from '~/components/Footer/FooterCopyrights/FooterCopyrights.styles';

type LinkItem = {
  label: string;
  href: string;
};

interface FooterCopyrightsProps {
  text: string;
  links: LinkItem[];
}

const FooterCopyrights = ({ text, links }: FooterCopyrightsProps) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text}>{text}</Typography>
      <Box component="ul" sx={styles.linkList}>
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} sx={styles.link}>
              {link.label}
            </Link>
          </li>
        ))}
      </Box>
    </Box>
  );
};

export default FooterCopyrights;
