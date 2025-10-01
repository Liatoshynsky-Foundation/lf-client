'use client';

import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { type ButtonData } from '~/types/types/common.types';

type DonationDataProps = {
  data: ButtonData;
};

const DonationButton: React.FC<DonationDataProps> = ({ data }) => {
  return (
    <Button
      size="medium"
      variant="outlined"
      color="primary"
      label={data.text}
      shortLabel={data.shortText}
      link={data.link}
      startIcon={<SvgImage src="/icons/donation-button.svg" alt="Donation Button" width={20} height={20} />}
      sx={{ gap: '0px' }}
    />
  );
};

export default DonationButton;
