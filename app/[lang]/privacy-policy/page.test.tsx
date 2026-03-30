import { render, screen } from '@testing-library/react';
import React from 'react';

import PrivacyPolicy, { generateMetadata } from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';
import * as envUtils from '~/utils/isProductionMode';

jest.mock('~/services/pages-data/resolvePageData');
jest.mock('~/utils/isProductionMode', () => ({
  isProductionMode: jest.fn()
}));

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => key),
  setRequestLocale: jest.fn()
}));

jest.mock('~/lib/utils/errorPageFactory', () => ({
  ErrorPageFactory: jest.fn((err) => <div data-testid="error-page">Error: {err}</div>)
}));

jest.mock('../[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="not-found-page">Page Not Found</div>
}));

jest.mock('~/components/blocks/privacy-policy/intro-section/IntroSection', () => {
  const MockIntro = ({ title }: { title: string }) => <div>Intro section: {title}</div>;
  MockIntro.displayName = 'IntroSection';
  return MockIntro;
});

jest.mock('~/components/blocks/privacy-policy/policy-section/PolicySection', () => {
  const MockPolicy = ({ title }: { title?: string }) => <div>Policy section: {title ?? 'untitled'}</div>;
  MockPolicy.displayName = 'PolicySection';
  return MockPolicy;
});

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

describe('PrivacyPolicy page', () => {
  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };

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

  it('should render all available blocks', async () => {
    resolvePageData.mockResolvedValueOnce(
      WrapSuccess({
        title: 'Privacy Policy',
        blocks: {
          IntroSection: { trustAndSecurity: {}, agreement: {} },
          DataWeCollect: { title: 'Data We Collect', description: {}, sections: [], note: {} },
          DataUsage: { title: 'How We Use Data', description: {}, list: [] },
          Cookies: { title: 'Cookies', description: {}, list: [], note: {} },
          GoogleAuth: { title: 'Google Auth', description: {}, list: [], note: {} },
          SocialNetworks: { title: 'Social Networks', description: {} },
          TargetedAds: { title: 'Targeted Ads', description: {} },
          NewsletterSubscription: { title: 'Newsletter', description: {} },
          DataRetention: { title: 'Data Retention', description: {} },
          UserRights: { title: 'Your Rights', description: {}, list: [], note: {} },
          ContactUs: { title: 'Contact Us', description: {} }
        }
      })
    );

    render(await PrivacyPolicy({ params: mockParams }));

    expect(resolvePageData).toHaveBeenCalledWith('privacy-policy', 'en');
    expect(screen.getByText(/Intro section: Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Data We Collect/i)).toBeInTheDocument();
  });

  it('should render UnderDevelopment in production mode', async () => {
    (envUtils.isProductionMode as jest.Mock).mockReturnValue(true);

    render(await PrivacyPolicy({ params: mockParams }));

    expect(screen.getByTestId('under-dev')).toBeInTheDocument();
    expect(resolvePageData).not.toHaveBeenCalled();
  });

  it('should render ErrorPage when service returns error', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('No page found'));

    render(await PrivacyPolicy({ params: mockParams }));

    expect(screen.getByTestId('error-page')).toHaveTextContent('Error: No page found');
  });

  it('should render PageNotFound when page is null', async () => {
    resolvePageData.mockResolvedValueOnce(WrapSuccess(null));

    render(await PrivacyPolicy({ params: mockParams }));

    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });
});
