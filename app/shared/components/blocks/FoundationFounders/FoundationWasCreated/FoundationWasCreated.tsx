import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from '~/components/blocks/FoundationFounders/FoundationWasCreated/FoundationWasCreated.styles';
import { SvgImage } from '~/components/svg-image/SvgImage';
import { getItalic, getLink, getUnderline } from '~/components/tip-tap-content/marks';
import renderText from '~/components/tip-tap-content/renderText';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { TextNode, TipTapDoc } from '~/types/types/common.types';

interface FoundationWasCreatedProps {
  data: TipTapDoc;
}

const descriptionParagraph = (children: React.ReactNode) => <Typography sx={styles.description}>{children}</Typography>;

const boldTitle = (children: React.ReactNode) => (
  <Typography component="strong" sx={styles.title}>
    {children}
  </Typography>
);

const boldTitleWrapper = (node: TextNode) => (
  <Typography sx={styles.description} component="span">
    {renderText(
      {
        italic: getItalic,
        underline: getUnderline,
        link: getLink,
        bold: boldTitle
      },
      node
    )}
  </Typography>
);

const FoundationWasCreated: React.FC<FoundationWasCreatedProps> = ({ data }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.ellipseWrapper}>
        <SvgImage src="/icons/ellipse.svg" alt="ellipse" width={22} height={20} />
      </Box>
      <Box sx={styles.text}>
        <TipTapContent
          data={data}
          nodeRenderers={{
            paragraph: descriptionParagraph,
            text: boldTitleWrapper
          }}
        />
      </Box>
    </Box>
  );
};

export default FoundationWasCreated;
