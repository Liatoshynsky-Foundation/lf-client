import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import styles from './FooterNavigation.module.css';

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
    <Box className={styles.footer}>
      {sections.map((section) => (
        <Box key={section.title} className={styles.column}>
          <Typography className={`${styles.heading} ${styles.mulish16Caption}`}>{section.title}</Typography>
          <ul className={styles.list}>
            {section.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} passHref legacyBehavior>
                  <a className={`${styles.link} ${styles.mulish16Regular}`}>{link.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  );
};

export default FooterNavigation;
