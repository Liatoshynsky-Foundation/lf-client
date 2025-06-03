import { Box, Typography } from '@mui/material';
import QuoteImage from '../../../../public/images/quote.svg';
import { styles } from './Quote.styles';
import { QuoteBlockProps } from '~/types/types/quoteComponent';

const QuoteBlock = ({
  quoteText,
  sourceText = {
    tittle: '',
    data: '',
    place: ''
  },
  quoteIconColor,
  mainTextColor,
  alignRight
}: QuoteBlockProps) => {
  const allSourceText = [sourceText.tittle, sourceText.data, sourceText.place].filter(Boolean).join(', ');

  const alignKey = alignRight ? 'right' : 'left';

  return (
    <Box sx={styles.mainContainer(alignKey)}>
      <Box>
        <QuoteImage style={styles.image(quoteIconColor, alignKey)} />
      </Box>
      <Box sx={styles.textContainer(alignKey)}>
        <Typography sx={styles.mainText(mainTextColor, alignKey)}>{quoteText}</Typography>
        <Typography sx={styles.sourceText(alignKey)}>{allSourceText}</Typography>
      </Box>
    </Box>
  );
};

export default QuoteBlock;
