import { render } from '@testing-library/react';

import ConsentScript from './ConsentScript';

jest.mock('next/script', () => ({
  __esModule: true,
  default: (props: any) => <script {...props}>{props.children}</script>
}));

jest.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: (props: { gaId: string }) => (
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${props.gaId}`} {...props}></script>
  ),
  GoogleTagManager: (props: { gtmId: string }) => (
    <script async src={`https://www.googletagmanager.com/gtm.js?id=${props.gtmId}`} {...props}></script>
  )
}));

describe('ConsentScript', () => {
  const trackingId = 'G-TESTID';
  const gtmId = 'GTM-TESTID';

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render GoogleAnalytics and GoogleTagManager components when analytics consent is true', () => {
    render(<ConsentScript trackingId={trackingId} gtmId={gtmId} consent_cookie={{ analytics: true }} />);
    expect(document.querySelector(`script[src*='googletagmanager.com/gtag/js?id=${trackingId}']`)).toBeInTheDocument();
    expect(document.querySelector(`script[src*='googletagmanager.com/gtm.js?id=${gtmId}']`)).toBeInTheDocument();
  });

  it('should render the consent script with correct consent for accepted', () => {
    render(<ConsentScript trackingId={trackingId} gtmId={gtmId} consent_cookie={{ analytics: true }} />);
    const script = document.querySelector('script#ga-consent');
    expect(script).toBeInTheDocument();
    expect(script?.innerHTML).toContain('gtag');
    expect(script?.innerHTML).toContain('consent');
    expect(script?.innerHTML).toContain('default');
    expect(script?.innerHTML).toContain(trackingId);
    expect(script?.innerHTML).toMatch(/granted/);
  });
});
