'use client';

import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

import { ContactLink } from '~/components/contact-link/ContactLink';

import { styles } from './FooterContactInfo.styles';

import { hasContactValue } from '~/lib/utils/contactValue';

interface FooterContactInfoProps {
  alertMsg: string;
  labels: {
    phoneLabel: string;
  };
  contacts: {
    foundationName?: string | null;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
  };
}

const FooterContactInfo: FC<FooterContactInfoProps> = ({ contacts, labels, alertMsg }) => {
  const hasNameOrAddress = hasContactValue(contacts.foundationName) || hasContactValue(contacts.address);
  const hasPhone = hasContactValue(contacts.phone);
  const hasEmail = hasContactValue(contacts.email);

  if (!hasNameOrAddress && !hasPhone && !hasEmail) {
    return null;
  }

  return (
    <Box sx={styles.container}>
      {hasNameOrAddress && (
        <Box sx={styles.titleAndAddressCont}>
          {hasContactValue(contacts.foundationName) && (
            <Typography sx={styles.title}>{contacts.foundationName}</Typography>
          )}
          {hasContactValue(contacts.address) && (
            <Box sx={styles.linkContainer}>
              <Typography sx={styles.text}>{contacts.address}</Typography>
            </Box>
          )}
        </Box>
      )}
      <Box>
        {hasPhone && (
          <ContactLink
            type="phone"
            value={contacts.phone!}
            label={labels.phoneLabel}
            alertMsg={alertMsg}
            valueSx={styles.contactLink}
            useNativeLink
          />
        )}
        {hasEmail && (
          <ContactLink
            type="email"
            value={contacts.email!}
            label="Email"
            alertMsg={alertMsg}
            valueSx={styles.contactLink}
            useNativeLink
          />
        )}
      </Box>
    </Box>
  );
};

export default FooterContactInfo;
