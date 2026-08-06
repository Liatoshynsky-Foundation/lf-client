import { render, screen } from '@testing-library/react';
import React from 'react';

import SocialMediaIcon from './SocialMediaIcon';
import { SocialMediaTypes } from '~/types/enums/common.enums';

jest.mock('./SocialMediaIcon.styles', () => ({
  iconButtonBase: jest.fn(() => ({ display: 'flex' })),
  styles: {
    iconWrapper: { position: 'relative' }
  }
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: function MockSvg({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} data-testid="svg-image" />;
  }
}));

describe('SocialMediaIcon', () => {
  it('should render link wrapper with appropriate core attributes and targeting parameters', () => {
    render(<SocialMediaIcon icon={SocialMediaTypes.Facebook} href="https://facebook.com" />);

    const anchorElement = screen.getByRole('link');
    expect(anchorElement).toHaveAttribute('href', 'https://facebook.com');
    expect(anchorElement).toHaveAttribute('target', '_blank');
    expect(anchorElement).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should construct specific icon image paths when regular tracking standard enum key types are passed', () => {
    render(<SocialMediaIcon icon={SocialMediaTypes.Instagram} href="https://instagram.com" />);

    const imageElement = screen.getByTestId('svg-image');
    expect(imageElement).toHaveAttribute('src', `/icons/${SocialMediaTypes.Instagram}.svg`);
    expect(imageElement).toHaveAttribute('alt', SocialMediaTypes.Instagram);
  });

  it('should trigger custom fallback share icon asset resolution mapping when handling generic standalone channels', () => {
    render(<SocialMediaIcon icon={SocialMediaTypes.AnotherMedia} href="https://custom-link.com" />);

    const imageElement = screen.getByTestId('svg-image');
    expect(imageElement).toHaveAttribute('src', '/icons/share.svg');
    expect(imageElement).toHaveAttribute('alt', SocialMediaTypes.AnotherMedia);
  });
});
