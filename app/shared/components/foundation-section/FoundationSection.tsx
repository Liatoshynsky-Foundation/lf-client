import { Box, Typography } from '@mui/material';
import React from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';

import { imageSizes, styles } from './FoundationSection.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';
import { Typography as textStyles } from '~/shared/components/title-with-description/TitleWithDescription.styles';

interface Props {
  imageSrc: string;
  caption?: string;
  paragraph1: string;
  paragraph2?: string;
  buttonText: string;
  buttonLink: string;
}

const FoundationSection: React.FC<Props> = ({ imageSrc, caption, paragraph1, paragraph2, buttonText, buttonLink }) => {
  const paragraph2Content: TipTapDoc = {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph as const,
        content: [{ type: TipTapNodeTypes.text as const, text: paragraph2 || '' }]
      }
    ]
  };

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
        <ButtonContentBlock
          content={paragraph2Content}
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
