import { render, screen } from '@testing-library/react';
import Home from './page';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      'text': 'Liatoshynsky project',
    };
    return translations[key];
  }),
  setRequestLocale: jest.fn()
}));

describe('Home component', () => {
  it('should render Home component correctly', async () => {
    render(await Home ({ params: Promise.resolve({ lang: 'en' }) }));
    expect(await screen.findByText(/Liatoshynsky project/i)).toBeInTheDocument();
  });
});
