import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import FooterContactAndSupport from './FooterContactAndSupport';
import { ButtonData } from './types';

const mockContactUs: ButtonData = {
  text: 'Напишіть нам',
  link: '/contact-us'
};

const mockDonation: ButtonData = {
  text: 'Підтримати діяльність фундації',
  link: '/donate'
};

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('FooterContactAndSupport', () => {
  it('renders both buttons with correct text and links', () => {
    render(<FooterContactAndSupport contactUs={mockContactUs} donation={mockDonation} />);

    const contactButton = screen.getByRole('button', { name: /напишіть нам/i });
    const donationButton = screen.getByRole('button', { name: /підтримати діяльність фундації/i });

    expect(contactButton).toBeInTheDocument();
    expect(donationButton).toBeInTheDocument();

    expect(contactButton.closest('a')).toHaveAttribute('href', '/contact-us');
    expect(donationButton.closest('a')).toHaveAttribute('href', '/donate');
  });
});
