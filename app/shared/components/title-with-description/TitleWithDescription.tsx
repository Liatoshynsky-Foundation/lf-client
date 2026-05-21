import { Box, Typography } from '@mui/material';
import React from 'react';

import { renderData } from '../tip-tap-content/nodes';
import TipTapContent from '../tip-tap-content/TipTapContent';
import { styles } from './TitleWithDescription.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TitleWithDescriptionProps } from '~/types/types/titleWithDescriptionComponent';

const TitleWithDescription = ({ variant, title, description, dataTestId }: TitleWithDescriptionProps) => {
  return (
    <Box sx={styles.container(variant)} data-testid={dataTestId}>
      {typeof title === 'string' ? (
        <>
          <Typography sx={styles.blockTitle()}>{title}</Typography>
          {description && (
            <TipTapContent
              data={renderData(description)}
              nodeRenderers={{
                [TipTapNodeTypes.paragraph]: (children) => (
                  <Typography sx={styles.blockDescription()}>{children}</Typography>
                )
              }}
            />
          )}
        </>
      ) : (
        <>
          <TipTapContent
            data={title}
            nodeRenderers={{
              [TipTapNodeTypes.paragraph]: (children) => <Typography sx={styles.blockTitle()}>{children}</Typography>
            }}
          />

          {description && (
            <TipTapContent
              data={renderData(description)}
              nodeRenderers={{
                [TipTapNodeTypes.paragraph]: (children) => (
                  <Typography sx={styles.blockDescription()}>{children}</Typography>
                )
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default TitleWithDescription;
