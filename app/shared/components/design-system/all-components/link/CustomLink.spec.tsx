import { render, screen } from '@testing-library/react';
import CustomLink from './CustomLink';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

describe('CustomLink', () => {
  it('should render CustomLink correct text and href', () => {
    render(<CustomLink path="/it">it Link</CustomLink>);

    const link = screen.getByRole('link', { name: /it link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/it');
  });

  it('should render front icon', () => {
    render(
      <CustomLink path="/" startIcon={<SvgImage src="/icons/play-icon.svg" width={20} height={20} alt="play icon" />}>
        With Icon
      </CustomLink>
    );
    expect(screen.getByText(/With Icon/i)).toBeInTheDocument();
    expect(screen.getByAltText('play icon')).toBeInTheDocument();
  });

  it('should render back icon (SVG image)', () => {
    render(
      <CustomLink
        path="/with-back-icon"
        endIcon={<SvgImage src="/icons/house.svg" width={24} height={24} alt="play icon" />}
      >
        With Back Icon
      </CustomLink>
    );
    expect(screen.getByAltText('play icon')).toBeInTheDocument();
  });
});
