import { Box } from '@mui/material';

import QuoteBlock from '~/components/Quote/Quote';

import { heroSectionStyles } from './HeroSection.styles';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

export type HeroSectionQuoteProps = {
  heroQuote: string;
  heroQuoteSource: string;
};

export const HeroSectionQuoteBlock: React.FC<HeroSectionQuoteProps> = ({ heroQuote, heroQuoteSource }) => {
  const bp = useBreakpoints();

  return (
    <Box sx={heroSectionStyles.contentWrapper}>
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
      />
    </Box>
  );
};
