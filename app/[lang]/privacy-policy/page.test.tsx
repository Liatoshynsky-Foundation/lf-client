import { render, screen } from '@testing-library/react';

import PrivacyPolicy from './page';
import { WrapError, WrapSuccess } from '~/types/types/result';

jest.mock('~/services/pages-data/resolvePageData');
jest.mock('~/lib/utils/errorPageFactory');
jest.mock('../[...unknown-route]/page-not-found/PageNotFound');

jest.mock('~/components/blocks/privacy-policy/intro-section/IntroSection', () => {
  const MockIntroSection = ({ title }: { title: string }) => <div>Intro section: {title}</div>;
  MockIntroSection.displayName = 'MockIntroSection';
  return MockIntroSection;
});

jest.mock('~/components/blocks/privacy-policy/policy-section/PolicySection', () => {
  const MockPolicySection = ({ title }: { title?: string }) => <div>Policy section: {title ?? 'untitled'}</div>;
  MockPolicySection.displayName = 'MockPolicySection';
  return MockPolicySection;
});

describe('PrivacyPolicy page', () => {
  const { resolvePageData } = jest.requireMock('~/services/pages-data/resolvePageData') as {
    resolvePageData: jest.Mock;
  };

  beforeEach(() => {
    jest.clearAllMocks();
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

    render(await PrivacyPolicy({ params: Promise.resolve({ lang: 'en' }) }));

    expect(resolvePageData).toHaveBeenCalledWith('privacy-policy', 'en');

    expect(screen.getByText(/Intro section: Privacy Policy/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Data We Collect/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: How We Use Data/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Cookies/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Google Auth/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Social Networks/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Targeted Ads/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Newsletter/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Data Retention/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Your Rights/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Contact Us/i)).toBeInTheDocument();
  });

  it('should render PageNotFound when page is missing', async () => {
    resolvePageData.mockResolvedValueOnce(WrapError('No page found'));

    render(await PrivacyPolicy({ params: Promise.resolve({ lang: 'en' }) }));

    expect(resolvePageData).toHaveBeenCalledWith('privacy-policy', 'en');
    expect(screen.queryByText(/Page not found/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Error: No page found/i)).toBeInTheDocument();
  });
});
