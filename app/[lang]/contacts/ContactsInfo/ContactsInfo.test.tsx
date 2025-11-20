import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React, { JSX } from 'react';

import ContactsInfo from './ContactsInfo';

import type { LinkIcon } from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) =>
    ({
      contacts: 'Contacts',
      phoneNumber: 'Phone number',
      email: 'Email',
      socialMedia: 'We are on social media',
      formTitle: 'Contact form',
      formSubtitle: 'Send a request and we will contact you within a few business days'
    })[key] ?? key
}));

jest.mock('~/shared/components/forms/contact-form/ContactForm', () => ({
  __esModule: true,
  default: () => <div data-testid="contact-form" />
}));

jest.mock('~/components/forms/offer-collaboration-form/OfferCollaborationForm', () => ({
  __esModule: true,
  default: ({ formTitle, formSubtitle, sx }: any) => (
    <div data-testid="OfferCollaborationForm" data-sx={JSON.stringify(sx)}>
      <h5>{formTitle}</h5>
      <div>{formSubtitle}</div>
    </div>
  )
}));

type FooterProps = { media?: LinkIcon[] };

jest.mock('~/shared/components/Footer/footer-social-media/FooterSocialMedia', () => {
  const Mock: jest.MockedFunction<(props: FooterProps) => JSX.Element> = jest.fn((props: FooterProps) =>
    React.createElement('div', {
      'data-testid': 'footer-social-media',
      'data-count': props.media?.length ?? 0
    })
  );
  return { __esModule: true, default: Mock, LinkIcon: {} };
});

import FooterSocialMedia from '~/shared/components/Footer/footer-social-media/FooterSocialMedia';
const FooterSocialMediaMock = FooterSocialMedia as unknown as jest.MockedFunction<(props: FooterProps) => JSX.Element>;

const contacts: { phone: string; email: string } = {
  phone: '067 963 8366',
  email: 'liatoshynsky@gmail.com'
};
const socialLinks: LinkIcon[] = [
  { link: 'https://fb.com', icon: 'fb' },
  { link: 'https://instagram.com', icon: 'ig' }
];

describe('ContactsInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render headings and translations', () => {
    render(<ContactsInfo contacts={contacts} socialLinks={socialLinks} />);

    expect(screen.getByRole('heading', { level: 2, name: 'Contacts' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 5, name: 'Contact form' })).toBeInTheDocument();

    expect(screen.getByText('We are on social media:')).toBeInTheDocument();
    expect(screen.getByText('Send a request and we will contact you within a few business days')).toBeInTheDocument();

    expect(screen.getByText('Phone number:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
  });

  it('should render headings from props', () => {
    render(
      <ContactsInfo
        title="Collaboration"
        formTitle="Offer collaboration"
        contacts={contacts}
        socialLinks={socialLinks}
      />
    );

    expect(screen.getByText('Collaboration')).toBeInTheDocument();
    expect(screen.getByText('Offer collaboration')).toBeInTheDocument();
  });

  it('should show phone and email values as links', () => {
    render(<ContactsInfo contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByText(contacts.phone).closest('a')).toBeInTheDocument();
    expect(screen.getByText(contacts.email).closest('a')).toBeInTheDocument();
  });

  it('should render social media component with provided links', () => {
    render(<ContactsInfo contacts={contacts} socialLinks={socialLinks} />);

    expect(screen.getByTestId('footer-social-media')).toBeInTheDocument();
    expect(FooterSocialMediaMock).toHaveBeenCalledTimes(1);

    const firstCallProps = FooterSocialMediaMock.mock.calls[0][0] as FooterProps;
    expect(firstCallProps.media).toEqual(socialLinks);
  });

  it('should render the contact form', () => {
    render(<ContactsInfo contacts={contacts} socialLinks={socialLinks} />);
    expect(screen.getByTestId('OfferCollaborationForm')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 5, name: 'Contact form' })).toBeInTheDocument();
  });
});
