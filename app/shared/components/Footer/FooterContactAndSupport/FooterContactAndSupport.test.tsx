import { render, screen } from '@testing-library/react';

import FooterContactAndSupport from './FooterContactAndSupport';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('FooterContactAndSupport', () => {
  const contact = {
    text: 'Contact Us',
    link: '/contact'
  };
  const donation = {
    text: 'Donate',
    link: 'https://example.com/donate'
  };

  it('renders both buttons correctly', () => {
    render(<FooterContactAndSupport contact={contact} donation={donation} />);

    expect(screen.getByRole('link', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /donate/i })).toHaveAttribute('href', donation.link);
  });
});
