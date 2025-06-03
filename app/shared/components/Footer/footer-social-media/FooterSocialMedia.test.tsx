import { SocialMediaTypes } from '~/types/enums/common.enums';
import FooterSocialMedia from './FooterSocialMedia';
import { render } from '@testing-library/react';

describe('Social media icon buttons', () => {
  const mockData = [
    {
      icon: SocialMediaTypes.Instagram,
      href: 'https://www.instagram.com/'
    }
  ];
  it('should render an image based on the type', () => {
    const expectedImage = 'instagram';
    render(<FooterSocialMedia media={mockData} />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.alt).toContain(expectedImage);
    expect(testImage.src).toContain(`${expectedImage}.svg`);
  });

  it('should render an image based on the type in text', () => {
    const updatedData = [
      {
        ...mockData[0],
        icon: 'instagram'
      }
    ];
    const expectedImage = 'instagram';
    render(<FooterSocialMedia media={updatedData} />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.alt).toContain(expectedImage);
    expect(testImage.src).toContain(`${expectedImage}.svg`);
  });

  it('should render a "shared" image if the type is for another social media', () => {
    const updatedData = [
      {
        ...mockData[0],
        icon: 'test'
      }
    ];
    const expectedImage = 'share.svg';
    render(<FooterSocialMedia media={updatedData} />);
    const testImage = document.querySelector('img') as HTMLImageElement;
    expect(testImage.src).toContain(expectedImage);
  });
});
