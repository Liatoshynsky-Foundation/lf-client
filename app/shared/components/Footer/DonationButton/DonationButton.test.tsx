import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationButton from './DonationButton';

jest.mock('@public/icons/donation-button.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="donation-icon" />
}));

const mockData = {
  text: 'Donate Now',
  link: '/donate'
};

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

  it('should render button with the icon', () => {
    const icon = screen.getByTestId('donation-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.parentElement).toHaveAttribute('aria-label', 'Donation Button');
  });
});
