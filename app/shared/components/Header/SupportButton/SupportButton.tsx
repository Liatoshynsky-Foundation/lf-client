import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { styles } from './SupportButton.styles';
import type { SupportButtonData } from '~/types/types/header.type';

type SupportButtonProps = {
  data: SupportButtonData;
  isMobile?: boolean;
};

const SupportButton: React.FC<SupportButtonProps> = ({ data, isMobile }) => {
  if (isMobile) {
    return (
      <Link href={data.link}>
        <Box sx={styles.mobileContainer}>
          <SvgImage src="/icons/support.svg" width={32} height={32} alt="Support button" />
        </Box>
      </Link>
    );
  }

  return <Button size="medium" variant="contained" color="tertiary" link={data.link} label={data.text} />;
};

export default SupportButton;
