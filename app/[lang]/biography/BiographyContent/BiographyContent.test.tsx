import { render, screen } from '@testing-library/react';
import React from 'react';

import { BiographyContent } from './BiographyContent';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import type { BiographyContentBlock } from '~/types/page/biography.types';
import { ContentType, ImagesSizes } from '~/types/page/biography.types';
import type { TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('next-intl', () => ({
  useLocale: () => 'uk'
}));

jest.mock('~/shared/components/image-with-caption/ImageWithCaption', () => {
  return function MockImageWithCaption(props: { alt?: string; dataTestId?: string; sizes?: unknown }) {
    return (
      <div data-testid={props.dataTestId ?? 'BiographyContent-image-mock'} data-sizes={JSON.stringify(props.sizes)}>
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

const makeTipTapDoc = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [
        {
          type: TipTapNodeTypes.text,
          text
        }
      ]
    }
  ]
});

const makeAdvancedImage = (args: {
  src: string;
  altUk: string;
  altEn: string;
  captionUk?: string;
  captionEn?: string;
  size: ImagesSizes;
  rectangleTopLeftCorner?: boolean;
}) => ({
  src: args.src,
  generatedSrc: `/api/blob-url?folderName=photos&blobName=${args.src}`,
  size: args.size,
  rectangleTopLeftCorner: args.rectangleTopLeftCorner ?? false,
  alt: t(args.altUk, args.altEn),
  caption:
    args.captionUk !== undefined && args.captionEn !== undefined ? t(args.captionUk, args.captionEn) : (null as any)
});

const makeImage = (args: { src: string; altUk: string; altEn: string; captionUk?: string; captionEn?: string }) => ({
  src: args.src,
  generatedSrc: `/api/blob-url?folderName=photos&blobName=${args.src}`,
  alt: t(args.altUk, args.altEn),
  caption:
    args.captionUk !== undefined && args.captionEn !== undefined ? t(args.captionUk, args.captionEn) : (null as any)
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
          captionEn: 'caption en',
          rectangleTopLeftCorner: true
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
          captionEn: 'main caption en',
          rectangleTopLeftCorner: true
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
          captionEn: 'single caption en',
          rectangleTopLeftCorner: true
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
  },
  {
    yearTitle: 'Not A Number',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: makeAdvancedImage({
          src: '/img/no-caption.png',
          size: ImagesSizes.SmallVerticalWide,
          altUk: 'no caption alt',
          altEn: 'no caption alt'
        }),
        listItems: []
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: makeAdvancedImage({
          src: '/img/no-caption-main.png',
          size: ImagesSizes.BigHorizontal,
          altUk: 'no caption alt main',
          altEn: 'no caption alt main'
        }),
        additionalImage: makeAdvancedImage({
          src: '/img/no-caption-additional.png',
          size: ImagesSizes.SmallVerticalThin,
          altUk: 'no caption alt add',
          altEn: 'no caption alt add'
        })
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: makeAdvancedImage({
          src: '/img/no-caption-single.png',
          size: ImagesSizes.BigHorizontal,
          altUk: 'no caption alt single',
          altEn: 'no caption alt single'
        })
      },
      {
        type: ContentType.FullWidthImage,
        image: makeImage({
          src: '/img/no-caption-full.png',
          altUk: 'no caption alt full',
          altEn: 'no caption alt full'
        })
      },
      {
        type: ContentType.FullWidthImage,
        image: undefined as unknown as any
      },

      {
        type: 'UNKNOWN_CONTENT_TYPE' as ContentType,
        items: []
      } as unknown as BiographyContentBlock['items'][number]
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
    const years = screen.getAllByTestId('BiographyContent-yearWithLine');
    expect(years).toHaveLength(1);
    expect(years[0]).toHaveTextContent('1910');
  });

  it('should render chronology list items for each list entry', () => {
    render(<BiographyContent data={mockBlocks} />);
    const items = screen.getAllByTestId('BiographyContent-chronologyListItem');
    expect(items.length).toBe(3);
  });

  it('should render additional image for chronology list when provided', () => {
    render(<BiographyContent data={mockBlocks} />);
    const image = screen.getAllByTestId('BiographyContent-chronologyList-imageWithCaption');
    expect(image[0]).toBeInTheDocument();
    expect(image[0]).toHaveTextContent(/alt uk/i);
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
    const left = screen.getAllByTestId('BiographyContent-onlyImageBlock-left');
    const right = screen.getAllByTestId('BiographyContent-onlyImageBlock-right');
    expect(left[0]).toBeInTheDocument();
    expect(right[0]).toBeInTheDocument();
  });

  it('should render single image block when OnlyImageBlock has no additionalImage', () => {
    render(<BiographyContent data={mockBlocks} />);
    const single = screen.getAllByTestId('BiographyContent-onlyImageBlock-single');
    expect(single[0]).toBeInTheDocument();
  });

  it('should render full width image block', () => {
    render(<BiographyContent data={mockBlocks} />);
    const fullWidth = screen.getAllByTestId('BiographyContent-fullWidthImage');
    expect(fullWidth[0]).toBeInTheDocument();
    expect(screen.getByText(/full alt uk/i)).toBeInTheDocument();
  });

  it('should pass sizes prop correctly to ImageWithCaption elements', () => {
    render(<BiographyContent data={mockBlocks} />);
    const images = screen.getAllByTestId(/imageWithCaption|mainImage|additionalImage/i);
    images.forEach((img) => {
      expect(img).toHaveAttribute('data-sizes');
    });
  });
});
