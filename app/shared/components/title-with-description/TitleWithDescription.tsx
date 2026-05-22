import { Box, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

import { renderData } from '../tip-tap-content/nodes';
import TipTapContent from '../tip-tap-content/TipTapContent';
import { styles } from './TitleWithDescription.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TitleWithDescriptionProps } from '~/types/types/titleWithDescriptionComponent';

const renderBlock = (sx: SxProps<Theme>) => {
  const Block = (children: React.ReactNode) => <Typography sx={sx}>{children}</Typography>;
  return Block;
};

const TitleWithDescription = ({ variant, title, description, dataTestId }: TitleWithDescriptionProps) => {
  return (
    <Box sx={styles.container(variant)} data-testid={dataTestId}>
      {typeof title === 'string' ? (
        <Typography sx={styles.blockTitle()}>{title}</Typography>
      ) : (
        <TipTapContent
          data={title}
          nodeRenderers={{
            [TipTapNodeTypes.paragraph]: renderBlock(styles.blockTitle())
          }}
        />
      )}

      {description && (
        <TipTapContent
          data={renderData(description)}
          nodeRenderers={{
            [TipTapNodeTypes.paragraph]: renderBlock(styles.blockDescription())
          }}
        />
      )}
    </Box>
  );
};

export default TitleWithDescription;
