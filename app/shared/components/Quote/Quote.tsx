import { Box, Typography } from '@mui/material';

import { styles } from './Quote.styles';
import { QuoteBlockProps } from '~/types/types/quoteComponent';

import { sxToArray } from '~/lib/utils/sxToArray';
import QuoteImage from '~/public/images/quote.svg';

const QuoteBlock = ({
  quoteText,
  sourceText,
  quoteIconColor,
  mainTextColor,
  alignRight,
  sx,
  width,
  dataTestId
}: QuoteBlockProps) => {
  const alignKey = alignRight ? 'right' : 'left';

  return (
    <Box sx={[styles.mainContainer(alignKey, width), ...sxToArray(sx)]} data-testid={dataTestId}>
      <Box sx={styles.image(quoteIconColor, alignKey)}>
        <QuoteImage />
      </Box>
      <Box sx={styles.textContainer(alignKey)} data-testid="Quote-textContainer">
        <Typography sx={styles.mainText(mainTextColor, alignKey)} data-testid="Quote-textContainer--text">
          {quoteText}
        </Typography>
        <Typography sx={styles.sourceText(alignKey)} data-testid="Quote-textContainer--source">
          {sourceText}
        </Typography>
      </Box>
    </Box>
  );
};

export default QuoteBlock;
