import { render, screen } from '@testing-library/react';
import { useTranslations } from 'next-intl';
import React from 'react';

jest.mock('~/lib/utils/navigationHelper', () => ({
  getNavigationLink: jest.fn().mockResolvedValue('/archive')
}));

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

import LiatoshynskyOffice from './LiatoshynskyOffice';

const mockTranslations: Record<string, string> = {
  office: 'Кабінет',
  name: 'Лятушинського',
  goToOfficeButton: 'Увійти до архіву'
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
  const setupComponent = async () => {
    const component = await LiatoshynskyOffice({ data: mockData, t: mockT });
    render(component);
  };

  it.each([
    ['text content', 'Кабінет'],
    ['text content', 'Лятушинського']
  ])('should render the main %s from translations: %s', async (_, text) => {
    await setupComponent();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it.each([
    ['quote', 'quote'],
    ['media', 'media']
  ])('should render the %s component', async (description, testId) => {
    await setupComponent();
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the call-to-action link with correct attributes', async () => {
    await setupComponent();
    const link = screen.getByRole('link', { name: 'Увійти до архіву' });
    expect(link).toHaveAttribute('href', '/archive');
  });

  it('should apply the correct font class to the text block', async () => {
    await setupComponent();
    const textElement = screen.getByText('Кабінет');
    expect(textElement.parentElement).toHaveClass('mocked-oswald');
  });
});
