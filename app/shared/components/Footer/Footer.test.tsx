import { render, screen } from '@testing-library/react';
import { getLocale } from 'next-intl/server';

import Footer from '~/components/Footer/Footer';

import { createRequestContainer } from '~/di/container';

jest.mock('next-intl/server', () => ({
  getLocale: jest.fn().mockResolvedValue('en'),
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations = {
      donationButton: 'Donate Now',
      donationButtonShort: 'Donate'
    };
    return translations[key as keyof typeof translations] ?? key;
  })
}));

jest.mock('~/di/container', () => {
  const mockGetFooterData = jest.fn().mockResolvedValue({
    contacts: {
      foundationName: 'Test Foundation',
      email: 'test@example.com',
      phone: '123456'
    },
    contactButtonLink: '/contact-us',
    socialLinks: [
      {
        platform: 'Instagram',
        link: 'https://instagram.com',
        icon: 'instagram'
      },
      {
        platform: 'Facebook',
        link: 'https://facebook.com',
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
        links: [{ label: 'Home', href: '/', visibility: 'true' }]
      },
      {
        title: 'Support',
        links: [{ label: 'Contacts', href: '/contacts', visibility: 'true' }]
      }
    ]
  });

  return {
    createRequestContainer: jest.fn().mockReturnValue({
      resolve: jest.fn().mockReturnValue({
        getFooterData: mockGetFooterData
      })
    })
  };
});

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('~/components/design-system/all-components/language-switcher/LanguageSwitcher', () => ({
  __esModule: true,
  default: jest.fn(() => <div>LanguageSwitcher Mock</div>)
}));

jest.mock('~/public/icons/donation-button.svg', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => (
    <svg aria-label="Donation Button" data-testid="donation-icon-svg" {...props} />
  )
}));

jest.mock('~/public/images/logo.svg', () => ({
  __esModule: true,
  default: (props: React.SVGProps<SVGSVGElement>) => <svg aria-label="Company logo" data-testid="icon-svg" {...props} />
}));

describe('Footer component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render footer content correctly with enhanced contacts navigation link', async () => {
    (getLocale as jest.Mock).mockResolvedValue('en');

    const footerComponent = await Footer();
    render(footerComponent);

    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Terms of Use/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123456/i)).toBeInTheDocument();
    expect(screen.getByText(/Donate Now/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2025 My Company/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Foundation/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute('href', 'https://instagram.com');
    expect(screen.getByRole('link', { name: /facebook/i })).toHaveAttribute('href', 'https://facebook.com');
    expect(screen.getByRole('link', { name: /donate/i })).toHaveAttribute('href', '/donate');
  });

  it('should fall back to empty contactUsLink path if second navigation layer is missing', async () => {
    const containerInstance = createRequestContainer();
    const serviceInstance = containerInstance.resolve('footerService');
    (serviceInstance.getFooterData as jest.Mock).mockResolvedValueOnce({
      contacts: { foundationName: 'Test Foundation', email: 'test@example.com', phone: '123456' },
      socialLinks: [],
      supportButtonLink: '/donate',
      publicInfo: { text: '© 2025 My Company', links: [] },
      navigation: [
        {
          title: 'Main',
          links: [{ label: 'Home', href: '/', visibility: 'true' }]
        }
      ]
    });

    const footerComponent = await Footer();
    render(footerComponent);

    expect(screen.getByText(/Donate Now/i)).toBeInTheDocument();
  });

  it('should process donation button short text translation formatting when language is non english', async () => {
    (getLocale as jest.Mock).mockResolvedValue('uk');

    const footerComponent = await Footer();
    render(footerComponent);

    expect(screen.getByText(/Donate Now/i)).toBeInTheDocument();
  });
});
