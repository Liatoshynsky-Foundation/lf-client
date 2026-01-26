import { Box, Typography } from '@mui/material';
import React from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { imageSizes, styles } from './FoundationSection.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';
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
        <ButtonContentBlock
          content={paragraph2}
          buttonText={buttonText}
          buttonColor="tertiary"
          sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' } }}
          textSx={{ gridColumn: styles.textStyle.gridColumn }}
          textContainerSx={{ marginBottom: { xs: '24px', md: '0px' } }}
          buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
          link={buttonLink}
        />
      )}

      {!paragraph2 && (
        <ButtonContentBlock
          content={{ type: TipTapNodeTypes.doc, content: [] }}
          buttonText={buttonText}
          buttonColor="tertiary"
          sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' } }}
          textSx={{ display: 'none' }}
          textContainerSx={{ display: 'none' }}
          buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
          link={buttonLink}
        />
      )}

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
