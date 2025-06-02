import { Box, Typography } from '@mui/material';
import QuoteImage from '../../../../public/images/quote.svg';
import { styles } from './Quote.styles';

export type ImageColor = 'black' | 'burgundy';
export type TextColor = 'black' | 'gray' | 'burgundy';

type SourceTextItem = {
  tittle?: string;
  data?: string;
  place?: string;
};
type QuoteBlockProps<T extends ImageColor> = {
  quoteText: string;
  sourceText: SourceTextItem;
  quoteIconColor: T;
  mainTextColor: T;
  sourceTextColor: TextColor;
};

const QuoteBlock = <T extends ImageColor>({
  quoteText = 'Буде, звісно, дуже багато цікавого, але всього не почуєш, тому що в один вечір у різних театрах і залах проходитимуть по два концерти або опери.',
  sourceText = {
    tittle: 'Лист Бориса Лятошинського Маргариті Царевич',
    data: '29 вересня 1957',
    place: 'Берлін'
  },
  quoteIconColor,
  mainTextColor,
  sourceTextColor
}: QuoteBlockProps<T>) => {
  const allSourceText = [sourceText.tittle, sourceText.data, sourceText.place].filter(Boolean).join(', ');

  const sxStyles = styles({
    quoteIconColor,
    mainTextColor,
    sourceTextColor
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
