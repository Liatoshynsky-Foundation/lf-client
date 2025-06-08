import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { useIsMobile } from '~/hooks/is-mobile/useIsMobile';

import FooterContactInfo from './FooterContactInfo';

const contacts = {
  title: 'Test Title',
  phone: '123-456-7890',
  email: 'test@example.com'
};

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
      render(<FooterContactInfo contacts={contacts} />);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('renders all contact information', () => {
      expect(screen.getByText(contacts.title)).toBeInTheDocument();
      expect(screen.getByText(contacts.phone)).toBeInTheDocument();
      expect(screen.getByText(contacts.email)).toBeInTheDocument();
    });

    it('renders mailto email link with correct href', () => {
      const emailLink = screen.getByRole('link', { name: contacts.email });
      expect(emailLink).toHaveAttribute('href', `mailto:${contacts.email}`);
    });

    it('renders tel phone link with onClick handler', () => {
      const phoneLink = screen.getByRole('link', { name: contacts.phone });
      expect(phoneLink).toHaveAttribute('href', '#');

      fireEvent.click(phoneLink);
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(contacts.phone);
      expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);
      expect(window.alert).toHaveBeenCalledWith('Номер телефону скопійовано до буферу обміну');
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
      render(<FooterContactInfo contacts={contacts} />);
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
