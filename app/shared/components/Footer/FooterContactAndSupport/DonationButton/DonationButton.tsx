import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

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
        label={<Typography variant="customButtonMedium">{data.text}</Typography>}
        startIcon={<SvgImage src="/icons/donation-button.svg" alt="Donation Button" width={24} height={24} />}
      />
    </Link>
  );
};

export default DonationButton;
