import { render, screen } from '@testing-library/react';
import React from 'react';

import DonationButton from './DonationButton';
import { type ButtonData } from '~/types/types/common.types';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('~/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ alt, src }: { alt: string; src: string }) => <img data-testid="donation-icon" alt={alt} src={src} />
}));

jest.mock('~/ds-components/button/Button');

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn()
}));

const mockedUseBreakpoints = useBreakpoints as jest.Mock;

describe('DonationButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const baseData: ButtonData = {
    text: 'Donate Now',
    link: '/donate'
  };

  it('should render desktop label when not mobile', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    render(<DonationButton data={baseData} />);
    expect(screen.getByRole('button', { name: /donate now/i })).toBeInTheDocument();
  });

  it('should render shortText when mobile and shortText is provided', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });
    const dataWithShort: ButtonData = { ...baseData, shortText: 'Donate' };
    render(<DonationButton data={dataWithShort} />);
    expect(screen.getByRole('button', { name: /donate$/i })).toBeInTheDocument();
  });

  it('should fallback to text when mobile and shortText is absent', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: true });
    render(<DonationButton data={baseData} />);
    expect(screen.getByRole('button', { name: /donate now/i })).toBeInTheDocument();
  });

  it('should render icon with correct alt text', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    render(<DonationButton data={baseData} />);
    expect(screen.getByAltText('Donation Button')).toBeInTheDocument();
    expect(screen.getByTestId('donation-icon')).toBeInTheDocument();
  });

  it('should wrap button with correct link', () => {
    mockedUseBreakpoints.mockReturnValue({ isMobile: false });
    render(<DonationButton data={baseData} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/donate');
  });
});
