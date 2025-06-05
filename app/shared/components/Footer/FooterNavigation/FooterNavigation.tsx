import { Box, Link, Typography } from '@mui/material';
import React, { FC } from 'react';

import { styles } from './FooterNavigation.styles';

type LinkItem = {
  label: string;
  href: string;
};

type Section = {
  title: string;
  links: LinkItem[];
};

interface FooterNavigationProps {
  sections: Section[];
}

const FooterNavigation: FC<FooterNavigationProps> = ({ sections }) => {
  return (
    <Box sx={styles.footer}>
      {sections.map((section) => (
        <Box key={section.title} sx={styles.column}>
          <Typography sx={styles.heading}>{section.title}</Typography>
          <Box component="ul" sx={styles.list}>
            {section.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} sx={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default FooterNavigation;
