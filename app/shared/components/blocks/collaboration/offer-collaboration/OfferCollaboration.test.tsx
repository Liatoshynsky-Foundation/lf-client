import { render, screen } from '@testing-library/react';
import React from 'react';

import OfferCollaboration from './OfferCollaboration';

jest.mock('next-intl/server', () => ({
  getLocale: jest.fn().mockResolvedValue('uk'),
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'collaboration.offerCollaboration.title': 'Співпраця',
      'collaboration.offerCollaboration.formTitle': 'Запропонувати співпрацю'
    };

    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn().mockReturnValue({
    resolve: jest.fn().mockReturnValue({
      getFooterData: jest.fn().mockResolvedValue({
        contacts: {
          email: 'test@example.com',
          phone: '123456'
        },
        socialLinks: [
          {
            platform: 'Instagram',
            link: 'https://instagram.com/foundation',
            icon: 'instagram'
          },
          {
            platform: 'Facebook',
            link: 'https://facebook.com/foundation',
            icon: 'facebook'
          }
        ]
      })
    })
  })
}));

jest.mock('~/shared/components/paper-component/PaperComponent', () => ({
  __esModule: true,
  default: ({ sx }: any) => (
    <div data-testid="paper" style={sx}>
      PaperComponent
    </div>
  )
}));

jest.mock('~/[lang]/contacts/ContactsInfo/ContactsInfo', () => ({
  __esModule: true,
  default: ({ title, formTitle, titleTag, contacts, socialLinks }: any) => (
    <div data-testid="contacts-info">
      {titleTag === 'h2' ? <h2>{title}</h2> : <h1>{title}</h1>}
      <span>{formTitle}</span>
      <div>{contacts.email}</div>
      <div>{socialLinks[0].platform}</div>
    </div>
  )
}));

describe('OfferCollaboration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with fetched data', async () => {
    render(await OfferCollaboration());

    expect(screen.getByTestId('paper')).toBeInTheDocument();
    expect(screen.getByTestId('contacts-info')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Співпраця' })).toBeInTheDocument();
    expect(screen.getByText('Запропонувати співпрацю')).toBeInTheDocument();

    expect(screen.getByText(/test@example\.com/)).toBeInTheDocument();
    expect(screen.getByText(/Instagram/i)).toBeInTheDocument();
  });
});
