'use client';

import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

import { ContactLink } from '~/components/contact-link/ContactLink';

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
  return (
    <Box sx={styles.container}>
      <Box sx={styles.titleAndAddressCont}>
        <Typography sx={styles.title}>{contacts.foundationName}</Typography>
        <Box sx={styles.linkContainer}>
          <Typography sx={styles.text}>{contacts.address}</Typography>
        </Box>
      </Box>
      <Box>
        <ContactLink
          type="phone"
          value={contacts.phone}
          label={labels.phoneLabel}
          alertMsg={alertMsg}
          linkSx={{ fontWeight: 400 }}
        />
        <ContactLink
          type="email"
          value={contacts.email}
          label="Email"
          alertMsg={alertMsg}
          linkSx={{ fontWeight: 400 }}
        />
      </Box>
    </Box>
  );
};

export default FooterContactInfo;
