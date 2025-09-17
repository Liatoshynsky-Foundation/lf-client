import { Box } from '@mui/material';
import React from 'react';

import ContactUsButton from './ContactUsButton/ContactUsButton';
import DonationButton from './DonationButton/DonationButton';
import { styles } from './FooterContactAndSupport.styles';
import { type ButtonData } from '~/types/types/common.types';

type FooterContactAndSupportProps = {
  contact: ButtonData;
  donation: ButtonData;
};

const FooterContactAndSupport: React.FC<FooterContactAndSupportProps> = ({ contact, donation }) => {
  return (
    <Box sx={styles.container}>
      <ContactUsButton data={contact} />
      <DonationButton data={donation} />
    </Box>
  );
};

export default FooterContactAndSupport;
