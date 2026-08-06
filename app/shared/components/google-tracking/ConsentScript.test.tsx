import { render } from '@testing-library/react';
import React from 'react';

import ConsentScript from './ConsentScript';

type MockScriptProps = {
  children?: React.ReactNode;
  [key: string]: unknown;
};

jest.mock('next/script', () => ({
  __esModule: true,
  default: ({ children, ...props }: MockScriptProps) => <script {...props}>{children}</script>
}));

type MockGaProps = {
  gaId: string;
  [key: string]: unknown;
};

type MockGtmProps = {
  gtmId: string;
  [key: string]: unknown;
};

jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId, ...props }: MockGaProps) => {
    const { src: _src, async: _async, ...cleanProps } = props;
    return <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} {...cleanProps}></script>;
  },
  GoogleTagManager: ({ gtmId, ...props }: MockGtmProps) => {
    const { src: _src, async: _async, ...cleanProps } = props;
    return <script async src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} {...cleanProps}></script>;
  }
}));

describe('ConsentScript', () => {
  const trackingId = 'G-TESTID';
  const gtmId = 'GTM-TESTID';

  it('should render GoogleAnalytics and GoogleTagManager components when analytics consent is true', () => {
    render(<ConsentScript trackingId={trackingId} gtmId={gtmId} consent_cookie={{ analytics: true }} />);
    expect(document.querySelector(`script[src*='id=${trackingId}']`)).toBeInTheDocument();
    expect(document.querySelector(`script[src*='id=${gtmId}']`)).toBeInTheDocument();
  });

  it('should render the consent script with update status for accepted analytics', () => {
    render(<ConsentScript trackingId={trackingId} gtmId={gtmId} consent_cookie={{ analytics: true }} />);
    const script = document.querySelector('script#ga-consent');

    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toContain('gtag');
    expect(script?.innerHTML).toContain('consent');
    expect(script?.innerHTML).toContain('update');
    expect(script?.innerHTML).toContain(trackingId);
    expect(script?.innerHTML).toContain('analytics_storage');
    expect(script?.innerHTML).toContain('granted');
  });

  it('should render denied status when consent is false', () => {
    render(<ConsentScript trackingId={trackingId} gtmId={gtmId} consent_cookie={{ analytics: false }} />);
    const script = document.querySelector('script#ga-consent');
    expect(script?.innerHTML).toContain('analytics_storage');
    expect(script?.innerHTML).toContain('denied');
  });
});
