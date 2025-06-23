import { Box, Typography } from '@mui/material';

import { styles } from './Quote.styles';
import { QuoteBlockProps } from '~/types/types/quoteComponent';

import QuoteImage from '~/public/images/quote.svg';

const QuoteBlock = ({
  quoteText,
  sourceText = {
    title: '',
    data: '',
    place: ''
  },
  quoteIconColor,
  mainTextColor,
  alignRight
}: QuoteBlockProps) => {
  const allSourceText = [sourceText.title, sourceText.data, sourceText.place].filter(Boolean).join(', ');

  const alignKey = alignRight ? 'right' : 'left';

  return (
    <Box sx={styles.mainContainer(alignKey)}>
      <Box sx={styles.image(quoteIconColor, alignKey)}>
        <QuoteImage />
      </Box>
      <Box sx={styles.textContainer(alignKey)}>
        <Typography sx={styles.mainText(mainTextColor, alignKey)}>{quoteText}</Typography>
        <Typography sx={styles.sourceText(alignKey)}>{allSourceText}</Typography>
      </Box>
    </Box>
  );
};

export default QuoteBlock;
