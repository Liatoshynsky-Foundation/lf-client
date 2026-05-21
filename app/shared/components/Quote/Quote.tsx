'use client';

import { Box, Typography, TypographyProps } from '@mui/material';
import React, { useMemo } from 'react';

import TipTapContent from '../tip-tap-content/TipTapContent';
import { styles } from './Quote.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { QuoteBlockProps } from '~/types/types/quoteComponent';

import { sxToArray } from '~/lib/utils/sxToArray';
import QuoteImage from '~/public/images/quote.svg';

interface UnifiedRendererConfig {
  sx: TypographyProps['sx'];
  dataTestId: string;
}

const createTypographyRenderer = (config: UnifiedRendererConfig) => {
  const Paragraph = (children: React.ReactNode) => (
    <Typography sx={config.sx} data-testid={config.dataTestId}>
      {children}
    </Typography>
  );
  return Paragraph;
};

const QuoteBlock = ({
  quoteText,
  sourceText,
  quoteIconColor,
  mainTextColor,
  alignRight,
  sx,
  width,
  imageTextGap,
  textGap,
  iconWidth,
  dataTestId
}: QuoteBlockProps) => {
  const alignKey = alignRight ? 'right' : 'left';

  const mainTextStyle = styles.mainText(mainTextColor, alignKey);
  const sourceTextStyle = styles.sourceText(alignKey);

  const mainTextRenderer = useMemo(() => {
    return createTypographyRenderer({
      sx: mainTextStyle,
      dataTestId: 'Quote-textContainer--text'
    });
  }, [mainTextStyle]);

  const sourceTextRenderer = useMemo(() => {
    return createTypographyRenderer({
      sx: sourceTextStyle,
      dataTestId: 'Quote-textContainer--source'
    });
  }, [sourceTextStyle]);

  return (
    <Box sx={[styles.mainContainer(alignKey, width, imageTextGap), ...sxToArray(sx)]} data-testid={dataTestId}>
      <Box sx={styles.image(quoteIconColor, alignKey, iconWidth)}>
        <QuoteImage />
      </Box>
      <Box sx={styles.textContainer(alignKey, textGap)} data-testid="Quote-textContainer">
        {quoteText &&
          (typeof quoteText === 'string' ? (
            <Typography sx={mainTextStyle} data-testid="Quote-textContainer--text">
              {quoteText}
            </Typography>
          ) : (
            <TipTapContent
              data={quoteText}
              nodeRenderers={{
                [TipTapNodeTypes.paragraph]: mainTextRenderer
              }}
            />
          ))}

        {sourceText &&
          (typeof sourceText === 'string' ? (
            <Typography sx={sourceTextStyle} data-testid="Quote-textContainer--source">
              {sourceText}
            </Typography>
          ) : (
            <TipTapContent
              data={sourceText}
              nodeRenderers={{
                [TipTapNodeTypes.paragraph]: sourceTextRenderer
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default QuoteBlock;
