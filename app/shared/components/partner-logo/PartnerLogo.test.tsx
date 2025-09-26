import { render, screen } from '@testing-library/react';

import PartnerLogo from './PartnerLogo';

const link = 'https://example.com';
const image = <img src="/images/test-logo.png" alt="Test Logo" />;

describe('PartnerLogo', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<PartnerLogo link={link} image={image} />);
  });

  it('should render the logo with grayscale filter', () => {
    const logo = screen.getByAltText('Test Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveStyle('filter: grayscale(100%)');
  });

  it('should redirect to the provided link when clicked', () => {
    const anchor = screen.getByRole('link', { name: /Test Logo/i });
    expect(anchor).toHaveAttribute('href', link);
    expect(anchor).toHaveAttribute('target', '_blank');
    expect(anchor).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
