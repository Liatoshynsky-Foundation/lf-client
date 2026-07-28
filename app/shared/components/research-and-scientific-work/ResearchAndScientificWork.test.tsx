import { render, screen } from '@testing-library/react';

import { TitleWithQuoteProps } from '~/components/title-with-quote/TitleWithQuote';

import ResearchAndScientificWork from './ResearchAndScientificWork';

jest.mock('~/components/title-with-quote/TitleWithQuote', () => {
  const MockTitleWithQuote = ({ title, quoteText, sourceText, color }: TitleWithQuoteProps) => (
    <div data-testid="title-with-quote">
      <div data-testid="title">{typeof title === 'string' ? title : null}</div>
      <div data-testid="quote-text">{typeof quoteText === 'string' ? quoteText : null}</div>
      <div data-testid="source-title">{typeof sourceText === 'string' ? sourceText : null}</div>
      <div data-testid="color">{color}</div>
    </div>
  );
  MockTitleWithQuote.displayName = 'MockTitleWithQuote';
  return MockTitleWithQuote;
});

describe('ResearchAndScientificWork', () => {
  const mockData = {
    title: 'ДоСліДжЕннЯ ТА НауКовІ РоБотИ',
    quote: {
      text: 'Ах, мила, милий мій котику...',
      source: 'Лист Бориса Лятошинського'
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render TitleWithQuote with correct data', () => {
    render(<ResearchAndScientificWork data={mockData} />);

    expect(screen.getByTestId('title-with-quote')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent(mockData.title);
    expect(screen.getByTestId('quote-text')).toHaveTextContent(mockData.quote.text);
    expect(screen.getByTestId('source-title')).toHaveTextContent(mockData.quote.source);
    expect(screen.getByTestId('color')).toHaveTextContent('black');
  });
});
