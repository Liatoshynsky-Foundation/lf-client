'use client';
import { Box, Link, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useIsMobile } from '~/hooks/is-mobile/useIsMobile';

import { styles } from './FooterContactInfo.styles';

interface FooterContactInfoProps {
  labels: {
    addressLabel: string;
    phoneLabel: string;
  };
  contacts: {
    foundationName: string;
    address: string;
    phone: string;
    email: string;
  };
}

const FooterContactInfo: FC<FooterContactInfoProps> = ({ contacts, labels }) => {
  const isMobile = useIsMobile();

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(contacts.phone);
    alert('Номер телефону скопійовано до буферу обміну');
  };

  const telLinkProps = isMobile ? { href: `tel:${contacts.phone}` } : { onClick: copyPhoneToClipboard, href: '#' };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.title}>{contacts.foundationName}</Typography>
      <Box>
        <Box sx={styles.linkContainer}>
          <Typography sx={styles.weakText}>{labels.addressLabel}:</Typography>
          <Typography sx={styles.text}>{contacts.address}</Typography>
        </Box>
        <Box sx={styles.linkContainer}>
          <Typography sx={styles.weakText}>{labels.phoneLabel}:</Typography>
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
