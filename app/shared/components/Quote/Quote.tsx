import { Box, Typography } from '@mui/material';
import QuoteImage from '../../../../public/images/quote.svg';
import { styles } from './Quote.styles';
import { QuoteBlockProps } from './Quote.types';

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

  const sxStyles = styles({
    quoteIconColor,
    mainTextColor,
    alignRight
  });

  return (
    <Box sx={sxStyles.quoteWrapper}>
      <Box>
        <QuoteImage style={sxStyles.quoteIcon} />
      </Box>
      <Box sx={sxStyles.textBlocksContainer}>
        <Typography sx={sxStyles.mainQuoteText}>{quoteText}</Typography>
        <Typography sx={sxStyles.sourceText}>{allSourceText}</Typography>
      </Box>
    </Box>
  );
};

export default QuoteBlock;
