import { render, screen } from '@testing-library/react';
import React from 'react';

import DonationButton from './DonationButton';

const mockData = {
  text: 'Donate Now',
  link: '/donate'
};

describe('DonationButton', () => {
  beforeEach(() => {
    render(<DonationButton {...mockData} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button with correct label', () => {
    const button = screen.getByRole('button', { name: /donate now/i });
    expect(button).toBeInTheDocument();
  });

  it('should render button with the icon', () => {
    const icon = screen.getByAltText('Donation Button');
    expect(icon).toBeInTheDocument();
  });
});
