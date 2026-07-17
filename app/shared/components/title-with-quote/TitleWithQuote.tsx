import { Box, SxProps, Typography } from '@mui/material';
import React from 'react';

import QuoteBlock from '~/components/Quote/Quote';

import { getStyles } from './TitleWithQuote.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { ITitleWithQuote } from '~/types/page/artistry.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

import { sxToArray } from '~/lib/utils/sxToArray';
import TipTapContent from '~/shared/components/tip-tap-content/TipTapContent';

export interface TitleWithQuoteProps {
  data?: ITitleWithQuote;
  title?: string | TipTapDoc;
  quoteText?: string | TipTapDoc;
  sourceText?: string | TipTapDoc;
  color?: 'black' | 'brown';
  quoteBlockSx?: SxProps;
  quoteSectionSx?: SxProps;
  quoteWidth?: string | Record<string, string>;
}

const TitleWithQuote = ({
  data,
  title,
  quoteText,
  sourceText,
  color = 'black',
  quoteBlockSx,
  quoteSectionSx,
  quoteWidth = { xs: '272px', sm: '316px', md: '341px', lg: '520px' }
}: TitleWithQuoteProps) => {
  const styles = getStyles(color);

  const displayTitle = data?.title || title || '';
  const displayQuote = data?.quoteText || quoteText || '';
  const displaySource = data?.sourceText || sourceText || '';

  const titleRenderer = (children: React.ReactNode) => (
    <Typography variant="h1" sx={styles.titleText} data-testid="TitleWithQuote-title">
      {children}
    </Typography>
  );

  return (
    <Box sx={styles.mainContainer} data-testid="TitleWithQuote">
      <Box sx={styles.titleSection}>
        {typeof displayTitle === 'string' ? (
          <Typography variant="h1" sx={styles.titleText} data-testid="TitleWithQuote-title">
            {displayTitle}
          </Typography>
        ) : (
          <TipTapContent
            data={displayTitle}
            nodeRenderers={{
              [TipTapNodeTypes.paragraph]: titleRenderer
            }}
          />
        )}
      </Box>

      <Box sx={[styles.quoteSection, ...sxToArray(quoteSectionSx)]} data-testid="TitleWithQuote-quoteBlock">
        <QuoteBlock
          dataTestId="Quote"
          width={quoteWidth}
          sx={quoteBlockSx}
          quoteIconColor={'burgundy'}
          mainTextColor={'burgundy'}
          quoteText={displayQuote as any}
          sourceText={displaySource as any}
          alignRight={false}
        />
      </Box>
    </Box>
  );
};

export default TitleWithQuote;
