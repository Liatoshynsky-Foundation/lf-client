import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

jest.mock('~/shared/components/blocks/HeroSection/HeroSection', () => ({
  HeroSection: () => <div data-testid="HeroSection" />
}));

import Biography from './page';

it('should render HeroSection on the Biography page', async () => {
  render(<Biography />);

  const heroSection = await screen.findByTestId('HeroSection');

  expect(heroSection).toBeInTheDocument();
});
