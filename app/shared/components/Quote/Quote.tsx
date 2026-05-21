import { Box, Typography } from '@mui/material';

import TipTapContent from '../tip-tap-content/TipTapContent';
import { styles } from './Quote.styles';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
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
  imageTextGap,
  textGap,
  iconWidth,
  dataTestId
}: QuoteBlockProps) => {
  const alignKey = alignRight ? 'right' : 'left';

  return (
    <Box sx={[styles.mainContainer(alignKey, width, imageTextGap), ...sxToArray(sx)]} data-testid={dataTestId}>
      <Box sx={styles.image(quoteIconColor, alignKey, iconWidth)}>
        <QuoteImage />
      </Box>
      <Box sx={styles.textContainer(alignKey, textGap)} data-testid="Quote-textContainer">
        {quoteText &&
          (typeof quoteText === 'string' ? (
            <Typography sx={styles.mainText(mainTextColor, alignKey)} data-testid="Quote-textContainer--text">
              {quoteText}
            </Typography>
          ) : (
            <TipTapContent
              data={quoteText}
              nodeRenderers={{
                [TipTapNodeTypes.paragraph]: (children) => (
                  <Typography sx={styles.mainText(mainTextColor, alignKey)} data-testid="Quote-textContainer--text">
                    {children}
                  </Typography>
                )
              }}
            />
          ))}

        {sourceText &&
          (typeof sourceText === 'string' ? (
            <Typography sx={styles.sourceText(alignKey)} data-testid="Quote-textContainer--source">
              {sourceText}
            </Typography>
          ) : (
            <TipTapContent
              data={sourceText}
              nodeRenderers={{
                [TipTapNodeTypes.paragraph]: (children) => (
                  <Typography sx={styles.sourceText(alignKey)} data-testid="Quote-textContainer--source">
                    {children}
                  </Typography>
                )
              }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default QuoteBlock;
