import { render, screen } from '@testing-library/react';

import TitleWithQuote from './TitleWithQuote';

jest.mock('~/shared/components/Quote/Quote', () => {
  const MockQuote = () => <div data-testid="quote" />;
  MockQuote.displayName = 'MockQuote';
  return MockQuote;
});

const defaultProps = {
  title: 'Тестовий заголовок',
  quoteText: 'Тестова цитата',
  sourceText: 'Лист Бориса Лятошинського, 4 травня 1916, Саратов',
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
