import { render, screen } from '@testing-library/react';

import { TitleWithQuoteProps } from '~/components/title-with-quote/TitleWithQuote';

import ResearchAndScientificWork from './ResearchAndScientificWork';

jest.mock('~/components/title-with-quote/TitleWithQuote', () => {
  const MockTitleWithQuote = ({ title, quoteText, sourceText, color }: TitleWithQuoteProps) => (
    <div data-testid="title-with-quote">
      <div data-testid="title">{title}</div>
      <div data-testid="quote-text">{quoteText}</div>
      <div data-testid="source-title">{sourceText}</div>
      <div data-testid="color">{color}</div>
    </div>
  );
  MockTitleWithQuote.displayName = 'MockTitleWithQuote';
  return MockTitleWithQuote;
});

describe('ResearchAndScientificWork', () => {
  const mockData = {
    title: { uk: 'ДоСліДжЕннЯ ТА НауКовІ РоБотИ' },
    quote: {
      text: { uk: 'Ах, мила, милий мій котику...' },
      source: { uk: 'Лист Бориса Лятошинського' }
    }
  };
  const lang = 'uk';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render TitleWithQuote with correct data', () => {
    render(<ResearchAndScientificWork data={mockData} lang={lang} />);

    expect(screen.getByTestId('title-with-quote')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent(mockData.title.uk);
    expect(screen.getByTestId('quote-text')).toHaveTextContent(mockData.quote.text.uk);
    expect(screen.getByTestId('source-title')).toHaveTextContent(mockData.quote.source.uk);
    expect(screen.getByTestId('color')).toHaveTextContent('brown');
  });
});
