import { render, screen } from '@testing-library/react';

import Footer from '~/components/Footer/Footer';

jest.mock('next-intl/server', () => ({
  getLocale: jest.fn().mockResolvedValue('en'),
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations = {
      donationButton: 'Donate Now'
    };
    return translations[key as keyof typeof translations] ?? key;
  })
}));

jest.mock('~/di/container', () => ({
  createRequestContainer: jest.fn().mockReturnValue({
    resolve: jest.fn().mockReturnValue({
      getFooterData: jest.fn().mockResolvedValue({
        contacts: {
          foundationName: 'Test Foundation',
          email: 'test@example.com',
          phone: '123456'
        },
        contactButtonLink: '/contact-us',
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
        ],
        supportButtonLink: '/donate',
        publicInfo: {
          text: '© 2025 My Company',
          links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Use', href: '/terms' }
          ]
        },
        navigation: [
          {
            title: 'Main',
            links: [
              { label: 'Home', href: '/', visibility: 'true' },
              { label: 'About', href: '/about', visibility: 'true' }
            ]
          }
        ]
      })
    })
  })
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('~/components/design-system/all-components/language-switcher/LanguageSwitcher', () => ({
  __esModule: true,
  default: jest.fn(() => <div>LanguageSwitcher Mock</div>)
}));

jest.mock('~/public/icons/donation-button.svg', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => {
    return <svg aria-label="Donation Button" data-testid="donation-icon-svg" {...props} />;
  }
}));

jest.mock('~/public/images/logo.svg', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => <svg aria-label="Company logo" data-testid="icon-svg" {...props} />
}));

describe('Footer component', () => {
  it('should render footer content correctly', async () => {
    // 1. Рендерим один раз, дожидаясь асинхронного Footer
    const footerComponent = await Footer();
    render(footerComponent);

    // 2. Используем getByText для мгновенной проверки (так как render уже завершен)
    // Если getByText упадет, мы сразу увидим какой именно текст не найден, без ожидания 5 секунд
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Use/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/About/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123456/i)).toBeInTheDocument();
    expect(screen.getByText(/Donate Now/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2025 My Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Foundation/i)).toBeInTheDocument();

    // 3. Ссылки соцсетей
    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute(
      'href',
      'https://instagram.com/foundation'
    );
    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', 'https://facebook.com/foundation');

    // 4. Кнопки
    expect(screen.getByRole('link', { name: /donate/i })).toHaveAttribute('href', '/donate');
  });
});
