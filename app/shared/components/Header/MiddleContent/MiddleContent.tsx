'use client';

import Image from 'next/image';
import React from 'react';

import { IconButton } from '~/ds-components/icon-button/IconButton';
import useBreakpoints from '~/hooks/use-breakpoints/useBreakpoints';

import { styles } from './MiddleContent.styles';

export default function MiddleContent() {
  const { isLaptopAndAbove } = useBreakpoints();

  return (
    <>
      {isLaptopAndAbove ? (
        <span>ButtonGroup</span>
      ) : (
        <IconButton size="large" customStyles={styles.iconButton}>
          <Image src="/icons/menu-button.svg" alt="Modal button" width={40} height={24} />
        </IconButton>
      )}
    </>
  );
}
