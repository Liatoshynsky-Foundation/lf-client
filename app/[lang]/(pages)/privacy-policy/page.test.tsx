import { render, screen } from '@testing-library/react';

import PrivacyPolicy from './page';

import { createRequestContainer } from '~/di/container';

jest.mock('~/shared/components/blocks/privacy-policy/intro-section/IntroSection', () => {
  const MockIntroSection = ({ title }: { title: string }) => <div>Intro section: {title}</div>;
  MockIntroSection.displayName = 'MockIntroSection';
  return MockIntroSection;
});

jest.mock('~/shared/components/blocks/privacy-policy/policy-section/PolicySection', () => {
  const MockPolicySection = ({ title }: { title?: string }) => <div>Policy section: {title ?? 'untitled'}</div>;
  MockPolicySection.displayName = 'MockPolicySection';
  return MockPolicySection;
});

jest.mock('~/di/container', () => {
  const createRequestContainer = jest.fn(() => ({
    resolve: () => ({
      getPageData: jest.fn().mockResolvedValue({
        title: { en: 'Privacy Policy' },
        blocks: {
          IntroSection: { trustAndSecurity: {}, agreement: {} },
          DataWeCollect: { title: { en: 'Data We Collect' }, description: {}, sections: [] },
          DataUsage: { title: { en: 'How We Use Data' }, description: {}, list: [] },
          Cookies: { title: { en: 'Cookies' }, description: {}, list: [], note: {} },
          GoogleAuth: { title: { en: 'Google Auth' }, description: {}, list: [], note: {} },
          SocialNetworks: { title: { en: 'Social Networks' }, description: {} },
          TargetedAds: { title: { en: 'Targeted Ads' }, description: {} },
          NewsletterSubscription: { title: { en: 'Newsletter' }, description: {} },
          DataRetention: { title: { en: 'Data Retention' }, description: {} },
          UserRights: { title: { en: 'Your Rights' }, description: {}, list: [], note: {} },
          ContactUs: { title: { en: 'Contact Us' }, description: {} }
        }
      })
    })
  }));
  return { createRequestContainer };
});

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

describe('PrivacyPolicy page', () => {
  it('should render all available blocks', async () => {
    render(await PrivacyPolicy({ params: Promise.resolve({ lang: 'en' }) }));

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

  it('should render nothing when page has no blocks', async () => {
    (createRequestContainer as jest.Mock).mockReturnValueOnce({
      resolve: () => ({
        getPageData: jest.fn().mockResolvedValue({ title: 'Empty', blocks: {} })
      })
    });

    const { container } = render(await PrivacyPolicy({ params: Promise.resolve({ lang: 'en' }) }));
    expect(container).toBeEmptyDOMElement();
  });

  it('should render only present blocks', async () => {
    (createRequestContainer as jest.Mock).mockReturnValueOnce({
      resolve: () => ({
        getPageData: jest.fn().mockResolvedValue({
          title: { en: 'Selective' },
          blocks: {
            IntroSection: { trustAndSecurity: {}, agreement: {} },
            DataUsage: { title: { en: 'How We Use Data' }, description: {}, list: [] },
            ContactUs: { title: { en: 'Contact Us' }, description: {} }
          }
        })
      })
    });

    render(await PrivacyPolicy({ params: Promise.resolve({ lang: 'en' }) }));

    expect(screen.getByText(/Intro section: Selective/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: How We Use Data/i)).toBeInTheDocument();
    expect(screen.getByText(/Policy section: Contact Us/i)).toBeInTheDocument();

    expect(screen.queryByText(/Data We Collect/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Cookies/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Google Auth/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Social Networks/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Targeted Ads/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Newsletter/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Data Retention/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Your Rights/i)).not.toBeInTheDocument();
  });
});
