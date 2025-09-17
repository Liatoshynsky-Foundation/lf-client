import { render, screen } from '@testing-library/react';
import React from 'react';

import ContactUsButton from './ContactUsButton';

jest.mock('~/ds-components/button/Button');

describe('ContactUsButton', () => {
  const data = {
    text: 'Contact Us',
    link: '/contact'
  };

  beforeEach(() => {
    render(<ContactUsButton data={data} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the button with correct label', () => {
    const button = screen.getByRole('button', { name: /contact us/i });
    expect(button).toBeInTheDocument();
  });

  it('should render button with the icon', () => {
    const icon = screen.getByAltText('Contact Us Button');
    expect(icon).toBeInTheDocument();
  });
});
