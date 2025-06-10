'use client';
import { Box, Link, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useIsMobile } from '~/hooks/is-mobile/useIsMobile';

import { styles } from './FooterContactInfo.styles';

interface FooterContactInfoProps {
  contacts: {
    title: string;
    phone: string;
    email: string;
  };
}

const FooterContactInfo: FC<FooterContactInfoProps> = ({ contacts }) => {
  const isMobile = useIsMobile();

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(contacts.phone);
    alert('Номер телефону скопійовано до буферу обміну');
  };

  const telLinkProps = isMobile ? { href: `tel:${contacts.phone}` } : { onClick: copyPhoneToClipboard, href: '#' };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>{contacts.title}</Typography>
      <Box>
        <Box sx={styles.linkContainer}>
          <Typography sx={styles.weakText}>Телефон: </Typography>
          <Link sx={styles.link} {...telLinkProps}>
            {contacts.phone}
          </Link>
        </Box>
        <Box sx={styles.linkContainer}>
          <Typography sx={styles.weakText}>Email: </Typography>
          <Link sx={styles.link} href={`mailto:${contacts.email}`}>
            {contacts.email}
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterContactInfo;
