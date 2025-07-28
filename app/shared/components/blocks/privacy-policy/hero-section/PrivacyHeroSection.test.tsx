import { render, screen } from '@testing-library/react';
import React from 'react';

import PrivacyHeroSection from './PrivacyHeroSection';

describe('PrivacyHeroSection component', () => {
  it('should render section title', () => {
    render(<PrivacyHeroSection />);
    expect(screen.getByRole('heading', { name: /Політика Конфеденційності/i })).toBeInTheDocument();
  });

  it('should render first text block with highlighted words', () => {
    render(<PrivacyHeroSection />);
    expect(screen.getByText(/Ми цінуємо вашу довіру/i)).toBeInTheDocument();
    expect(screen.getByText('обробляємо')).toBeInTheDocument();
    expect(screen.getByText('гарантуємо')).toBeInTheDocument();
  });

  it('should render second text block with highlighted phrase', () => {
    render(<PrivacyHeroSection />);
    expect(screen.getByText(/Користуючись нашим сайтом/i)).toBeInTheDocument();
    expect(screen.getByText('ви погоджуєтесь з умовами')).toBeInTheDocument();
  });
});
