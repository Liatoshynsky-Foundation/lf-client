import { fireEvent, render, screen } from '@testing-library/react';

import CookieModalWrapper from './CookieModalWrapper';
import { CookieModalProps } from './modal/CookieModal';
import { CookiePreferencesModalProps } from './preferances/CookiePreferencesModal';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
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

const expectCookieSet = (expected: 'granted' | 'denied') => {
  expect(document.cookie).toContain('cookie_consent');
  const cookieValue = JSON.parse(document.cookie.split('=')[1]);
  if (expected === 'granted') {
    expect(cookieValue).toEqual(1);
  } else {
    expect(cookieValue).toEqual(0);
  }
};

describe('CookieModalWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.gtag = jest.fn();
    document.cookie = '';
  });

  describe('with cookie_consent present', () => {
    it('should not render CookieModal when cookie_consent includes analytics', () => {
      render(<CookieModalWrapper cookie_consent={'1'} />);
      expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
    });

    it('should not render CookieModal when cookie_consent includes denied', () => {
      render(<CookieModalWrapper cookie_consent={'0'} />);
      expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
    });

    describe('without cookie_consent', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        document.cookie = '';
        render(<CookieModalWrapper cookie_consent="" />);
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
        expectCookieSet('denied');
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

      it('should set denied cookie when preferences are closed without saving', () => {
        fireEvent.click(screen.getByText('Show Preferences'));
        fireEvent.click(screen.getByText('Close'));
        expectCookieSet('denied');
      });

      it('should set denied cookie when analytics is unchecked and saved in preferences', () => {
        fireEvent.click(screen.getByText('Show Preferences'));
        fireEvent.click(screen.getByTestId('cookie-checkbox'));
        fireEvent.click(screen.getByText('Save Settings'));
        expectCookieSet('denied');
      });
    });
  });
});
