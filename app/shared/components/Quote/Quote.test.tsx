import { render, screen } from '@testing-library/react';
import Quote from './Quote';
import type { QuoteBlockProps } from '~/types/types/quoteComponent';

jest.mock('next/dynamic');

jest.mock('../../../../public/images/quote.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="icon-svg" />
}));

describe('QuoteBlock', () => {
  const defaultProps: QuoteBlockProps = {
    quoteText: 'Test',
    sourceText: {
      title: 'title',
      data: '1 січня 2000',
      place: 'place'
    },
    quoteIconColor: 'black',
    mainTextColor: 'burgundy',
    alignRight: true
  };

  it('should render quote text', () => {
    render(<Quote {...defaultProps} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render source text combined from title, date and place', () => {
    render(<Quote {...defaultProps} />);
    expect(screen.getByText('title, 1 січня 2000, place')).toBeInTheDocument();
  });

  it('should render only existing source text fields', () => {
    render(<Quote {...defaultProps} sourceText={{ data: '1 січня 2000', place: 'Львів' }} />);
    expect(screen.getByText('1 січня 2000, Львів')).toBeInTheDocument();
  });

  it('should align text to left (alignRight = false)', () => {
    render(<Quote {...defaultProps} alignRight={false} />);
    const quoteText = screen.getByText('Test');
    expect(quoteText).toHaveStyle('text-align: left');
    expect(quoteText).toBeInTheDocument();
  });

  it('should align text to right (alignRight = true)', () => {
    render(<Quote {...defaultProps} alignRight={true} />);
    const quoteText = screen.getByText('Test');
    expect(quoteText).toHaveStyle('text-align: right');
    expect(quoteText).toBeInTheDocument();
  });

  it('should renders default empty sourceText safely', () => {
    render(<Quote quoteText="Цитата без джерела" quoteIconColor="burgundy" mainTextColor="black" />);
    expect(screen.getByText('Цитата без джерела')).toBeInTheDocument();
  });
});
