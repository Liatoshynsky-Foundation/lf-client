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
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>
}));

const onClose = jest.fn();
const onCloseMock = jest.fn();

describe('CookieModal', () => {
  it('should renders modal with correct content', () => {
    const props = { open: true, onClose: onClose };
    render(<CookieModal {...props} />);

    expect(screen.getByRole('button', { name: 'settingsButton' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'acceptButton' })).toBeInTheDocument();
  });

  it('should calls onClose when accept button is clicked', () => {
    const props = { open: true, onClose: onCloseMock };
    render(<CookieModal {...props} />);

    const acceptButton = screen.getByRole('button', { name: 'acceptButton' });
    fireEvent.click(acceptButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('does not render anything when open is false', () => {
    const props = { open: false, onClose: onClose };
    render(<CookieModal {...props} />);

    expect(screen.queryByText(/cookies/i)).not.toBeInTheDocument();
  });
});
