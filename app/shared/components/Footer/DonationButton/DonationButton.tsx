import React from 'react';
import Button from '~/shared/components/design-system/all-components/button/Button';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
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
        startIcon={<Svg src="icons/donation-button" color="#190D03" alt="Donation Button" />}
      />
    </Link>
  );
};

export default DonationButton;
