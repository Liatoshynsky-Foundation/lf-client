import { render, screen } from '@testing-library/react';
import React from 'react';

import ContactUsButton from './ContactUsButton';

jest.mock('~/ds-components/button/Button');

describe('ContactUsButton', () => {
  const label = 'Contact us';

  beforeEach(() => {
    render(<ContactUsButton contactLabel={label} />);
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
