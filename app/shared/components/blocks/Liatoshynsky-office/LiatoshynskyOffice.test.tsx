import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import React from 'react';

import LiatoshynskyOffice from './LiatoshynskyOffice';

jest.mock('~/components/Quote/Quote', () => {
  const MockQuote = () => <div data-testid="quote" />;
  MockQuote.displayName = 'MockQuote';
  return MockQuote;
});

jest.mock('~/components/blocks/Liatoshynsky-office/office-media/OfficeMedia', () => {
  const MockOfficeMedia = () => <div data-testid="media" />;
  MockOfficeMedia.displayName = 'MockOfficeMedia';
  return MockOfficeMedia;
});

jest.mock('~/ds-components/button/Button');

jest.mock('next/font/google', () => ({
  Oswald: () => ({ className: 'mocked-oswald' })
}));

const mockTranslations: Record<string, string> = {
  office: 'Кабінет',
  name: 'Лятушинського',
  goToOfficeButton: 'Увійти до кабінету'
};

const mockTWithTranslations = (key: string) => {
  return mockTranslations[key] || key;
};
const mockT = mockTWithTranslations as ReturnType<typeof useTranslations>;
const mockData = {
  quote: {
    text: 'Текст моєї тестової цитати',
    author: 'Тестовий Автор',
    source: 'Тестове Джерело'
  }
};

describe('LiatoshynskyOffice', () => {
  beforeEach(() => {
    render(LiatoshynskyOffice({ data: mockData, t: mockT }));
  });

  it('should render the main text content from translations', () => {
    expect(screen.getByText('Кабінет')).toBeInTheDocument();
    expect(screen.getByText('Лятушинського')).toBeInTheDocument();
  });

  it('should render the mocked child components', () => {
    expect(screen.getByTestId('quote')).toBeInTheDocument();
    expect(screen.getByTestId('media')).toBeInTheDocument();
  });

  it('should render the call-to-action link with the correct href and text', () => {
    const link = screen.getByRole('link', { name: 'Увійти до кабінету' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/office');
  });

  it('should apply the correct font class to the text block', async () => {
    const textElement = await screen.findByText('Кабінет');
    expect(textElement.parentElement).toHaveClass('mocked-oswald');
  });
});
