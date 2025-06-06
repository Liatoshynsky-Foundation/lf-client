import React from 'react';
import DonationButton from './DonationButton/DonationButton';
import ContactUsButton from './ContactUsButton/ContactUsButton';
import { Box } from '@mui/material';
import { styles } from './FooterContactAndSupport.styles';
import { ButtonData } from './types';

type FooterContactAndSupportProps = {
  contactUs: ButtonData;
  donation: ButtonData;
};

const FooterContactAndSupport: React.FC<FooterContactAndSupportProps> = ({ contactUs, donation }) => {
  return (
    <Box sx={styles.container}>
      <ContactUsButton data={contactUs} />
      <DonationButton data={donation} />
    </Box>
  );
};

export default FooterContactAndSupport;
