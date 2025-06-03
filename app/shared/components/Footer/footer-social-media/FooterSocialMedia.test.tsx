import { SocialMediaTypes } from '~/types/enums/common.enums';
import FooterSocialMedia from './FooterSocialMedia';
import { render } from '@testing-library/react';

describe('Social media icon buttons', () => {
  it('should render an image based on the type', () => {
    const mockData = [
      {
        icon: SocialMediaTypes.Instagram,
        href: 'https://www.instagram.com/'
      }
    ];
    const expectedImage = 'instagram';
    render(<FooterSocialMedia media={mockData} />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.alt).toContain(expectedImage);
    expect(testImage.src).toContain(`${expectedImage}.svg`);
  });

  it('should render an image based on the type in text', () => {
    const mockData = [
      {
        icon: 'instagram',
        href: 'https://www.instagram.com/'
      }
    ];
    const expectedImage = 'instagram';
    render(<FooterSocialMedia media={mockData} />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.alt).toContain(expectedImage);
    expect(testImage.src).toContain(`${expectedImage}.svg`);
  });

  it('should render a "shared" image if the type is for another social media', () => {
    const mockData = [
      {
        icon: 'mock text',
        href: 'https://www.instagram.com/'
      }
    ];
    const expectedImage = 'share.svg';
    render(<FooterSocialMedia media={mockData} />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.src).toContain(expectedImage);
  });
});
