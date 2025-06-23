import { render, screen } from '@testing-library/react';

import TitleWithQuote from './TitleWithQuote';
import { SourceTextItem } from '~/types/types/quoteComponent';

jest.mock('~/shared/components/Quote/Quote', () => {
  const MockQuote = () => <div data-testid="quote" />;
  MockQuote.displayName = 'MockQuote';
  return MockQuote;
});

const mockSourceText: SourceTextItem = {
  title: 'Лист Бориса Лятошинського',
  data: '4 травня 1916',
  place: 'Саратов'
};

const defaultProps = {
  title: 'Тестовий заголовок',
  quoteText: 'Тестова цитата',
  sourceText: mockSourceText,
  color: 'black' as const
};

describe('TitleWithQuote', () => {
  it('should render title', () => {
    render(<TitleWithQuote {...defaultProps} />);

    expect(screen.getByText('Тестовий заголовок')).toBeInTheDocument();
  });

  it('should render QuoteBlock component', () => {
    render(<TitleWithQuote {...defaultProps} />);

    expect(screen.getByTestId('quote')).toBeInTheDocument();
  });

  it('should apply correct color for black', () => {
    render(<TitleWithQuote {...defaultProps} color="black" />);

    const title = screen.getByText('Тестовий заголовок');
    expect(title).toHaveStyle({ color: '#190d03' });
  });
});
