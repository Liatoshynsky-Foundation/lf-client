import React from 'react';
import { render, screen } from '@testing-library/react';
import DonationButton from './DonationButton';

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

  test('renders button with correct label', () => {
    const button = screen.getByRole('button', { name: /donate now/i });
    expect(button).toBeInTheDocument();
  });

  test('renders button with the icon', () => {
    const icon = screen.getByAltText('Donation Button');
    expect(icon).toBeInTheDocument();
  });
});
