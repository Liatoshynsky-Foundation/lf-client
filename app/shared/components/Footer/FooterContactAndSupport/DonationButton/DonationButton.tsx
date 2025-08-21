'use client';

import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { type ButtonData } from '~/types/types/common.types';

import { Link } from '~/i18n/navigation';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type DonationDataProps = {
  data: ButtonData;
};

const DonationButton: React.FC<DonationDataProps> = ({ data }) => {
  const { isMobile } = useBreakpoints();

  const label = isMobile && data.shortText ? data.shortText : data.text;

  return (
    <Link href={data.link} passHref>
      <Button
        size="medium"
        variant="outlined"
        color="primary"
        label={label}
        startIcon={<SvgImage src="/icons/donation-button.svg" alt="Donation Button" width={24} height={24} />}
      />
    </Link>
  );
};

export default DonationButton;
