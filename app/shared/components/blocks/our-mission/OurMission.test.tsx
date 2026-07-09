import { render, screen } from '@testing-library/react';
import React from 'react';

import OurMission from './OurMission';
import { IOurMission } from '~/types/page/about-us.types';

interface SectionTitleProps {
  title: string;
  'data-testid'?: string;
}

interface TipTapContentProps {
  data: { type: string };
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
}

interface ImageWithCaptionProps {
  src: string;
  alt: string;
  dataTestId?: string;
}

jest.mock('./OurMission.styles', () => ({
  styles: {
    mainContainer: {},
    title: {},
    list: {},
    smallCaptionSx: {},
    smallImg: {},
    bigCaptionSx: {},
    bigImg: {}
  }
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title, 'data-testid': testId }: SectionTitleProps) => <h1 data-testid={testId}>{title}</h1>
}));

jest.mock('~/components/list-item/ListItem', () => ({
  __esModule: true,
  default: ({ text }: { text: React.ReactNode }) => <li>{text}</li>
}));

jest.mock('~/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: TipTapContentProps) => {
    if (nodeRenderers && nodeRenderers.paragraph) {
      return <div data-testid={`tiptap-${data.type}`}>{nodeRenderers.paragraph('Paragraph Content')}</div>;
    }
    return <div data-testid={`tiptap-${data.type}`} />;
  }
}));

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: ({ src, alt, dataTestId }: ImageWithCaptionProps) => <img src={src} alt={alt} data-testid={dataTestId} />
}));

describe('OurMission', () => {
  const baseData = {
    title: 'Наша місія',
    list: [{ type: 'paragraph' }, { type: 'paragraph' }],
    smallImage: null,
    bigImage: null
  } as unknown as IOurMission;

  it('should render core layouts including section title and dynamic tiptap lists', () => {
    render(<OurMission data={baseData} />);

    expect(screen.getByTestId('OurMission')).toBeInTheDocument();
    expect(screen.getByTestId('OurMission-title')).toBeInTheDocument();
    expect(screen.getByTestId('OurMission-list')).toBeInTheDocument();

    const items = screen.getAllByTestId('tiptap-paragraph');
    expect(items.length).toBe(2);
    expect(screen.getAllByText('Paragraph Content').length).toBe(2);
  });

  it('should evaluate conditional image wrappers to complete branch coverage matrix', () => {
    const dataWithImages = {
      title: 'Наша місія',
      list: [{ type: 'paragraph' }, { type: 'paragraph' }],
      smallImage: {
        src: '/small.jpg',
        generatedSrc: '/small.jpg',
        alt: 'Small Alt Text',
        crop: { x: 0, y: 0, width: 100, height: 100 },
        caption: { uk: 'Малий підпис' }
      },
      bigImage: {
        src: '/big.jpg',
        generatedSrc: '/big.jpg',
        alt: 'Big Alt Text',
        crop: { x: 0, y: 0, width: 100, height: 100 },
        caption: 'Великий підпис'
      }
    } as unknown as IOurMission;

    render(<OurMission data={dataWithImages} />);

    expect(screen.getByTestId('OurMission-smallImage')).toBeInTheDocument();
    expect(screen.getByTestId('OurMission-bigImage')).toBeInTheDocument();
  });

  it('should process default fallback properties cleanly when image captions are unassigned', () => {
    const dataWithMissingCaptions = {
      title: 'Наша місія',
      list: [{ type: 'paragraph' }, { type: 'paragraph' }],
      smallImage: {
        src: '/small-fallback.jpg',
        generatedSrc: '/small-fallback.jpg',
        alt: 'Small Fallback Alt',
        crop: { x: 0, y: 0, width: 100, height: 100 },
        caption: null
      },
      bigImage: {
        src: '/big-fallback.jpg',
        generatedSrc: '/big-fallback.jpg',
        alt: 'Big Fallback Alt',
        crop: { x: 0, y: 0, width: 100, height: 100 },
        caption: null
      }
    } as unknown as IOurMission;

    render(<OurMission data={dataWithMissingCaptions} />);

    expect(screen.getByTestId('OurMission-smallImage')).toBeInTheDocument();
    expect(screen.getByTestId('OurMission-bigImage')).toBeInTheDocument();
  });
});
