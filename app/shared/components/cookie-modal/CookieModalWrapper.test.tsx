import { fireEvent, render, screen } from '@testing-library/react';

import CookieModalWrapper from './CookieModalWrapper';
import { CookieModalProps } from './modal/CookieModal';
import { CookiePreferencesModalProps } from './preferances/CookiePreferencesModal';

declare global {
  var gtag: (...args: unknown[]) => void;
}

jest.mock('./modal/CookieModal', () => ({
  CookieModal: ({ open, onClose, showPreferences, acceptAll }: CookieModalProps) =>
    open ? (
      <>
        <div>Mocked CookieModal</div>
        <button onClick={onClose}>Close</button>
        <button onClick={showPreferences}>Show Preferences</button>
        <button onClick={acceptAll}>Accept All</button>
      </>
    ) : null
}));

jest.mock('./preferances/CookiePreferencesModal', () => ({
  CookiePreferencesModal: ({ open, onClose, saveSettings, checked, onChecked }: CookiePreferencesModalProps) =>
    open ? (
      <>
        <div>Mocked CookiePreferencesModal</div>
        <button onClick={onClose}>Close</button>
        <button onClick={saveSettings}>Save Settings</button>
        <input
          data-testid="cookie-checkbox"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChecked(e.target.checked)}
        />
      </>
    ) : null
}));

jest.mock('../google-tracking/ConsentScript', () => ({
  __esModule: true,
  default: ({ consent_cookie }: any) => (
    <div>
      Mocked ConsentScript - {consent_cookie && consent_cookie.analytics ? 'analytics:true' : 'analytics:false'}
    </div>
  )
}));

const expectCookieSet = (expected: 'granted' | 'denied') => {
  const raw = (document.cookie || '').split(';').find((c) => c.trim().startsWith('cookie_consent='));
  expect(raw).toBeTruthy();
  const val = raw!.split('=')[1];
  const cookieObj = JSON.parse(val);
  if (expected === 'granted') {
    expect(cookieObj).toEqual({ analytics: true });
  } else {
    expect(cookieObj).toEqual({ analytics: false });
  }
};

describe('CookieModalWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    globalThis.gtag = jest.fn();
    document.cookie = 'cookie_consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  });

  it('should render ConsentScript and not CookieModal when consent_cookie.analytics is true', () => {
    render(<CookieModalWrapper trackingId="" gtmId="" consent_cookie={{ analytics: true }} />);
    expect(screen.getByText(/Mocked ConsentScript/)).toBeInTheDocument();
    expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
  });

  it('should not render CookieModal when consent_cookie.analytics is false', () => {
    const { container } = render(
      <CookieModalWrapper trackingId="G-TEST" gtmId="GTM-TEST" consent_cookie={{ analytics: false }} />
    );
    expect(screen.queryByText(/Mocked ConsentScript/)).not.toBeInTheDocument();
    expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  describe('without consent_cookie (fresh user)', () => {
    beforeEach(() => {
      document.cookie = 'cookie_consent=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      render(<CookieModalWrapper trackingId="" gtmId="" consent_cookie={null} />);
    });

    it('should render CookieModal', () => {
      expect(screen.getByText('Mocked CookieModal')).toBeInTheDocument();
    });

    it('should not set cookie initially', () => {
      expect(document.cookie).not.toContain('cookie_consent');
    });

    it('should close CookieModal and set denied cookie when Close is clicked', () => {
      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
      expect(document.cookie).not.toContain('cookie_consent');
    });

    it('should set granted cookie when Accept All is clicked', () => {
      fireEvent.click(screen.getByText('Accept All'));
      expectCookieSet('granted');
      expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
    });

    it('should open CookiePreferencesModal when Show Preferences is clicked', () => {
      fireEvent.click(screen.getByText('Show Preferences'));
      expect(screen.getByText('Mocked CookiePreferencesModal')).toBeInTheDocument();
    });

    it('should save granted cookie when analytics is checked in CookiePreferencesModal', () => {
      fireEvent.click(screen.getByText('Show Preferences'));
      fireEvent.click(screen.getByText('Save Settings'));
      expectCookieSet('granted');
      expect(screen.queryByText('Mocked CookiePreferencesModal')).not.toBeInTheDocument();
    });

    it('should not set cookie when preferences are closed without saving', () => {
      fireEvent.click(screen.getByText('Show Preferences'));
      fireEvent.click(screen.getByText('Close'));
      expect(document.cookie).not.toContain('cookie_consent');
    });

    it('should set denied cookie when analytics is unchecked and saved in preferences', () => {
      fireEvent.click(screen.getByText('Show Preferences'));
      fireEvent.click(screen.getByTestId('cookie-checkbox'));
      fireEvent.click(screen.getByText('Save Settings'));
      expectCookieSet('denied');
    });
  });
});
