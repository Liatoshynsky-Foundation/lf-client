import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ContactsSection } from './NavContactsSection';
import { contactsData, LinkIcon } from '~/types/types/common.types';

jest.mock('~/shared/components/design-system/all-components/language-switcher/LanguageSwitcher', () => ({
  __esModule: true,
  default: ({ variant }: { variant: string }) => (
    <div data-testid="ContactsSection-languageSwitcher">LanguageSwitcher-{variant}</div>
  )
}));

jest.mock('~/shared/components/contact-link/ContactLink', () => ({
  __esModule: true,
  ContactLink: (props: any) => (
    <div data-testid={`mock-contact-${props.type}`}>
      {props.label && <span>{props.label}</span>}
      <span>{props.value}</span>
    </div>
  )
}));

jest.mock('~/shared/components/Footer/footer-social-media/FooterSocialMedia', () => ({
  __esModule: true,
  default: ({ media }: { media: any[] }) => (
    <div data-testid="mock-footer-social-media">
      {media.map((m) => (
        <a key={m.link} href={m.link}>
          {m.icon}
        </a>
      ))}
    </div>
  )
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      phoneNumber: 'Phone number',
      email: 'Email',
      socialMedia: 'We are on social media'
    })[key] ?? key,
  useLocale: () => 'en'
}));

const contacts: contactsData = {
  foundationName: 'Test Foundation',
  address: 'Test Address 12',
  phone: '+380990000000',
  email: 'test@example.com'
};

const socialLinks: LinkIcon[] = [
  { link: 'https://instagram.com', icon: 'inst.svg' },
  { link: 'https://facebook.com', icon: 'fb.svg' }
];

describe('ContactsSection', () => {
  test('should render phone and email links', () => {
    render(<ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile={false} />);
    expect(screen.getByTestId('mock-contact-phone')).toHaveTextContent(contacts.phone);
    expect(screen.getByTestId('mock-contact-email')).toHaveTextContent(contacts.email);
  });

  test('should render labels in desktop mode', () => {
    render(<ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile={false} />);
    expect(screen.getByText(/Phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
  });

  test('should not render labels in mobile mode', () => {
    render(<ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile />);
    expect(screen.getByTestId('mock-contact-phone')).toHaveTextContent(contacts.phone);
    expect(screen.queryByText(/Phone number/i)).not.toBeInTheDocument();
  });

  test('should render social media section with correct links', () => {
    render(<ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile={false} />);
    const links = screen.getByTestId('mock-footer-social-media').querySelectorAll('a');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://instagram.com');
    expect(links[1]).toHaveAttribute('href', 'https://facebook.com');
    expect(screen.getByText(/We are on social media/i)).toBeInTheDocument();
  });

  test('should render language switcher only on mobile', () => {
    const { rerender } = render(<ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile />);
    expect(screen.getByTestId('ContactsSection-languageSwitcher')).toBeInTheDocument();
    rerender(<ContactsSection contacts={contacts} socialLinks={socialLinks} isMobile={false} />);
    expect(screen.queryByTestId('ContactsSection-languageSwitcher')).not.toBeInTheDocument();
  });
});
