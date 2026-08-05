import { render, screen } from '@testing-library/react';
import React from 'react';

import { IntroSection } from './IntroSection';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { IImageBlock, IIntroSection } from '~/types/page/about-us.types';
import type { TipTapDoc } from '~/types/types/tiptap.types';

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
  title: 'Welcome to the Liatoshynsky Foundation',
  quote: {
    text: 'Preserving the legacy of a musical genius',
    source: 'Boris Liatoshynsky'
  },
  image: mockImage
};

const mockTipTapTitle = {
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text: 'Mocked TipTap Title' }]
    }
  ]
} as unknown as TipTapDoc;

describe('IntroSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Title Rendering', () => {
    it('should render a standard string title inside a Typography component', () => {
      render(<IntroSection data={mockData} />);

      const titleElement = screen.getByTestId('IntroSection-title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('Welcome to the Liatoshynsky Foundation');

      expect(screen.queryByTestId('mock-tiptap-container')).not.toBeInTheDocument();
    });

    it('should alternate branches and mount TipTapContent when fed a structured node title object', () => {
      const dataWithTipTapTitle: IIntroSection = {
        ...mockData,
        title: mockTipTapTitle
      };

      render(<IntroSection data={dataWithTipTapTitle} />);

      expect(screen.getByTestId('mock-tiptap-container')).toBeInTheDocument();

      const customRenderedTitle = screen.getByTestId('IntroSection-title');
      expect(customRenderedTitle).toBeInTheDocument();
      expect(customRenderedTitle).toHaveTextContent('Mocked TipTap Title');
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

    it('should fall back to empty object when image caption is missing (line 40 branch coverage)', () => {
      const imageWithoutCaption = {
        ...mockImage,
        caption: undefined
      } as unknown as IImageBlock;

      const dataWithMissingCaption: IIntroSection = {
        ...mockData,
        image: imageWithoutCaption
      };

      render(<IntroSection data={dataWithMissingCaption} />);

      expect(screen.getByTestId('IntroSection-imageCaption')).toBeInTheDocument();
    });
  });
});
