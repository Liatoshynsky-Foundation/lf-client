import { render, screen } from '@testing-library/react';
import React from 'react';

import { HeroSectionQuoteBlock } from './HeroSectionQuoteBlock';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface BoxProps {
  children?: React.ReactNode;
  'data-testid'?: string;
}

interface QuoteBlockProps {
  quoteText?: string;
  sourceText?: string;
  alignRight?: boolean;
  'data-testid'?: string;
}

jest.mock('../HeroSection.styles', () => ({
  heroSectionStyles: {
    contentWrapper: {},
    imageTextGap: 10,
    textGap: 5,
    iconWidth: 20,
    rightContentBlock: {}
  }
}));

jest.mock('@mui/material', () => ({
  Box: ({ children, 'data-testid': testId }: BoxProps) => <div data-testid={testId}>{children}</div>
}));

jest.mock('~/components/Quote/Quote', () => ({
  __esModule: true,
  default: ({ quoteText, sourceText, alignRight, 'data-testid': testId }: QuoteBlockProps) => (
    <div data-testid={testId} data-align-right={alignRight}>
      <span>{quoteText}</span>
      <span>{sourceText}</span>
    </div>
  )
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => jest.fn());

describe('HeroSectionQuoteBlock', () => {
  const defaultProps = {
    heroQuote: 'Test Quote Content',
    heroQuoteSource: 'Test Author Name'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render block and align content to the right on desktop views', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false });

    render(<HeroSectionQuoteBlock {...defaultProps} testID="desktop-quote" />);

    expect(screen.getByTestId('desktop-quote')).toBeInTheDocument();

    const quoteEl = screen.getByTestId('desktop-quote-quote');
    expect(quoteEl).toBeInTheDocument();
    expect(quoteEl.getAttribute('data-align-right')).toBe('true');
  });

  it('should reset right alignment on mobile screen dimensions to complete branch evaluation', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true });

    render(<HeroSectionQuoteBlock {...defaultProps} testID="mobile-quote" />);

    expect(screen.getByTestId('mobile-quote')).toBeInTheDocument();

    const quoteEl = screen.getByTestId('mobile-quote-quote');
    expect(quoteEl).toBeInTheDocument();
    expect(quoteEl.getAttribute('data-align-right')).toBe('false');
  });
});
