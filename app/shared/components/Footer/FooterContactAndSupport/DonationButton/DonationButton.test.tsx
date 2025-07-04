import { render, screen } from '@testing-library/react';
import React from 'react';

import { ButtonData } from '../types';
import DonationButton from './DonationButton';

jest.mock('@public/icons/donation-button.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="donation-icon" />
}));

const mockData: ButtonData = {
  text: 'Donate Now',
  link: '/donate'
};

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('DonationButton', () => {
  beforeEach(() => {
    render(<DonationButton data={mockData} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button with correct label', () => {
    const button = screen.getByRole('button', { name: /donate now/i });
    expect(button).toBeInTheDocument();
  });

  it('should render the donation icon with correct alt text', () => {
    const icon = screen.getByAltText('Donation Button');
    expect(icon).toBeInTheDocument();
  });

  it('should have correct link in wrapper', () => {
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/donate');
  });
});
