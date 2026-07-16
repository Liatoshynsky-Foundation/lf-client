import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import WarInUkraine, { generateMetadata } from './page';
import { createSeoMeta } from '~/utils/createSeoMeta';
import * as envUtils from '~/utils/isProductionMode';

jest.mock('next-intl', () => ({
  useLocale: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockLayout.displayName = 'MainLayout';
  return MockLayout;
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDev = () => <div data-testid="under-dev">Under Development</div>;
  MockUnderDev.displayName = 'UnderDevelopment';
  return MockUnderDev;
});

jest.mock('~/components/blocks/war-info/WarInfoSection', () => {
  const MockWarInfo = () => <div>War Info</div>;
  MockWarInfo.displayName = 'WarInfoSection';
  return MockWarInfo;
});

jest.mock('~/components/blocks/war-carousel/WarCarouselSection', () => {
  const MockWarCarousel = () => <div>War Carousel</div>;
  MockWarCarousel.displayName = 'WarCarouselSection';
  return MockWarCarousel;
});

jest.mock('~/components/blocks/volunteer-donation/VolunteerDonation', () => {
  const MockDonation = () => <div>Volunteer Donation</div>;
  MockDonation.displayName = 'VolunteerDonation';
  return MockDonation;
});
jest.mock('~/ds-components/bullet-text-with-links/BulletTextWithLinks', () => {
  const MockBullet = ({ buttonText }: { buttonText: string }) => <div data-testid="bullet-section">{buttonText}</div>;
  MockBullet.displayName = 'BulletTextWithLinks';
  return MockBullet;
});

jest.mock('~/utils/createSeoMeta', () => ({
  createSeoMeta: jest.fn((data) => data)
}));

describe('WarInUkraine Page', () => {
  const mockParams = Promise.resolve({ lang: 'uk' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('uk');
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate metadata correctly', async () => {
    const metadata = await generateMetadata({ params: mockParams });

    expect(createSeoMeta).toHaveBeenCalledWith({
      title: 'title',
      description: 'description',
      url: expect.any(String),
      locale: 'uk'
    });

    expect(metadata).toEqual({
      title: 'title',
      description: 'description',
      url: expect.any(String),
      locale: 'uk'
    });
  });

  it('should render all sections when not in production', () => {
    render(<WarInUkraine />);

    expect(screen.getByText('War Info')).toBeInTheDocument();
    expect(screen.getByText('War Carousel')).toBeInTheDocument();
    expect(screen.getByText('Volunteer Donation')).toBeInTheDocument();

    expect(screen.getByText('Підтримати')).toBeInTheDocument();
  });

  it('should render content in English locale', () => {
    (useLocale as jest.Mock).mockReturnValue('en');
    render(<WarInUkraine />);

    expect(screen.getByText('Support the Foundation')).toBeInTheDocument();
  });

  it('should render UnderDevelopment in production mode', () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);
    render(<WarInUkraine />);

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
    expect(screen.queryByText('War Info')).not.toBeInTheDocument();
  });
});
