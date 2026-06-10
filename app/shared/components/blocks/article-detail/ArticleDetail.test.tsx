import { render, screen } from '@testing-library/react';

import type { ArticleDetailProps } from './ArticleDetail';
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

const baseProps: ArticleDetailProps = {
  lang: 'uk',
  title: 'Лятошинський. 30 років після запису',
  blocks: mockBlocks,
  backLabel: 'Повернутись до новин',
  backPath: '/news'
};

describe('ArticleDetail', () => {
  beforeEach(() => {
    capturedBlockNoteBlocks = undefined;
  });

  it('renders inside MainLayout', async () => {
    render(await ArticleDetail(baseProps));
    expect(screen.getByTestId('MainLayout')).toBeInTheDocument();
  });

  it('renders the article title', async () => {
    render(await ArticleDetail(baseProps));
    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
  });

  it('renders the back link with correct path for uk lang', async () => {
    render(await ArticleDetail({ ...baseProps, lang: 'uk' }));
    expect(screen.getByTestId('BackLink')).toHaveAttribute('href', '/uk/news');
  });

  it('renders the back link with correct path for en lang', async () => {
    render(await ArticleDetail({ ...baseProps, lang: 'en' }));
    expect(screen.getByTestId('BackLink')).toHaveAttribute('href', '/en/news');
  });

  it('renders back link label from backLabel prop', async () => {
    render(await ArticleDetail(baseProps));
    expect(screen.getByText('Повернутись до новин')).toBeInTheDocument();
  });

  it('renders publication date with translation prefix when date is provided', async () => {
    render(await ArticleDetail({ ...baseProps, date: '01.05.24' }));
    expect(screen.getByText(/publishedAtLabel.*01\.05\.24/)).toBeInTheDocument();
  });

  it('does not render date section when date is not provided', async () => {
    render(await ArticleDetail(baseProps));
    expect(screen.queryByText(/publishedAtLabel/)).not.toBeInTheDocument();
  });

  it('passes blocks to BlockNoteContent', async () => {
    render(await ArticleDetail(baseProps));
    expect(screen.getByTestId('BlockNoteContent')).toBeInTheDocument();
    expect(capturedBlockNoteBlocks).toEqual(mockBlocks);
  });

  it('passes empty blocks array to BlockNoteContent when blocks is empty', async () => {
    render(await ArticleDetail({ ...baseProps, blocks: [] }));
    expect(capturedBlockNoteBlocks).toEqual([]);
  });

  it('renders registrationBlock when provided', async () => {
    render(
      await ArticleDetail({
        ...baseProps,
        registrationBlock: <div data-testid="RegBlock">Register</div>
      })
    );
    expect(screen.getByTestId('RegBlock')).toBeInTheDocument();
  });

  it('renders BlockNoteContent alongside registrationBlock when provided', async () => {
    render(
      await ArticleDetail({
        ...baseProps,
        registrationBlock: <div data-testid="RegBlock">Register</div>
      })
    );
    expect(screen.getByTestId('RegBlock')).toBeInTheDocument();
    expect(screen.getByTestId('BlockNoteContent')).toBeInTheDocument();
  });

  it('renders BlockNoteContent without registrationBlock when not provided', async () => {
    render(await ArticleDetail(baseProps));
    expect(screen.getByTestId('BlockNoteContent')).toBeInTheDocument();
    expect(screen.queryByTestId('RegBlock')).not.toBeInTheDocument();
  });
});
