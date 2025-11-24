'use client';

import { Box, Typography } from '@mui/material';

import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './ExcerptBlock.styles';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface ExcerptBlockProps {
  quote: string;
  source: string;
  dataTestId: string;
}

export default function ExcerptBlock({ quote, source, dataTestId }: ExcerptBlockProps) {
  const { isMobile, isTablet } = useBreakpoints();

  return isMobile ? (
    <Box sx={styles.mobileView} data-testid={dataTestId}>
      <Typography sx={styles.quoteContainer} variant="customItalic18" fontWeight={700}>
        {quote}
      </Typography>
      <Typography variant="customItalic14" fontWeight={500}>
        {source}
      </Typography>
    </Box>
  ) : (
    <Box sx={styles.desktopView} data-testid={dataTestId}>
      <Box sx={styles.icon}>
        <SvgImage src="/icons/quote.svg" alt="Quote icon" width={40} height={34} />
      </Box>

      <Typography sx={styles.sourceText(isTablet)} variant="customItalic14" fontWeight={500}>
        {source}
      </Typography>
      <Typography variant="h5" fontStyle={'italic'} sx={styles.quoteText}>
        {quote}
      </Typography>
    </Box>
  );
}
