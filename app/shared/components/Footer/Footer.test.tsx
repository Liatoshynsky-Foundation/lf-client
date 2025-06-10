import { render, screen } from '@testing-library/react';

import Footer from '~/components/Footer/Footer';

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

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('~/components/design-system/all-components/language-switcher/LanguageSwitcher', () => ({
  __esModule: true,
  default: jest.fn(() => <div>LanguageSwitcher Mock</div>)
}));

jest.mock('~/../public/images/logo.svg', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => <svg aria-label="Company logo" data-testid="icon-svg" {...props} />
}));

describe('Footer component', () => {
  it('should render Footer component correctly', async () => {
    const { container } = render(await Footer());
    expect(await screen.findByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
