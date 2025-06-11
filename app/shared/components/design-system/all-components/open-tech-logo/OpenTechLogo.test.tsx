import { render, screen } from '@testing-library/react';
import React from 'react';

import OpenTechLogo from './OpenTechLogo';
jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: (props: React.ComponentProps<'img'>) => {
    const { src, alt, width, height } = props;
    return <img src={src} alt={alt} width={width} height={height} />;
  }
}));

describe('OpenTechLogo', () => {
  it('renders default logo when showAcademy is false', () => {
    render(<OpenTechLogo label="OpenTech Label" showAcademy={false} />);

    expect(screen.getByText('OpenTech Label')).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /openTech logo/i });
    expect(img).toHaveAttribute('src', '/images/opentech.svg');
    expect(img).toHaveAttribute('alt', 'OpenTech logo');
    expect(img).toHaveAttribute('width', '165');
    expect(img).toHaveAttribute('height', '16');
  });

  it('renders academy logo when showAcademy is true (default)', () => {
    render(<OpenTechLogo label="OpenTech Academy Label" showAcademy={true} />);

    expect(screen.getByText('OpenTech Academy Label')).toBeInTheDocument();

    const img = screen.getByRole('img', { name: /openTech Academy logo/i });
    expect(img).toHaveAttribute('src', '/images/opentech-academy.svg');
    expect(img).toHaveAttribute('alt', 'OpenTech Academy logo');
    expect(img).toHaveAttribute('width', '232');
    expect(img).toHaveAttribute('height', '16');
  });

  it('renders with default showAcademy when no prop is provided', () => {
    render(<OpenTechLogo label="OpenTech Academy Label" />);

    const img = screen.getByRole('img', { name: /openTech Academy logo/i });
    expect(img).toHaveAttribute('src', '/images/opentech-academy.svg');
  });
});
