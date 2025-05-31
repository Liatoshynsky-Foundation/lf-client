import { render, screen } from '@testing-library/react';
import CustomLink from './CustomLink';
import '@testing-library/jest-dom';
import PlayIconSvg from '../../../public/icons/play-icon.svg';
import { SvgImage } from '~/shared/components/svg-image/SvgImage';

describe('CustomLink', () => {
  test('should render CustomLink correct text and href', () => {
    render(<CustomLink path="/test">Test Link</CustomLink>);

    const link = screen.getByRole('link', { name: /test link/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  test('should render front icon', () => {
    render(
      <CustomLink path="/" startIcon={<SvgImage src={PlayIconSvg} alt="play icon" />}>
        With Icon
      </CustomLink>
    );
    expect(screen.getByText(/With Icon/i)).toBeInTheDocument();
    expect(screen.getByAltText('play icon')).toBeInTheDocument();
  });

  test('should render back icon (SVG image)', () => {
    render(
      <CustomLink path="/with-back-icon" endIcon={<SvgImage src={PlayIconSvg} alt="play icon" />}>
        With Back Icon
      </CustomLink>
    );
    expect(screen.getByAltText('play icon')).toBeInTheDocument();
  });
});
