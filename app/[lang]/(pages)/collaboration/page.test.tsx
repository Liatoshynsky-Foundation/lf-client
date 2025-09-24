import { render, screen } from '@testing-library/react';

import Collaboration from './page';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      text: 'Collaborations'
    };
    return translations[key];
  }),
  setRequestLocale: jest.fn()
}));

describe('Collaboration component', () => {
  it('should render Collaboration component correctly', async () => {
    render(await Collaboration({ params: Promise.resolve({ lang: 'en' }) }));
    expect(await screen.findByText(/Collaborations/i)).toBeInTheDocument();
  });
});
