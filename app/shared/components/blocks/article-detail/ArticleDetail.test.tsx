import { render, screen } from '@testing-library/react';

import { ArticleDetail } from './ArticleDetail';
import type { BlockNoteBlock } from './BlockNoteContent';

let capturedBlockNoteBlocks: BlockNoteBlock[] | undefined;

jest.mock('~/layouts/main-layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="MainLayout">{children}</div>
}));

jest.mock('~/ds-components/link/CustomLink', () => ({
  __esModule: true,
  default: ({ children, path }: { children: React.ReactNode; path: string }) => (
    <a data-testid="BackLink" href={path}>
      {children}
    </a>
  )
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  SvgImage: () => <span data-testid="SvgImage" />
}));

jest.mock('./BlockNoteContent', () => ({
  BlockNoteContent: ({ blocks }: { blocks: BlockNoteBlock[] }) => {
    capturedBlockNoteBlocks = blocks;
    return <div data-testid="BlockNoteContent" />;
  }
}));

const mockBlocks: BlockNoteBlock[] = [
  { id: '1', type: 'paragraph', props: {}, content: [{ type: 'text', text: 'Hello', styles: {} }], children: [] },
  {
    id: '2',
    type: 'heading',
    props: { level: 2 },
    content: [{ type: 'text', text: 'Section', styles: {} }],
    children: []
  }
];

const baseProps = {
  lang: 'uk',
  coverImage: { src: 'https://example.com/image.jpg', alt: 'Cover' },
  title: 'Лятошинський. 30 років після запису',
  blocks: mockBlocks
};

describe('ArticleDetail', () => {
  beforeEach(() => {
    capturedBlockNoteBlocks = undefined;
  });

  it('renders inside MainLayout', () => {
    render(<ArticleDetail {...baseProps} />);
    expect(screen.getByTestId('MainLayout')).toBeInTheDocument();
  });

  it('renders the article title', () => {
    render(<ArticleDetail {...baseProps} />);
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
  });

  it('renders the back link with correct path for lang', () => {
    render(<ArticleDetail {...baseProps} lang="uk" />);
    const link = screen.getByTestId('BackLink');
    expect(link).toHaveAttribute('href', '/uk/news');
  });

  it('renders the back link with correct path for different lang', () => {
    render(<ArticleDetail {...baseProps} lang="en" />);
    const link = screen.getByTestId('BackLink');
    expect(link).toHaveAttribute('href', '/en/news');
  });

  it('renders publication date with prefix when date is provided', () => {
    render(<ArticleDetail {...baseProps} date="01.05.24" />);
    expect(screen.getByText(/Опубліковано:.*01\.05\.24/)).toBeInTheDocument();
  });

  it('renders without crashing when date is not provided', () => {
    render(<ArticleDetail {...baseProps} date={undefined} />);
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
  });

  it('passes blocks to BlockNoteContent', () => {
    render(<ArticleDetail {...baseProps} />);
    expect(screen.getByTestId('BlockNoteContent')).toBeInTheDocument();
    expect(capturedBlockNoteBlocks).toEqual(mockBlocks);
  });

  it('passes empty blocks array to BlockNoteContent when blocks is empty', () => {
    render(<ArticleDetail {...baseProps} blocks={[]} />);
    expect(capturedBlockNoteBlocks).toEqual([]);
  });
});
