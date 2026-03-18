import { Box, Typography } from '@mui/material';
import React from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';
import Button from '~/ds-components/button/Button';

import { imageSizes, styles } from './FoundationSection.styles';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ArrowUpRight from '~/public/icons/arrow-up-right.svg';
import { Svg } from '~/shared/components/colored-svg/ColoredSvg';
import { Typography as textStyles } from '~/shared/components/title-with-description/TitleWithDescription.styles';

interface Props {
  imageSrc: string;
  caption?: string;
  paragraph1: TipTapDoc;
  paragraph2?: TipTapDoc;
  buttonText: string;
  buttonLink: string;
}

const createParagraph = () => {
  const ParagraphRenderer = (children: React.ReactNode) => (
    <Typography sx={{ display: 'block', ...textStyles.blockDescription }}>{children}</Typography>
  );
  ParagraphRenderer.displayName = 'ParagraphRenderer';
  return ParagraphRenderer;
};

const FoundationSection: React.FC<Props> = ({ imageSrc, caption, paragraph1, paragraph2, buttonText, buttonLink }) => {
  return (
    <Box sx={styles.mainContainer}>
      <Box
        sx={{
          ...styles.textStyle,
          marginBottom: { xs: paragraph2 ? '16px' : '24px', md: paragraph2 ? '16px' : '0px' }
        }}
      >
        <TipTapContent
          data={paragraph1}
          nodeRenderers={{
            paragraph: createParagraph()
          }}
        />
      </Box>

      {paragraph2 && (
        <Box sx={{ gridColumn: { xs: '1/-1', sm: '4/-1', md: '6/-1' }, marginBottom: { xs: '16px', md: '0px' } }}>
          <TipTapContent data={paragraph2} nodeRenderers={{ paragraph: createParagraph() }} />
        </Box>
      )}

      <Box sx={styles.stickyButtonWrapper}>
        <Button
          link={buttonLink}
          color="tertiary"
          variant="contained"
          sx={{
            maxWidth: { xs: '246px' },
            minWidth: { xs: '246px' },
            gap: '8px'
          }}
        >
          {buttonText}
          <Svg Component={ArrowUpRight} alt="icon" color="#000" width="20px" height="20px" />
        </Button>
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
