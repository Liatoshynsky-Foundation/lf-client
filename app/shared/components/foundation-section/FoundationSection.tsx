'use client';

import { Box, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';

import { imageSizes, styles } from './FoundationSection.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { Typography as textStyles } from '~/shared/components/title-with-description/TitleWithDescription.styles';

interface Props {
  imageSrc: string;
  caption?: string;

  paragraph1: React.ReactNode;
  paragraph2?: React.ReactNode;
  buttonText: string;
  buttonLink: string;
}

const EMPTY_TIPTAP_DOC: TipTapDoc = { type: TipTapNodeTypes.doc, content: [] };

const FoundationSection: React.FC<Props> = ({ imageSrc, caption, paragraph1, paragraph2, buttonText, buttonLink }) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [dynamicPadding, setDynamicPadding] = useState(0);

  useEffect(() => {
    const calculatePadding = () => {
      if (textRef.current && buttonRef.current) {
        const textHeight = textRef.current.offsetHeight;
        const buttonHeight = buttonRef.current.offsetHeight;
        const gap = textHeight - buttonHeight;
        setDynamicPadding(Math.max(gap, 0));
      }
    };

    calculatePadding();
    window.addEventListener('resize', calculatePadding);
    return () => window.removeEventListener('resize', calculatePadding);
  }, [paragraph2]);

  return (
    <Box sx={styles.mainContainer}>
      <Typography
        sx={{
          display: 'block',
          ...textStyles.blockDescription,
          ...styles.textStyle,
          marginBottom: { xs: paragraph2 ? '16px' : '24px', md: paragraph2 ? '16px' : '0px' }
        }}
      >
        {paragraph1}
      </Typography>

      {paragraph2 && (
        <Typography
          data-testid="paragraph2"
          ref={textRef}
          sx={{
            display: 'block',
            ...textStyles.blockDescription,
            gridColumn: { xs: '1/-1', sm: '4/-1', md: '6/-1' },
            marginBottom: { xs: '16px', md: '0px' }
          }}
        >
          {paragraph2}
        </Typography>
      )}

      <Box
        data-testid="sticky-wrapper"
        data-padding={dynamicPadding}
        sx={{ ...styles.stickyButtonWrapper, paddingTop: { md: `${dynamicPadding}px` } }}
      >
        <Box ref={buttonRef} data-testid="button-wrapper" sx={{ height: 'fit-content' }}>
          <ButtonContentBlock
            content={EMPTY_TIPTAP_DOC}
            buttonText={buttonText}
            buttonColor="tertiary"
            containerSx={{ display: 'flex', width: '246px' }}
            textSx={{ display: 'none' }}
            textContainerSx={{ display: 'none' }}
            buttonContainerSx={{ width: '246px' }}
            sx={{ width: '246px', minWidth: '246px', maxWidth: '246px' }}
            link={buttonLink}
          />
        </Box>
      </Box>

      <ImageWithCaption
        src={imageSrc}
        alt="Foundation"
        caption={caption ?? ''}
        captionSx={styles.captionSx}
        align="right"
        sizes={imageSizes.sizes}
        border={imageSizes.border}
        containerSx={styles.img}
        imageSx={imageSizes.imageSx}
      />
    </Box>
  );
};

export default FoundationSection;
