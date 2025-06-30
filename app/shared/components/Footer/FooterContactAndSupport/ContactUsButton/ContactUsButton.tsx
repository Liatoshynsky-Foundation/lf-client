import React from 'react';

import Button from '~/shared/components/design-system/all-components/button/Button';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type ContactUsDataProps = {
  contactLabel: string;
};

const ContactUsButton: React.FC<ContactUsDataProps> = ({ contactLabel }) => {
  return (
    <Button
      size="medium"
      variant="contained"
      label={contactLabel}
      startIcon={<SvgImage alt="Contact Us Button" src="icons/mail-icon.svg" width={24} height={24} />}
    />
  );
};

export default ContactUsButton;
