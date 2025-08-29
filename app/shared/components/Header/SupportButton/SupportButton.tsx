import Link from 'next/link';
import React from 'react';

import Button from '~/ds-components/button/Button';

import { SvgImage } from '../../svg-image/SvgImage';
import type { SupportButtonData } from '~/types/types/header.type';

type SupportButtonProps = {
  data: SupportButtonData;
  isMobile?: boolean;
};

const SupportButton: React.FC<SupportButtonProps> = ({ data, isMobile }) => {
  if (isMobile) {
    return (
      <Link href={data.link}>
        <SvgImage src="/icons/support.svg" width={40} height={40} alt="Support button" />
      </Link>
    );
  }

  return <Button size="medium" variant="contained" color="tertiary" link={data.link} label={data.text} />;
};

export default SupportButton;
