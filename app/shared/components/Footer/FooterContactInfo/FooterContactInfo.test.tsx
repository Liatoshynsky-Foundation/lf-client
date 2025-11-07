import { act, fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import { useIsMobile } from '~/hooks/is-mobile/useIsMobile';

import FooterContactInfo from './FooterContactInfo';

const contacts = {
  foundationName: 'Test Title',
  address: '123 Test St, Test City, TX 12345',
  phone: '123-456-7890',
  email: 'test@example.com'
};

const labels = {
  phoneLabel: 'Phone'
};

const alertMsg = 'Copied';

jest.mock('~/shared/hooks/is-mobile/useIsMobile', () => ({
  useIsMobile: jest.fn()
}));

describe('Contact information block inside of the Footer', () => {
  describe('Contact information on desktop', () => {
    beforeAll(() => {
      (useIsMobile as jest.Mock).mockReturnValue(false);

      Object.defineProperties(navigator, {
        clipboard: {
          value: {
            writeText: jest.fn()
          }
        }
      });

      jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    afterAll(() => {
      (useIsMobile as jest.Mock).mockRestore();
    });

    beforeEach(() => {
      render(<FooterContactInfo labels={labels} contacts={contacts} alertMsg={alertMsg} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders all contact information', () => {
      expect(screen.getByText(contacts.foundationName)).toBeInTheDocument();
      expect(screen.getByText(contacts.phone)).toBeInTheDocument();
      expect(screen.getByText(contacts.email)).toBeInTheDocument();
      expect(screen.getByText(contacts.address)).toBeInTheDocument();
      expect(screen.getByText(/Phone:/i)).toBeInTheDocument();
    });

    it('renders mailto email link with correct href', () => {
      const emailLink = screen.getByRole('link', { name: contacts.email });
      expect(emailLink).toHaveAttribute('href', `mailto:${contacts.email}`);
    });

    it('renders tel phone link with CopyButton', async () => {
      const phoneSection = screen.getByText(contacts.phone).closest('div');
      expect(phoneSection).not.toBeNull();

      const copyButton = within(phoneSection).getByRole('button', { name: /copy content/i });

      await act(async () => {
        fireEvent.click(copyButton);
      });

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(contacts.phone);
    });
  });

  describe('Contact information on mobile', () => {
    beforeAll(() => {
      (useIsMobile as jest.Mock).mockReturnValue(true);
    });

    afterAll(() => {
      (useIsMobile as jest.Mock).mockRestore();
    });

    beforeEach(() => {
      render(<FooterContactInfo contacts={contacts} labels={labels} alertMsg={alertMsg} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders mailto email link with correct href', () => {
      const emailLink = screen.getByRole('link', { name: contacts.email });
      expect(emailLink).toHaveAttribute('href', `mailto:${contacts.email}`);
    });

    it('renders tel phone link with href', () => {
      const phoneLink = screen.getByRole('link', { name: contacts.phone });
      expect(phoneLink).toHaveAttribute('href', `tel:${contacts.phone}`);
    });
  });
});
