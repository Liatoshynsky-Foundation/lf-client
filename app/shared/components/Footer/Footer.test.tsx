import Footer from '~/components/Footer/Footer';
import { render, screen } from '@testing-library/react';

jest.mock('@public/icons/donation-button.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="donation-icon" />
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      copyright: '© 2025 My Company',
      linkPrivacy: 'Privacy Policy',
      linkTerms: 'Terms of Use',
      linkMedia: 'Media Kit'
    };
    return translations[key];
  })
}));

describe('Footer component', () => {
  it('should render Footer component correctly', async () => {
    render(await Footer());
    expect(await screen.findByText(/Privacy Policy/i)).toBeInTheDocument();
  });
});
