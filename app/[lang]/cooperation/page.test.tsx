import { render, screen } from '@testing-library/react';
import React from 'react';

import Collaboration, { generateMetadata } from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';
import * as envUtils from '~/utils/isProductionMode';

const getPageData = jest.fn();

jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getPageData
    })
  })
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn((err) => <div data-testid="error-page">Error: {err}</div>)
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

jest.mock('../[...unknown-route]/page-not-found/pageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found-page">Page Not Found</div>
}));

jest.mock('~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro', () => {
  const Mock = () => <div>Collaboration Intro</div>;
  Mock.displayName = 'CollaborationIntro';
  return Mock;
});
jest.mock('~/shared/components/blocks/partnership-formats/PartnershipFormats', () => {
  const Mock = () => <div>Partnership Formats</div>;
  Mock.displayName = 'PartnershipFormats';
  return Mock;
});
jest.mock('~/shared/components/blocks/collaboration/collaboration-info/CollaborationInfo', () => {
  const Mock = () => <div>Collaboration Info</div>;
  Mock.displayName = 'CollaborationInfo';
  return Mock;
});
jest.mock('~/shared/components/blocks/our-partners/OurPartners', () => {
  const Mock = () => <div>Our Partners</div>;
  Mock.displayName = 'OurPartners';
  return Mock;
});

jest.mock('~/shared/components/blocks/collaboration/offer-collaboration/OfferCollaboration', () => {
  const Mock = () => <div>Offer Collaboration</div>;
  Mock.displayName = 'OfferCollaboration';
  return Mock;
});

describe('Collaboration Page', () => {
  const mockParams = Promise.resolve({ lang: 'en' as const });

  beforeEach(() => {
    jest.clearAllMocks();
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(false);
  });

  it('should generate correct metadata', async () => {
    const metadata = await generateMetadata({ params: mockParams });
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe('title');
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);
    const ui = await Collaboration({ params: mockParams });
    render(ui);
    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
  });

  it('should render all collaboration blocks when data exists', async () => {
    getPageData.mockResolvedValue(
      WrapSuccess({
        blocks: { partnershipFormats: {} }
      })
    );

    const ui = await Collaboration({ params: mockParams });
    render(ui);

    expect(screen.getByText(/Collaboration Intro/i)).toBeInTheDocument();
    expect(screen.getByText(/Partnership Formats/i)).toBeInTheDocument();
    expect(screen.getByText(/Collaboration Info/i)).toBeInTheDocument();
    expect(screen.getByText(/Our Partners/i)).toBeInTheDocument();
    expect(screen.getByText(/Offer Collaboration/i)).toBeInTheDocument();
  });

  it('should render ErrorPage when service returns error', async () => {
    getPageData.mockResolvedValue(WrapError('Service Failure'));
    const ui = await Collaboration({ params: mockParams });
    render(ui);
    expect(screen.getByTestId('error-page')).toHaveTextContent('Service Failure');
  });

  it('should render PageNotFound when page is null', async () => {
    getPageData.mockResolvedValue(WrapSuccess(null));
    const ui = await Collaboration({ params: mockParams });
    render(ui);
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
