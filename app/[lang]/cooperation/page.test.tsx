import { render, screen } from '@testing-library/react';
import React from 'react';

import Collaboration from './page';

const getPageData = jest.fn();

jest.mock('~/di/container', () => ({
  createRequestContainer: () => ({
    resolve: () => ({
      getPageData
    })
  })
}));

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

let counter = 0;

jest.mock('uuid', () => ({
  v4: () => `mock-uuid-${counter++}`
}));

jest.mock('~/layouts/main-layout/MainLayout', () => {
  const MockMainLayout = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockMainLayout.displayName = 'MockMainLayout';
  return MockMainLayout;
});

jest.mock('~/shared/components/blocks/our-partners/OurPartners', () => {
  const MockOurPartners = () => <div>Our Partners</div>;
  MockOurPartners.displayName = 'MockOurPartners';
  return MockOurPartners;
});

jest.mock('~/shared/components/blocks/partnership-formats/PartnershipFormats', () => {
  const MockPartnershipFormats = () => <div>Partnership Formats</div>;
  MockPartnershipFormats.displayName = 'MockPartnershipFormats';
  return MockPartnershipFormats;
});

jest.mock('~/components/under-development/UnderDevelopment', () => {
  const MockUnderDevelopment = () => <div>Under Development</div>;
  MockUnderDevelopment.displayName = 'MockUnderDevelopment';
  return MockUnderDevelopment;
});

jest.mock('../[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div>Page Not Found</div>
}));

jest.mock('~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro.consts', () => ({
  collaborationIntroPageData: {
    en: { title: 't', subtitle: 's', contentAbove: 'a', content: 'c' },
    uk: { title: 't', subtitle: 's', contentAbove: 'a', content: 'c' }
  }
}));

jest.mock('~/shared/components/blocks/collaboration/collaboration-intro/CollaborationIntro', () => {
  const MockCollaborationIntro = () => <div>Collaboration Intro</div>;
  MockCollaborationIntro.displayName = 'MockCollaborationIntro';
  return MockCollaborationIntro;
});

jest.mock('~/shared/components/blocks/collaboration/collaboration-info/CollaborationInfo', () => {
  const MockCollaborationInfo = () => <div>Collaboration Info</div>;
  MockCollaborationInfo.displayName = 'MockCollaborationInfo';
  return MockCollaborationInfo;
});

jest.mock('~/shared/components/blocks/collaboration/offer-collaboration/OfferCollaboration', () => {
  const MockOfferCollaboration = () => <div>Offer Collaboration</div>;
  MockOfferCollaboration.displayName = 'MockOfferCollaboration';
  return MockOfferCollaboration;
});

describe('Collaboration component', () => {
  it('should render CollaborationIntro component correctly', async () => {
    getPageData.mockResolvedValue({
      ok: true,
      value: {
        blocks: { partnershipFormats: null }
      }
    });

    render(await Collaboration({ params: Promise.resolve({ lang: 'en' }) } as any));
    expect(screen.getByText(/Collaboration Intro/i)).toBeInTheDocument();
  });
});
