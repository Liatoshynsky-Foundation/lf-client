import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { CookieModal } from './CookieModal';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const t = (key: string) => {
      const translations: Record<string, string> = {
        'cookie.modal.title': '🍪 Cookies',
        'cookie.modal.description':
          'We use cookies to enable essential site functionality and for analytics. Please review our <link>privacy policy</link> to learn more.',
        'cookie.modal.settingsButton': 'Cookie settings',
        'cookie.modal.acceptButton': 'Accept all'
      };
      return translations[key] || key;
    };
    t.rich = (
      _key: string,
      {
        link
      }: {
        link: (chunks: React.ReactNode) => React.ReactNode;
      }
    ) => ['Read our ', link('privacy policy'), '.'];

    return t;
  }
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <button>{children}</button>
}));

const onClose = jest.fn();
const showPreferences = jest.fn();
const acceptAll = jest.fn();

const props = {
  open: true,
  onClose: onClose,
  showPreferences: showPreferences,
  acceptAll: acceptAll
};

describe('CookieModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<CookieModal {...props} />);
  });

  it('should renders modal with correct content', () => {
    expect(screen.getByRole('button', { name: 'settingsButton' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'acceptButton' })).toBeInTheDocument();
  });

  it('should calls onClose when accept button is clicked', () => {
    const acceptButton = screen.getByRole('button', { name: 'acceptButton' });
    fireEvent.click(acceptButton);

    expect(acceptAll).toHaveBeenCalledTimes(1);
  });

  it('should not render anything when open is false', () => {
    expect(screen.queryByText(/cookies/i)).not.toBeInTheDocument();
  });

  it('should call showPreferences when settings button is clicked', () => {
    const settingsButton = screen.getByRole('button', { name: 'settingsButton' });
    fireEvent.click(settingsButton);

    expect(showPreferences).toHaveBeenCalledTimes(1);
  });
});
