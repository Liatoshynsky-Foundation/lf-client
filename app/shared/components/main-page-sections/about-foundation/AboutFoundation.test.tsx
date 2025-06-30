import { render, screen } from '@testing-library/react';

import AboutFoundation from './AboutFoundation';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const AboutFoundationtranslations: Record<string, string> = {
      'home.aboutFoundation.aboutFoundationTitle': 'Про Фундацію',
      'home.aboutFoundation.organisationText.boldText': 'Організація',
      'home.aboutFoundation.organisationText.text': '- це',
      'home.aboutFoundation.mainText': 'Головний текст',
      'home.aboutFoundation.textImage': 'Текст біля зображення',
      'quote.mainText': 'Це тестова цитата',
      'quote.sourceText.tittle': 'Тестовий опис',
      'quote.sourceText.data': 'Тестова дата',
      'quote.sourceText.place': 'Тестове місце'
    };
    return (key: string) => AboutFoundationtranslations[`${namespace}.${key}`] || key;
  })
}));

jest.mock('~/shared/components/Quote/Quote', () => {
  const AboutFoundationMockQuote = () => <div data-testid="quote" />;
  AboutFoundationMockQuote.displayName = 'AboutFoundationMockQuote';
  return AboutFoundationMockQuote;
});

describe('About foundation', () => {
  beforeEach(async () => {
    render(await AboutFoundation());
  });

  it('should render the About Foundation component', async () => {
    expect(await screen.getByText('Про Фундацію')).toBeInTheDocument();
    expect(screen.getByText('Організація')).toBeInTheDocument();
    expect(screen.getByText('- це')).toBeInTheDocument();
    expect(screen.getByText('Головний текст')).toBeInTheDocument();
    expect(screen.getByText('Текст біля зображення')).toBeInTheDocument();
  });
});
