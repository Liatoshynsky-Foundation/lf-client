import { render, screen } from '@testing-library/react';

import { TitleWithQuoteProps } from '~/components/title-with-quote/TitleWithQuote';

import ResearchAndScientificWork from './ResearchAndScientificWork';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'research.title-with-quote.title': 'ДоСліДжЕннЯ\nТА НауКовІ РоБотИ',
      'research.title-with-quote.quoteText': 'Ах, мила, милий мій котику...',
      'research.title-with-quote.sourceText.title': 'Лист Бориса Лятошинського',
      'research.title-with-quote.sourceText.data': '4 травня 1916.',
      'research.title-with-quote.sourceText.place': 'Саратов'
    };
    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

jest.mock('~/components/title-with-quote/TitleWithQuote', () => {
  const MockTitleWithQuote = ({ title, quoteText, sourceText, color }: TitleWithQuoteProps) => (
    <div data-testid="title-with-quote">
      <div data-testid="title">{title}</div>
      <div data-testid="quote-text">{quoteText}</div>
      <div data-testid="source-title">{sourceText.title}</div>
      <div data-testid="color">{color}</div>
    </div>
  );
  MockTitleWithQuote.displayName = 'MockTitleWithQuote';
  return MockTitleWithQuote;
});

describe('ResearchAndScientificWork', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render TitleWithQuote with correct translations', async () => {
    const component = await ResearchAndScientificWork();
    render(component);

    expect(screen.getByTestId('title-with-quote')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent('ДоСліДжЕннЯ ТА НауКовІ РоБотИ');
    expect(screen.getByTestId('quote-text')).toHaveTextContent('Ах, мила, милий мій котику');
    expect(screen.getByTestId('source-title')).toHaveTextContent('Лист Бориса Лятошинського');
  });

  it('should pass brown color to TitleWithQuote', async () => {
    const component = await ResearchAndScientificWork();
    render(component);

    expect(screen.getByTestId('color')).toHaveTextContent('brown');
  });
});
