import { render, screen } from '@testing-library/react';
import LiatoshynskyOffice from './LiatoshynskyOffice';
import React from 'react';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'home.liatoshynskyOffice.office': 'Кабінет',
      'home.liatoshynskyOffice.name': 'Лятушинського',
      'home.liatoshynskyOffice.goToOfficeButton': 'Увійти до кабінету',
      'quote.mainText': 'Це тестова цитата',
      'quote.sourceText.tittle': 'Тестовий опис',
      'quote.sourceText.data': 'Тестова дата',
      'quote.sourceText.place': 'Тестове місце'
    };
    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

jest.mock('~/shared/components/Quote/Quote', () => {
  const MockQuote = () => <div data-testid="quote" />;
  MockQuote.displayName = 'MockQuote';
  return MockQuote;
});

jest.mock('~/shared/components/Liatoshynsky-office/office-media/OfficeMedia', () => {
  const MockOfficeMedia = () => <div data-testid="media" />;
  MockOfficeMedia.displayName = 'MockOfficeMedia';
  return MockOfficeMedia;
});

jest.mock('~/shared/components/design-system/all-components/button/Button', () => {
  const MockButton = ({ label }: { label: string }) => <button>{label}</button>;
  MockButton.displayName = 'MockButton';
  return MockButton;
});

jest.mock('next/font/google', () => ({
  Oswald: () => ({ className: 'mocked-oswald' })
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('LiatoshynskyOffice', () => {
  beforeEach(async () => {
    render(await LiatoshynskyOffice());
  });

  it('should render the main text content from translations', async () => {
    expect(await screen.findByText('Кабінет')).toBeInTheDocument();
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
