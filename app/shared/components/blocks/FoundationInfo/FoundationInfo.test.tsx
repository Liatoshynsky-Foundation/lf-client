import { render, screen } from '@testing-library/react';

import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';

import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IFoundationInfo } from '~/types/page/about-us.types';

jest.mock('~/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

const baseTextBlocks = {
  ourOrganisation: {
    type: TipTapNodeTypes.doc as TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph as TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text as TipTapNodeTypes.text,
            text: 'ourOrganisation текст'
          }
        ]
      }
    ]
  },
  ourBelief: {
    type: TipTapNodeTypes.doc as TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph as TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text as TipTapNodeTypes.text,
            text: 'ourBelief текст'
          }
        ]
      }
    ]
  },
  ourName: {
    type: TipTapNodeTypes.doc as TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph as TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text as TipTapNodeTypes.text,
            text: 'ourName текст'
          }
        ]
      }
    ]
  }
};

const mockDataWithImage: IFoundationInfo = {
  ...baseTextBlocks,
  image: {
    src: '/images/foundation-photo.jpg',
    alt: 'Фото команди фонду',
    generatedSrc: '/images/foundation-photo.jpg',
    caption: 'підпис під фото'
  }
};

const mockDataWithoutImage: IFoundationInfo = {
  ...baseTextBlocks,
  image: null
};

const mockDataWithTipTapAlt: IFoundationInfo = {
  ...baseTextBlocks,
  image: {
    src: '/images/foundation-photo.jpg',
    alt: {
      type: TipTapNodeTypes.doc as TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph as TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text as TipTapNodeTypes.text,
              text: 'Alt із tiptap документа'
            }
          ]
        }
      ]
    },
    generatedSrc: '/images/foundation-photo.jpg',
    caption: 'підпис під фото'
  }
};

const mockDataWithEmptyAlt: IFoundationInfo = {
  ...baseTextBlocks,
  image: {
    src: '/images/foundation-photo.jpg',
    alt: undefined as unknown as string,
    generatedSrc: '/images/foundation-photo.jpg',
    caption: 'підпис під фото'
  }
};

describe('FoundationInfo', () => {
  it('should render the FoundationInfo with text', () => {
    render(<FoundationInfo data={mockDataWithImage} />);

    expect(screen.getByText('ourOrganisation текст')).toBeInTheDocument();
    expect(screen.getByText('ourName текст')).toBeInTheDocument();
    expect(screen.getByText('ourBelief текст')).toBeInTheDocument();
  });

  it('should render plain-string alt text as-is on the image', () => {
    render(<FoundationInfo data={mockDataWithImage} />);

    expect(screen.getByAltText('Фото команди фонду')).toBeInTheDocument();
  });

  it('should not render an image block when image is null', () => {
    render(<FoundationInfo data={mockDataWithoutImage} />);

    expect(screen.getByText('ourOrganisation текст')).toBeInTheDocument();
    expect(screen.queryByTestId('FoundationInfo-bodyImage')?.querySelector('img')).not.toBeInTheDocument();
  });

  it('should extract plain text from a TipTap doc alt value', () => {
    render(<FoundationInfo data={mockDataWithTipTapAlt} />);

    expect(screen.getByAltText('Alt із tiptap документа')).toBeInTheDocument();
  });

  it('should fall back to an empty alt when alt is missing', () => {
    render(<FoundationInfo data={mockDataWithEmptyAlt} />);

    expect(screen.getByAltText('')).toBeInTheDocument();
  });
});
