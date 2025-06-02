import React from 'react';
import Button from '../../design-system/all-components/button/Button';
import { SvgImage } from '../../svg-image/SvgImage';
import Link from 'next/link';

type DonationButtonData = {
  text: string;
  link: string;
};

type DonationDataProps = {
  data: DonationButtonData;
};

const DonationButton: React.FC<DonationDataProps> = ({ data }) => {
  return (
    <Link href={data.link} passHref>
      <Button
        size="medium"
        variant="outlined"
        color="primary"
        label={data.text}
        startIcon={<SvgImage alt="Donation Button" src="icons/donation-button.svg" width={24} height={24} />}
      />
    </Link>
  );
};

export default DonationButton;
