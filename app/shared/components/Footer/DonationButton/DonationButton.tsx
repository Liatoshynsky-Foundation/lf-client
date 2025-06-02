import React from 'react';
import Button from '../../design-system/all-components/button/Button';
import DonationButtonIcon from '../../../../../public/icons/donation-button.svg';
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
        startIcon={<SvgImage alt="Donation Button" src={DonationButtonIcon} />}
      />
    </Link>
  );
};

export default DonationButton;
