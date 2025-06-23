import { Box, Typography } from '@mui/material';

import QuoteBlock from '~/components/Quote/Quote';

import { getStyles } from './TitleWithQuote.styles';
import { SourceTextItem } from '~/types/types/quoteComponent';

export interface TitleWithQuoteProps {
  title: string;
  quoteText: string;
  sourceText: SourceTextItem;
  color: 'black' | 'brown';
}

const TitleWithQuote = ({ title, quoteText, sourceText, color }: TitleWithQuoteProps) => {
  const styles = getStyles(color);
  return (
    <Box sx={styles.mainContainer}>
      <Box sx={styles.titleSection}>
        <Typography variant="h2" sx={styles.titleText}>
          {title}
        </Typography>
      </Box>

      <Box sx={styles.quoteSection}>
        <QuoteBlock
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
