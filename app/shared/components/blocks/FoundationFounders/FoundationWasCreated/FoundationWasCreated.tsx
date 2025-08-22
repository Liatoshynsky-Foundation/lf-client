import { Box, Typography } from '@mui/material';
import React from 'react';

import { styles } from '~/components/blocks/FoundationFounders/FoundationWasCreated/FoundationWasCreated.styles';
import { SvgImage } from '~/components/svg-image/SvgImage';
import { getItalic, getLink, getUnderline } from '~/components/tip-tap-content/marks';
import renderText from '~/components/tip-tap-content/renderText';
import TipTapContent from '~/components/tip-tap-content/TipTapContent';

import { TipTapDoc } from '~/types/types/common.types';

interface FoundationWasCreatedProps {
  data: TipTapDoc;
}

const FoundationWasCreated: React.FC<FoundationWasCreatedProps> = ({ data }) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.ellipseWrapper}>
        <SvgImage src="icons/ellipse.svg" alt="ellipse" width={32} height={30} />
      </Box>
      <Box sx={styles.text}>
        <TipTapContent
          data={data}
          nodeRenderers={{
            paragraph: (children) => <Typography sx={styles.description}>{children}</Typography>,
            text: (node) => (
              <Typography component="span">
                {renderText(
                  {
                    italic: getItalic,
                    underline: getUnderline,
                    link: getLink,
                    bold: (children) => (
                      <Typography component="strong" sx={styles.title}>
                        {children}
                      </Typography>
                    )
                  },
                  node
                )}
              </Typography>
            )
          }}
        />
      </Box>
    </Box>
  );
};

export default FoundationWasCreated;
