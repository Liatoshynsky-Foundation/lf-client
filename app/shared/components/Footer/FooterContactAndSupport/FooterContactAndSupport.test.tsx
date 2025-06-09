import { render, screen } from '@testing-library/react';

import FooterContactAndSupport from './FooterContactAndSupport';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('FooterContactAndSupport', () => {
  const contactLabel = 'Contact us';
  const donation = {
    text: 'Donate',
    link: 'https://example.com/donate'
  };

  it('renders both buttons correctly', () => {
    render(<FooterContactAndSupport contactLabel={contactLabel} donation={donation} />);

    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /donate/i })).toHaveAttribute('href', donation.link);
  });
});
