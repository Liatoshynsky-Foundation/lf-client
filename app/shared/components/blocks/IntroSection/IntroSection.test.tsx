import { render, screen } from '@testing-library/react';
import React from 'react';

import { IntroSection } from './IntroSection';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IImageBlock, IIntroSection } from '~/types/page/about-us.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data?: TipTapDoc;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: ({ dataTestId }: { dataTestId?: string }) => <div data-testid={dataTestId || 'mock-image-with-caption'} />
}));

jest.mock('~/components/Quote/Quote', () => ({
  __esModule: true,
  default: ({ dataTestId }: { dataTestId?: string }) => <div data-testid={dataTestId || 'mock-quote'} />
}));

jest.mock('../../tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];
    return (
      <div data-testid="mock-tiptap-container">
        {ParagraphRenderer ? ParagraphRenderer('Mocked TipTap Title') : 'Fallback'}
      </div>
    );
  }
}));

const mockImage = {
  src: '/images/intro-section.jpg',
  alt: 'Intro image',
  generatedSrc: '/images/intro-section-gen.jpg',
  caption: 'Intro caption'
} as unknown as IImageBlock;

const mockData: IIntroSection = {
  title: 'Welcome to the Lyatoshynsky Foundation',
  quote: {
    text: 'Preserving the legacy of a musical genius',
    source: 'Boris Lyatoshynsky'
  },
  image: mockImage
};

describe('IntroSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Title Rendering', () => {
    it('should render a standard string title inside a Typography component', () => {
      render(<IntroSection data={mockData} />);

      const titleElement = screen.getByTestId('IntroSection-title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('Welcome to the Lyatoshynsky Foundation');

      expect(screen.queryByTestId('mock-tiptap-container')).not.toBeInTheDocument();
    });
  });

  describe('Subcomponent Rendering', () => {
    it('should render the ImageWithCaption and QuoteBlock when data is provided', () => {
      render(<IntroSection data={mockData} />);

      expect(screen.getByTestId('IntroSection-imageCaption')).toBeInTheDocument();
      expect(screen.getByTestId('IntroSection-quoteBlock')).toBeInTheDocument();
    });
  });

  describe('Conditional Rendering', () => {
    it('should NOT render the image or quote if they are null in the data', () => {
      const dataWithoutOptionals: IIntroSection = {
        title: 'Title Only',
        image: null,
        quote: null
      };

      render(<IntroSection data={dataWithoutOptionals} />);

      expect(screen.getByTestId('IntroSection-title')).toHaveTextContent('Title Only');

      expect(screen.queryByTestId('IntroSection-imageCaption')).not.toBeInTheDocument();
      expect(screen.queryByTestId('IntroSection-quoteBlock')).not.toBeInTheDocument();
    });
  });
});
