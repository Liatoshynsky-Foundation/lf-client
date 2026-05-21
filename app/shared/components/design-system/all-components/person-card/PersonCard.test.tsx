import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PersonCard from './PersonCard';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc | string;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} data-testid="next-image" />
}));

jest.mock('~/shared/components/tip-tap-content/nodes', () => ({
  renderData: jest.fn((input: unknown) => {
    if (typeof input === 'object' && input !== null) return input;
    return {
      type: TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [{ type: TipTapNodeTypes.text, text: String(input) }]
        }
      ]
    };
  })
}));

jest.mock('~/shared/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];

    let textSnippet: unknown = '';
    if (typeof data === 'string') {
      textSnippet = data;
    } else if (data && typeof data === 'object' && 'content' in data) {
      const firstContent = data.content?.[0];
      if (firstContent && typeof firstContent === 'object' && 'content' in firstContent) {
        const textNode = firstContent.content?.[0];
        if (textNode && typeof textNode === 'object' && 'text' in textNode) {
          textSnippet = textNode.text;
        }
      }
    }

    const resolvedText: string =
      typeof textSnippet === 'object' && textSnippet !== null
        ? (textSnippet as Record<string, string>).uk || (textSnippet as Record<string, string>).en || ''
        : (textSnippet as string) || 'Fallback Text';

    return (
      <div data-testid="mock-tiptap-content">{ParagraphRenderer ? ParagraphRenderer(resolvedText) : resolvedText}</div>
    );
  }
}));

const defaultProps = {
  imgURL: '/valid-image.jpg',
  name: 'Тетяна Гомон',
  description: 'Спадкоємиця композитора, співзасновниця і голова Фундації'
};

const makeTipTapDoc = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text }]
    }
  ]
});

describe('PersonCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering Variations', () => {
    it('should correctly output standard profile elements when fed plain string properties', () => {
      render(<PersonCard {...defaultProps} />);

      const img = screen.getByTestId('next-image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'Person photo');
      expect(img).toHaveAttribute('src', defaultProps.imgURL);

      expect(screen.getByText(defaultProps.name)).toBeInTheDocument();
      expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    });

    it('should directly render TipTapDoc objects if passed instead of strings', () => {
      render(
        <PersonCard
          imgURL="/valid.jpg"
          name={makeTipTapDoc('TipTap Name Data')}
          description={makeTipTapDoc('TipTap Description Data')}
        />
      );

      expect(screen.getByText('TipTap Name Data')).toBeInTheDocument();
      expect(screen.getByText('TipTap Description Data')).toBeInTheDocument();
    });
  });

  describe('Image Fallback Mechanics', () => {
    it('should cycle the image asset src token and style rules to standard global fallbacks on error', () => {
      render(<PersonCard {...defaultProps} />);
      const img = screen.getByTestId('next-image');

      expect(img).toHaveAttribute('src', '/valid-image.jpg');
      expect(img).toHaveStyle('object-fit: cover');

      fireEvent.error(img);
      expect(img).toHaveAttribute('src', '/images/light-logo.svg');
      expect(img).toHaveStyle('object-fit: contain');

      fireEvent.error(img);
      expect(img).toHaveAttribute('src', '/images/light-logo.svg');
    });

    it('should intercept the processing tree to prioritize a custom fallbackSrc if supplied', () => {
      render(<PersonCard {...defaultProps} fallbackSrc="/custom-fallback.jpg" />);
      const img = screen.getByTestId('next-image');

      fireEvent.error(img);
      expect(img).toHaveAttribute('src', '/custom-fallback.jpg');
    });
  });
});
