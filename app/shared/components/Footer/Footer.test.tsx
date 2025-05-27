import Footer from '~/shared/components/Footer/Footer';
import {render, screen} from '@testing-library/react';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      copyright: '© 2025 My Company',
      link_privacy: 'Privacy Policy',
      link_terms: 'Terms of Use',
      link_media: 'Media Kit',
    };
    return translations[key];
  })
}));

describe('Footer component', () => {
  it('should render Footer component correctly', async () => {
    render(await Footer());
    expect(await screen.findByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  it('has child elements', () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector('footer');
    expect(footerElement?.children.length).toBeGreaterThan(0);
  });
});
