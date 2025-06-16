import Link from 'next/link';
import React from 'react';

import { ButtonData } from '../types';

import Button from '~/shared/components/design-system/all-components/button/Button';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

type ContactUsDataProps = {
  data: ButtonData;
};

const ContactUsButton: React.FC<ContactUsDataProps> = ({ data }) => {
  return (
    <Link href={data.link} passHref>
      <Button
        size="medium"
        variant="contained"
        color="primary"
        label={data.text}
        startIcon={<SvgImage alt="Contact Us Button" src="/icons/mail-icon.svg" width={24} height={24} />}
      />
    </Link>
  );
};

export default ContactUsButton;
