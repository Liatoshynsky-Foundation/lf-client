'use client';
import { Box, Link, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useIsMobile } from '~/hooks/is-mobile/useIsMobile';

import { styles } from './FooterContactInfo.styles';

interface FooterContactInfoProps {
  alertMsg: string;
  labels: {
    phoneLabel: string;
  };
  contacts: {
    foundationName: string;
    address: string;
    phone: string;
    email: string;
  };
}

const FooterContactInfo: FC<FooterContactInfoProps> = ({ contacts, labels, alertMsg }) => {
  const isMobile = useIsMobile();

  const copyPhoneToClipboard = () => {
    navigator.clipboard.writeText(contacts.phone);
    alert(alertMsg);
  };

  const telLinkProps = isMobile ? { href: `tel:${contacts.phone}` } : { onClick: copyPhoneToClipboard, href: '#' };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleAndAddressCont}>
        <Typography sx={styles.title}>{contacts.foundationName}</Typography>
        <Box sx={styles.linkContainer}>
          <Typography sx={styles.text}>{contacts.address}</Typography>
        </Box>
      </Box>
      <Box>
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
