import { Box, SxProps, Typography } from '@mui/material';

import QuoteBlock from '~/components/Quote/Quote';

import { getStyles } from './TitleWithQuote.styles';

import { sxToArray } from '~/lib/utils/sxToArray';

export interface TitleWithQuoteProps {
  title: string;
  quoteText: string;
  sourceText: string;
  color: 'black' | 'brown';
  quoteBlockSx?: SxProps;
  quoteSectionSx?: SxProps;
}

const TitleWithQuote = ({ title, quoteText, sourceText, color, quoteBlockSx, quoteSectionSx }: TitleWithQuoteProps) => {
  const styles = getStyles(color);
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.titleSection}>
        <Typography variant="h2" sx={styles.titleText}>
          {title}
        </Typography>
      </Box>

      <Box sx={[styles.quoteSection, ...sxToArray(quoteSectionSx)]}>
        <QuoteBlock
          sx={quoteBlockSx}
          quoteIconColor={'burgundy'}
          mainTextColor={'burgundy'}
          quoteText={quoteText}
          sourceText={sourceText}
          alignRight={false}
        />
      </Box>
    </Box>
  );
};

export default TitleWithQuote;
