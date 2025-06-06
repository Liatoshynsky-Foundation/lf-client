import React from 'react';
import Button from '~/ds-components/button/Button';
import { SvgImage } from '~/components/svg-image/SvgImage';
import Link from 'next/link';
import { ButtonData } from '../types';

type DonationDataProps = {
  data: ButtonData;
};

const DonationButton: React.FC<DonationDataProps> = ({ data }) => {
  return (
    <Link href={data.link} passHref>
      <Button
        size="medium"
        variant="outlined"
        color="primary"
        label={data.text}
        startIcon={<SvgImage src="/icons/donation-button" alt="Donation Button" width={24} height={24} />}
      />
    </Link>
  );
};

export default DonationButton;
