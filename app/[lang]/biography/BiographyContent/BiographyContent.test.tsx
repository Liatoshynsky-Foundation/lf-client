import { render, screen } from '@testing-library/react';
import React from 'react';

import { BiographyContent } from './BiographyContent';
import type { BiographyContentBlock } from '~/types/page/biography.types';
import { ContentType } from '~/types/page/biography.types';
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

const makeTipTapDoc = (text: string): TipTapDoc =>
  ({
    content: [
      {
        content: [{ text }]
      }
    ]
  }) as unknown as TipTapDoc;

const mockBlocks: BiographyContentBlock[] = [
  {
    yearTitle: '1910',
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: {
          src: '/img/additional.png',
          size: 0 as any,
          alt: {
            uk: makeTipTapDoc('alt uk'),
            en: makeTipTapDoc('alt en')
          },
          caption: {
            uk: makeTipTapDoc('caption uk'),
            en: makeTipTapDoc('caption en')
          }
        },
        listItems: [
          { description: { uk: makeTipTapDoc('item 1 uk'), en: makeTipTapDoc('item 1 en') } },
          { description: { uk: makeTipTapDoc('item 2 uk'), en: makeTipTapDoc('item 2 en') } }
        ]
      },
      {
        type: ContentType.ExcerptBlockItem,
        quote: {
          quoteText: {
            uk: makeTipTapDoc('quote text uk'),
            en: makeTipTapDoc('quote text en')
          },
          sourceText: {
            uk: makeTipTapDoc('source text uk'),
            en: makeTipTapDoc('source text en')
          }
        }
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: {
          src: '/img/main.png',
          size: 0 as any,
          alt: {
            uk: makeTipTapDoc('main alt uk'),
            en: makeTipTapDoc('main alt en')
          },
          caption: {
            uk: makeTipTapDoc('main caption uk'),
            en: makeTipTapDoc('main caption en')
          }
        },
        additionalImage: {
          src: '/img/left.png',
          size: 0 as any,
          alt: {
            uk: makeTipTapDoc('left alt uk'),
            en: makeTipTapDoc('left alt en')
          },
          caption: {
            uk: makeTipTapDoc('left caption uk'),
            en: makeTipTapDoc('left caption en')
          }
        }
      },
      {
        type: ContentType.OnlyImageBlock,
        mainImage: {
          src: '/img/single.png',
          size: 0 as any,
          alt: {
            uk: makeTipTapDoc('single alt uk'),
            en: makeTipTapDoc('single alt en')
          },
          caption: {
            uk: makeTipTapDoc('single caption uk'),
            en: makeTipTapDoc('single caption en')
          }
        }
      },
      {
        type: ContentType.FullWidthImage,
        image: {
          src: '/img/full.png',
          alt: {
            uk: makeTipTapDoc('full alt uk'),
            en: makeTipTapDoc('full alt en')
          },
          caption: {
            uk: makeTipTapDoc('full caption uk'),
            en: makeTipTapDoc('full caption en')
          }
        }
      }
    ]
  },
  {
    yearTitle: undefined,
    items: [
      {
        type: ContentType.ChronologyList,
        additionalImage: undefined,
        listItems: [{ description: { uk: makeTipTapDoc('no-year item uk'), en: makeTipTapDoc('no-year item en') } }]
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
