import { Box } from '@mui/material';
import React from 'react';

import ImageWithCaption from '~/components/image-with-caption/ImageWithCaption';

import { imageSizes, styles } from './FoundationSection.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

import ButtonContentBlock from '~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock';

interface Props {
  imageSrc: string;
  caption?: string;
  paragraph1: string;
  paragraph2?: string;
  buttonText: string;
  buttonLink: string;
}

const FoundationSection: React.FC<Props> = ({ imageSrc, caption, paragraph1, paragraph2, buttonText, buttonLink }) => {
  /* eslint-disable */
  const combinedContent: TipTapDoc = {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph as const,
        content: [{ type: TipTapNodeTypes.text as const, text: paragraph1 }]
      },
      ...(paragraph2
        ? [
            {
              type: TipTapNodeTypes.paragraph as const,
              content: [{ type: TipTapNodeTypes.text as const, text: paragraph2 }]
            }
          ]
        : [])
    ]
  };

  return (
    <Box sx={styles.mainContainer}>
      <ButtonContentBlock
        content={combinedContent}
        buttonText={buttonText}
        buttonColor="tertiary"
        sx={{ maxWidth: { xs: '246px' }, minWidth: { xs: '246px' } }}
        textSx={styles.textStyle}
        textContainerSx={{ marginBottom: { xs: '24px', md: '0px' } }}
        buttonContainerSx={{ justifyContent: { xs: 'flex-start', md: 'flex-end' } }}
        link={buttonLink}
      />
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
