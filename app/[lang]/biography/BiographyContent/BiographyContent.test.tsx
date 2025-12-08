import { render, screen } from '@testing-library/react';
import React from 'react';

import { BiographyContent } from './BiographyContent';
import type { BiographyContentBlock } from '~/types/page/biography.types';
import { ContentType, ImagesSizes } from '~/types/page/biography.types';
import type { TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('next-intl', () => ({
  useLocale: () => 'uk'
}));

jest.mock('~/shared/components/image-with-caption/ImageWithCaption', () => {
  return function MockImageWithCaption(props: { alt?: string; dataTestId?: string }) {
    return (
      <div data-testid={props.dataTestId ?? 'BiographyContent-image-mock'}>
        mocked-image: {props.alt ?? 'mock-image'}
      </div>
    );
  };
});

jest.mock('~/shared/components/excerpt-block/ExcerptBlock', () => {
  return function MockExcerptBlock(props: { quote: string; source: string; dataTestId?: string }) {
    return (
      <div data-testid={props.dataTestId ?? 'BiographyContent-excerptBlock-mock'}>
        <span data-testid="BiographyContent-excerpt-quote">{props.quote}</span>
        <span data-testid="BiographyContent-excerpt-source">{props.source}</span>
      </div>
    );
  };
});

jest.mock('~/shared/components/design-system/all-components/content-block/ContentBlock', () => {
  return function MockContentBlock(props: { dataTestId?: string }) {
    return <div data-testid={props.dataTestId ?? 'BiographyContent-contentBlock-mock'} />;
  };
});

jest.mock('~/shared/components/year-with-line/YearWithLine', () => {
  return function MockYearWithLine(props: { year: number }) {
    return <div data-testid="BiographyContent-yearWithLine">{props.year}</div>;
  };
});

const t = (uk: string, _en: string) => uk;

const makeTipTapDoc = (text: string): TipTapDoc =>
  ({
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text }]
      }
    ]
  }) as TipTapDoc;

const makeAdvancedImage = (args: {
  src: string;
  altUk: string;
  altEn: string;
  captionUk: string;
  captionEn: string;
  size: ImagesSizes;
  rectangleTopLeftCorner?: boolean;
}) => ({
  src: args.src,
  generatedSrc: `/api/blob-url?folderName=photos&blobName=${args.src}`,
  size: args.size,
  rectangleTopLeftCorner: args.rectangleTopLeftCorner ?? false,
  alt: t(args.altUk, args.altEn),
  caption: t(args.captionUk, args.captionEn)
});

const makeImage = (args: { src: string; altUk: string; altEn: string; captionUk: string; captionEn: string }) => ({
  src: args.src,
  generatedSrc: `/api/blob-url?folderName=photos&blobName=${args.src}`,
  alt: t(args.altUk, args.altEn),
  caption: t(args.captionUk, args.captionEn)
});

const mockBlocks: BiographyContentBlock[] = [
  {
    yearTitle: '1910',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: makeAdvancedImage({
          src: '/img/additional.png',
          size: ImagesSizes.SmallVerticalWide,
          altUk: 'alt uk',
          altEn: 'alt en',
          captionUk: 'caption uk',
          captionEn: 'caption en'
        }),
        listItems: [{ description: makeTipTapDoc('item 1 uk') }, { description: makeTipTapDoc('item 2 uk') }]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          text: t('quote text uk', 'quote text en'),
          source: t('source text uk', 'source text en')
        }
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: makeAdvancedImage({
          src: '/img/main.png',
          size: ImagesSizes.BigHorizontal,
          altUk: 'main alt uk',
          altEn: 'main alt en',
          captionUk: 'main caption uk',
          captionEn: 'main caption en'
        }),
        additionalImage: makeAdvancedImage({
          src: '/img/left.png',
          size: ImagesSizes.SmallVerticalThin,
          altUk: 'left alt uk',
          altEn: 'left alt en',
          captionUk: 'left caption uk',
          captionEn: 'left caption en'
        })
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: makeAdvancedImage({
          src: '/img/single.png',
          size: ImagesSizes.BigHorizontal,
          altUk: 'single alt uk',
          altEn: 'single alt en',
          captionUk: 'single caption uk',
          captionEn: 'single caption en'
        })
      },
      {
        type: ContentType.FullWidthImage,
        image: makeImage({
          src: '/img/full.png',
          altUk: 'full alt uk',
          altEn: 'full alt en',
          captionUk: 'full caption uk',
          captionEn: 'full caption en'
        })
      }
    ]
  },
  {
    yearTitle: null,
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [{ description: makeTipTapDoc('no-year item uk') }]
      }
    ]
  }
];

describe('BiographyContent', () => {
  it('should render main container', () => {
    render(<BiographyContent data={mockBlocks} />);
    expect(screen.getByTestId('BiographyContent')).toBeInTheDocument();
  });

  it('should render year line for blocks with numeric yearTitle', () => {
    render(<BiographyContent data={mockBlocks} />);
    const year = screen.getByTestId('BiographyContent-yearWithLine');
    expect(year).toBeInTheDocument();
    expect(year).toHaveTextContent('1910');
  });

  it('should render chronology list items for each list entry', () => {
    render(<BiographyContent data={mockBlocks} />);
    const items = screen.getAllByTestId('BiographyContent-chronologyListItem');
    expect(items.length).toBe(3);
  });

  it('should render additional image for chronology list when provided', () => {
    render(<BiographyContent data={mockBlocks} />);
    const image = screen.getByTestId('BiographyContent-chronologyList-imageWithCaption');
    expect(image).toBeInTheDocument();
    expect(image).toHaveTextContent(/alt uk/i);
  });

  it('should render excerpt block with quote and source text', () => {
    render(<BiographyContent data={mockBlocks} />);
    const excerpt = screen.getByTestId('BiographyContent-excerptBlock');
    expect(excerpt).toBeInTheDocument();
    expect(screen.getByTestId('BiographyContent-excerpt-quote')).toHaveTextContent(/quote text uk/i);
    expect(screen.getByTestId('BiographyContent-excerpt-source')).toHaveTextContent(/source text uk/i);
  });

  it('should render both left and right images for OnlyImageBlock with additionalImage', () => {
    render(<BiographyContent data={mockBlocks} />);
    const left = screen.getByTestId('BiographyContent-onlyImageBlock-left');
    const right = screen.getByTestId('BiographyContent-onlyImageBlock-right');
    expect(left).toBeInTheDocument();
    expect(right).toBeInTheDocument();
  });

  it('should render single image block when OnlyImageBlock has no additionalImage', () => {
    render(<BiographyContent data={mockBlocks} />);
    const single = screen.getByTestId('BiographyContent-onlyImageBlock-single');
    expect(single).toBeInTheDocument();
  });

  it('should render full width image block', () => {
    render(<BiographyContent data={mockBlocks} />);
    const fullWidth = screen.getByTestId('BiographyContent-fullWidthImage');
    expect(fullWidth).toBeInTheDocument();
    expect(screen.getByText(/full alt uk/i)).toBeInTheDocument();
  });
});
