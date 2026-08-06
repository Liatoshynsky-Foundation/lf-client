import { render, screen } from '@testing-library/react';
import React from 'react';

import LiatoshynskyOffice from './LiatoshynskyOffice';

import { ROUTES } from '~/shared/components/constants/routes';

const mockData = {
  quote: {
    text: 'Текст моєї тестової цитати',
    author: 'Тестовий Автор',
    source: 'Тестове Джерело'
  }
};

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

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn()
}));

describe('LiatoshynskyOffice', () => {
  const { getTranslations } = jest.requireMock('next-intl/server');

  beforeEach(() => {
    jest.clearAllMocks();

    getTranslations.mockResolvedValue((key: 'office' | 'name' | 'goToOfficeButton') => {
      const translations = {
        office: 'АрХів',
        name: 'ЛЯтоШинСькоГO',
        goToOfficeButton: 'Увійти до архіву'
      };
      return translations[key] || key;
    });
  });

  const setupComponent = async () => {
    const component = await LiatoshynskyOffice({ data: mockData });
    render(component);
  };

  it.each([
    ['text content', 'АрХів'],
    ['text content', 'ЛЯтоШинСькоГO']
  ])('should render the main %s from translations: %s', async (_, text) => {
    await setupComponent();
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it.each([
    ['quote', 'quote'],
    ['media', 'media']
  ])('should render the %s component', async (_, testId) => {
    await setupComponent();
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('should render the call-to-action link with correct attributes', async () => {
    await setupComponent();
    const link = screen.getByRole('link', { name: 'Увійти до архіву' });
    expect(link).toHaveAttribute('href', ROUTES.ARCHIVE);
  });

  it('should apply the correct font class to the text block', async () => {
    await setupComponent();
    const textBlock = screen.getByTestId('LiatoshynskyOffice-textBlock');
    expect(textBlock).toHaveClass('mocked-oswald');
  });
});
