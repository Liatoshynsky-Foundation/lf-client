import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styles } from './FooterNavigation.styles';

type LinkItem = {
  label: string;
  href: string;
};

type Section = {
  title: string;
  links: LinkItem[];
};

export const sections: Section[] = [
  {
    title: 'БОРИС ЛЯТОШИНСЬКИЙ',
    links: [
      { label: 'Життєпис', href: '/biography' },
      { label: 'Творчість', href: '/creativity' },
      { label: 'Дослідження та наукові роботи', href: '/research' }
    ]
  },
  {
    title: 'ПРО ФУНДАЦІЮ',
    links: [
      { label: 'Про нас', href: '/about' },
      { label: 'Новини', href: '/news' },
      { label: 'ЗМІ про нас', href: '/media' }
    ]
  },
  {
    title: 'СПІВПРАЦЯ',
    links: [
      { label: 'Стати партнером', href: '/become-partner' },
      { label: 'Наші партнери', href: '/partners' }
    ]
  },
  {
    title: 'МУЗЕЙ',
    links: [{ label: 'Кабінет-архів', href: '/museum' }]
  }
];

const FooterNavigation = () => {
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
