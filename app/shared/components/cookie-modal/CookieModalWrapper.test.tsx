import { fireEvent, render, screen } from '@testing-library/react';

import CookieModalWrapper from './CookieModalWrapper';
import { CookieModalProps } from './modal/CookieModal';
import { CookiePreferencesModalProps } from './preferances/CookiePreferencesModal';

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

const cookiesPresent = () => {
  expect(document.cookie).toContain('cookie_consent');
  expect(JSON.parse(document.cookie.split('=')[1])).toEqual({
    analytics: true,
    marketing: false,
    functional: false,
    necessary: true
  });
};

describe('CookieModalWrapper', () => {
  describe('CookieModalWrapper with cookies', () => {
    it('should not render CookieModal when cookie_consent includes analytics', () => {
      const cookieConsent = JSON.stringify({ analytics: true });
      render(<CookieModalWrapper cookie_consent={cookieConsent} />);

      expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
    });
  });

  describe('CookieModalWrapper without cookies', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      document.cookie = '';
      render(<CookieModalWrapper cookie_consent="" />);
    });

    it('should render CookieModal when cookie_consent is empty', () => {
      expect(screen.getByText('Mocked CookieModal')).toBeInTheDocument();
    });

    it('should not have cookies set initially', () => {
      expect(document.cookie).not.toContain('cookie_consent');
    });

    it('should close CookieModal when Close button is clicked', () => {
      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);

      expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
      expect(document.cookie).not.toContain('cookie_consent');
    });

    it('should accept cookies when Accept All button is clicked', () => {
      const acceptAllButton = screen.getByText('Accept All');
      fireEvent.click(acceptAllButton);

      cookiesPresent();
      expect(screen.queryByText('Mocked CookieModal')).not.toBeInTheDocument();
    });

    it('should open CookiePreferencesModal when Show Preferences button is clicked', () => {
      const preferencesButton = screen.getByText('Show Preferences');
      fireEvent.click(preferencesButton);

      expect(screen.getByText('Mocked CookiePreferencesModal')).toBeInTheDocument();
    });

    it('should save analytics preference by default in CookiePreferencesModal', () => {
      const preferencesButton = screen.getByText('Show Preferences');
      fireEvent.click(preferencesButton);

      const saveSettingsButton = screen.getByText('Save Settings');
      fireEvent.click(saveSettingsButton);

      cookiesPresent();
      expect(screen.queryByText('Mocked CookiePreferencesModal')).not.toBeInTheDocument();
    });

    it('should not save cookies when preferences are closed without saving', () => {
      const preferencesButton = screen.getByText('Show Preferences');
      fireEvent.click(preferencesButton);

      const closeButton = screen.getByText('Close');
      fireEvent.click(closeButton);

      expect(document.cookie).not.toContain('cookie_consent');
    });

    it('should turn off analytics when unchecked in CookiePreferencesModal', () => {
      const preferencesButton = screen.getByText('Show Preferences');
      fireEvent.click(preferencesButton);

      const checkbox = screen.getByTestId('cookie-checkbox');
      fireEvent.click(checkbox);

      const saveSettingsButton = screen.getByText('Save Settings');
      fireEvent.click(saveSettingsButton);

      expect(document.cookie).not.toContain('cookie_consent');
    });
  });
});
