import { Box } from '@mui/material';

import QuoteBlock from '~/components/Quote/Quote';

import { heroSectionStyles } from '../HeroSection.styles';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type Props = {
  heroQuote: string;
  heroQuoteSource: string;
  testID?: string;
};

export const HeroSectionQuoteBlock: React.FC<Props> = ({
  heroQuote,
  heroQuoteSource,
  testID = 'hero-section-quote-block'
}) => {
  const bp = useBreakpoints();

  return (
    <Box sx={heroSectionStyles.contentWrapper} data-testid={testID}>
      <QuoteBlock
        quoteText={heroQuote}
        sourceText={heroQuoteSource}
        quoteIconColor="black"
        mainTextColor="black"
        alignRight={bp.isMobile ? false : true}
        imageTextGap={heroSectionStyles.imageTextGap}
        textGap={heroSectionStyles.textGap}
        iconWidth={heroSectionStyles.iconWidth}
        width="100%"
        sx={heroSectionStyles.rightContentBlock}
        data-testid={`${testID}-quote`}
      />
    </Box>
  );
};
