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

jest.mock('~/components/blocks/privacy-policy/intro-section/IntroSection', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>Intro section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/data-we-collect/DataWeCollect', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>DataWeCollect section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/data-usage/DataUsage', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>DataUsage section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/cookies/Cookies', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>Cookies section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/google-auth/GoogleAuth', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>GoogleAuth section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/social-networks/SocialNetworks', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>SocialNetworks section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/targeted-ads/TargetedAds', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>TargetedAds section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/newsletter-subscription/NewsletterSubscription', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>NewsletterSubscription section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/data-retention/DataRetention', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>DataRetention section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/user-rights/UserRights', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>UserRights section: {data.title}</div>
}));

jest.mock('~/components/blocks/privacy-policy/contact-us/ContactUs', () => ({
  __esModule: true,
  default: ({ data }: any) => <div>ContactUs section: {data.title}</div>
}));

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

jest.mock('~/components/under-development/UnderDevelopment', () => ({
  __esModule: true,
  default: () => <div data-testid="under-dev">Under Development</div>
}));

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
        },
        blocksOrder: [
          'IntroSection',
          'DataWeCollect',
          'DataUsage',
          'Cookies',
          'GoogleAuth',
          'SocialNetworks',
          'TargetedAds',
          'NewsletterSubscription',
          'DataRetention',
          'UserRights',
          'ContactUs'
        ]
      })
    );

    render(await PrivacyPolicy({ params: mockParams }));

    expect(resolvePageData).toHaveBeenCalledWith('privacy-policy', 'en');

    const expectedBlocks = [
      /Intro section: Privacy Policy/i,
      /DataWeCollect section: Data We Collect/i,
      /DataUsage section: How We Use Data/i,
      /Cookies section: Cookies/i,
      /GoogleAuth section: Google Auth/i,
      /SocialNetworks section: Social Networks/i,
      /TargetedAds section: Targeted Ads/i,
      /NewsletterSubscription section: Newsletter/i,
      /DataRetention section: Data Retention/i,
      /UserRights section: Your Rights/i,
      /ContactUs section: Contact Us/i
    ];

    expectedBlocks.forEach((pattern) => {
      expect(screen.getByText(pattern)).toBeInTheDocument();
    });
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
