import { render, screen } from '@testing-library/react';

import { IntroSection } from '~/components/blocks/IntroSection/IntroSection';

import type { IIntroSection } from '~/types/page/about-us.types';

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
    <div data-testid="image-with-caption">
      <img src={src} alt={alt} />
      {caption && <p>{caption}</p>}
    </div>
  )
}));

jest.mock('~/components/Quote/Quote', () => {
  const AboutFoundationMockQuote = () => <div data-testid="quote" />;
  AboutFoundationMockQuote.displayName = 'AboutFoundationMockQuote';
  return AboutFoundationMockQuote;
});

const mockData: IIntroSection = {
  title: 'Welcome to the Lyatoshynsky Foundation',
  quote: {
    text: 'Preserving the legacy of a musical genius',
    source: 'Boris Lyatoshynsky'
  },
  image: {
    src: '/images/intro-section.jpg',
    alt: 'Intro image',
    caption: 'Intro caption'
  }
};

describe('IntroSection', () => {
  it('should render the IntroSection with text', () => {
    render(<IntroSection data={mockData} />);
    expect(screen.getByText('Welcome to the Lyatoshynsky Foundation')).toBeInTheDocument();
  });
});
