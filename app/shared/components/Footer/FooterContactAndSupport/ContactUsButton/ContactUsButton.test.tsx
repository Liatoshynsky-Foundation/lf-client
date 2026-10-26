import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import React from 'react';

import ContactUsButton from './ContactUsButton';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  usePathname: jest.fn()
}));

jest.mock('~/ds-components/button/Button');

const mockUsePathname = usePathname as jest.Mock;

describe('ContactUsButton', () => {
  const data = {
    text: 'Contact Us',
    link: '/contacts'
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render the button with correct label', () => {
    render(<ContactUsButton data={data} />);
    const button = screen.getByRole('button', { name: /contact us/i });
    expect(button).toBeInTheDocument();
  });

  it('should render button with the icon', () => {
    render(<ContactUsButton data={data} />);
    const icon = screen.getByAltText('Contact Us Button');
    expect(icon).toBeInTheDocument();
  });

  it('should dispatch focus event when clicked on the Contacts page', () => {
    mockUsePathname.mockReturnValue('/uk/contacts');
    render(<ContactUsButton data={data} />);

    const dispatchSpy = jest.spyOn(window, 'dispatchEvent');

    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));

    expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ type: 'focus-contact-name' }));

    dispatchSpy.mockRestore();
  });

  it('should not dispatch focus event when clicked on another page', () => {
    mockUsePathname.mockReturnValue('/uk/news');

    render(<ContactUsButton data={data} />);

    const dispatchSpy = jest.spyOn(window, 'dispatchEvent');

    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));

    expect(dispatchSpy).not.toHaveBeenCalledWith(expect.objectContaining({ type: 'focus-contact-name' }));

    dispatchSpy.mockRestore();
  });
});
