import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import PersonCard from './PersonCard';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} data-testid="next-image" />
}));

jest.mock('~/shared/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];

    const rawText = data?.content?.[0]?.content?.[0]?.text;

    const dummyText: string =
      typeof rawText === 'string'
        ? rawText
        : rawText && typeof rawText === 'object'
          ? (rawText as Record<string, string>).uk || (rawText as Record<string, string>).en || ''
          : 'Fallback Text';

    return <div data-testid="mock-tiptap-content">{ParagraphRenderer ? ParagraphRenderer(dummyText) : dummyText}</div>;
  }
}));

const personStringProps = {
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

  describe('Standard String Rendering', () => {
    beforeEach(() => {
      render(<PersonCard {...personStringProps} />);
    });

    it('should display the photo with the hardcoded alt text', () => {
      const img = screen.getByTestId('next-image');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('alt', 'Person photo');
      expect(img).toHaveAttribute('src', '/valid-image.jpg');
    });

    it('should render the name correctly converted to TipTap content', () => {
      expect(screen.getByText(personStringProps.name)).toBeInTheDocument();
    });

    it('should render the description correctly converted to TipTap content', () => {
      expect(screen.getByText(personStringProps.description)).toBeInTheDocument();
    });
  });

  describe('TipTap Object Rendering', () => {
    it('should directly render TipTapDoc objects if passed instead of strings', () => {
      const tipTapName = makeTipTapDoc('TipTap Name Data');
      const tipTapDesc = makeTipTapDoc('TipTap Description Data');

      render(<PersonCard imgURL="/valid.jpg" name={tipTapName} description={tipTapDesc} />);

      expect(screen.getByText('TipTap Name Data')).toBeInTheDocument();
      expect(screen.getByText('TipTap Description Data')).toBeInTheDocument();
    });
  });

  describe('Image Error Handling', () => {
    it('should update the image src to the default fallback and change object-fit on error', () => {
      render(<PersonCard {...personStringProps} />);

      const img = screen.getByTestId('next-image');

      expect(img).toHaveAttribute('src', '/valid-image.jpg');
      expect(img).toHaveStyle('object-fit: cover');

      fireEvent.error(img);

      expect(img).toHaveAttribute('src', '/images/light-logo.svg');
      expect(img).toHaveStyle('object-fit: contain');
    });

    it('should use a custom fallbackSrc if provided', () => {
      render(<PersonCard {...personStringProps} fallbackSrc="/custom-fallback.jpg" />);

      const img = screen.getByTestId('next-image');
      fireEvent.error(img);

      expect(img).toHaveAttribute('src', '/custom-fallback.jpg');
    });

    it('should only trigger the fallback error logic once', () => {
      render(<PersonCard {...personStringProps} fallbackSrc="/custom-fallback.jpg" />);

      const img = screen.getByTestId('next-image');

      fireEvent.error(img);
      fireEvent.error(img);

      expect(img).toHaveAttribute('src', '/custom-fallback.jpg');
    });
  });
});
