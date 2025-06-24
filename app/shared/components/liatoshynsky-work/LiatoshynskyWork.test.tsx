import { render, screen } from '@testing-library/react';

import { TitleWithQuoteProps } from '~/components/title-with-quote/TitleWithQuote';

import LiatoshynskyWork from './LiatoshynskyWork';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'liatoshynskyWork.title-with-quote.title': 'ТвоРчіСТь ЛЯтоШиНськогО',
      'liatoshynskyWork.title-with-quote.quoteText': 'Ах, мила, милий мій котику...',
      'liatoshynskyWork.title-with-quote.sourceText.title': 'Лист Бориса Лятошинського',
      'liatoshynskyWork.title-with-quote.sourceText.data': '4 травня 1916.',
      'liatoshynskyWork.title-with-quote.sourceText.place': 'Саратов'
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

describe('LiatoshynskyWork', () => {
  beforeEach(async () => {
    render(await LiatoshynskyWork());

    jest.clearAllMocks();
  });

  it('should render TitleWithQuote with correct translations', () => {
    expect(screen.getByTestId('title-with-quote')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toHaveTextContent('ТвоРчіСТь ЛЯтоШиНськогО');
    expect(screen.getByTestId('quote-text')).toHaveTextContent('Ах, мила, милий мій котику');
    expect(screen.getByTestId('source-title')).toHaveTextContent('Лист Бориса Лятошинського');
  });

  it('should pass black color to TitleWithQuote', () => {
    expect(screen.getByTestId('color')).toHaveTextContent('black');
  });
});
