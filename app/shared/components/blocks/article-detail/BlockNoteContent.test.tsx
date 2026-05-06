import { render, screen } from '@testing-library/react';

import { type BlockNoteBlock, BlockNoteContent } from './BlockNoteContent';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} data-testid="next-image" />
}));

const makeBlock = (overrides: Partial<BlockNoteBlock> & Pick<BlockNoteBlock, 'type'>): BlockNoteBlock => ({
  id: 'test-id',
  props: {},
  content: [],
  children: [],
  ...overrides
});

const textBlock = (text: string, styles = {}): BlockNoteBlock =>
  makeBlock({
    type: 'paragraph',
    content: [{ type: 'text', text, styles }]
  });

describe('BlockNoteContent', () => {
  describe('empty state', () => {
    it('renders without crashing when blocks is empty', () => {
      const { container } = render(<BlockNoteContent blocks={[]} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('paragraph', () => {
    it('renders paragraph text', () => {
      render(<BlockNoteContent blocks={[textBlock('Hello world')]} />);
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });

    it('renders paragraph as <p> element', () => {
      render(<BlockNoteContent blocks={[textBlock('Paragraph text')]} />);
      expect(screen.getByText('Paragraph text').tagName).toBe('P');
    });
  });

  describe('text styles', () => {
    it('renders bold text inside <strong>', () => {
      render(<BlockNoteContent blocks={[textBlock('Bold', { bold: true })]} />);
      expect(document.querySelector('strong')).toHaveTextContent('Bold');
    });

    it('renders italic text inside <em>', () => {
      render(<BlockNoteContent blocks={[textBlock('Italic', { italic: true })]} />);
      expect(document.querySelector('em')).toHaveTextContent('Italic');
    });

    it('renders underlined text inside <u>', () => {
      render(<BlockNoteContent blocks={[textBlock('Underline', { underline: true })]} />);
      expect(document.querySelector('u')).toHaveTextContent('Underline');
    });

    it('renders strikethrough text inside <s>', () => {
      render(<BlockNoteContent blocks={[textBlock('Strike', { strikethrough: true })]} />);
      expect(document.querySelector('s')).toHaveTextContent('Strike');
    });

    it('renders code text inside <code>', () => {
      render(<BlockNoteContent blocks={[textBlock('const x = 1', { code: true })]} />);
      expect(document.querySelector('code')).toHaveTextContent('const x = 1');
    });

    it('renders combined bold and italic styles', () => {
      render(<BlockNoteContent blocks={[textBlock('BoldItalic', { bold: true, italic: true })]} />);
      expect(document.querySelector('em strong')).toHaveTextContent('BoldItalic');
    });

    it('renders plain text without wrapper tags when no styles', () => {
      render(<BlockNoteContent blocks={[textBlock('Plain')]} />);
      expect(screen.getByText('Plain')).toBeInTheDocument();
      expect(document.querySelector('strong')).toBeNull();
      expect(document.querySelector('em')).toBeNull();
    });
  });

  describe('links', () => {
    it('renders link with correct href', () => {
      const block = makeBlock({
        type: 'paragraph',
        content: [
          { type: 'link', href: 'https://example.com', content: [{ type: 'text', text: 'Click me', styles: {} }] }
        ]
      });
      render(<BlockNoteContent blocks={[block]} />);
      const link = screen.getByRole('link', { name: 'Click me' });
      expect(link).toHaveAttribute('href', 'https://example.com');
    });

    it('renders link with target="_blank" and rel="noopener noreferrer"', () => {
      const block = makeBlock({
        type: 'paragraph',
        content: [{ type: 'link', href: 'https://example.com', content: [{ type: 'text', text: 'Link', styles: {} }] }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      const link = screen.getByRole('link', { name: 'Link' });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('headings', () => {
    it('renders heading level 1 as h1', () => {
      const block = makeBlock({
        type: 'heading',
        props: { level: 1 },
        content: [{ type: 'text', text: 'Title H1', styles: {} }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByRole('heading', { level: 1, name: 'Title H1' })).toBeInTheDocument();
    });

    it('renders heading level 2 as h2', () => {
      const block = makeBlock({
        type: 'heading',
        props: { level: 2 },
        content: [{ type: 'text', text: 'Title H2', styles: {} }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByRole('heading', { level: 2, name: 'Title H2' })).toBeInTheDocument();
    });

    it('renders heading level 3 as h3', () => {
      const block = makeBlock({
        type: 'heading',
        props: { level: 3 },
        content: [{ type: 'text', text: 'Title H3', styles: {} }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByRole('heading', { level: 3, name: 'Title H3' })).toBeInTheDocument();
    });

    it('caps heading level at h3 for level > 3', () => {
      const block = makeBlock({
        type: 'heading',
        props: { level: 5 },
        content: [{ type: 'text', text: 'Title H5', styles: {} }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByRole('heading', { level: 3, name: 'Title H5' })).toBeInTheDocument();
    });
  });

  describe('bullet list', () => {
    it('renders bullet list items inside <ul>', () => {
      const blocks = [
        makeBlock({ id: '1', type: 'bulletListItem', content: [{ type: 'text', text: 'Item A', styles: {} }] }),
        makeBlock({ id: '2', type: 'bulletListItem', content: [{ type: 'text', text: 'Item B', styles: {} }] })
      ];
      render(<BlockNoteContent blocks={blocks} />);
      expect(document.querySelector('ul')).toBeInTheDocument();
      expect(screen.getByText('Item A')).toBeInTheDocument();
      expect(screen.getByText('Item B')).toBeInTheDocument();
    });

    it('groups consecutive bullet items into one <ul>', () => {
      const blocks = [
        makeBlock({ id: '1', type: 'bulletListItem', content: [{ type: 'text', text: 'A', styles: {} }] }),
        makeBlock({ id: '2', type: 'bulletListItem', content: [{ type: 'text', text: 'B', styles: {} }] }),
        makeBlock({ id: '3', type: 'bulletListItem', content: [{ type: 'text', text: 'C', styles: {} }] })
      ];
      render(<BlockNoteContent blocks={blocks} />);
      expect(document.querySelectorAll('ul')).toHaveLength(1);
    });

    it('creates separate <ul> groups when separated by a paragraph', () => {
      const blocks = [
        makeBlock({ id: '1', type: 'bulletListItem', content: [{ type: 'text', text: 'A', styles: {} }] }),
        textBlock('Paragraph between'),
        makeBlock({ id: '3', type: 'bulletListItem', content: [{ type: 'text', text: 'B', styles: {} }] })
      ];
      render(<BlockNoteContent blocks={blocks} />);
      expect(document.querySelectorAll('ul')).toHaveLength(2);
    });

    it('renders nested children inside bullet list item', () => {
      const childBlock = makeBlock({
        id: 'child',
        type: 'bulletListItem',
        content: [{ type: 'text', text: 'Nested', styles: {} }]
      });
      const block = makeBlock({
        id: 'parent',
        type: 'bulletListItem',
        content: [{ type: 'text', text: 'Parent', styles: {} }],
        children: [childBlock]
      });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByText('Nested')).toBeInTheDocument();
    });
  });

  describe('numbered list', () => {
    it('renders numbered list items inside <ol>', () => {
      const blocks = [
        makeBlock({ id: '1', type: 'numberedListItem', content: [{ type: 'text', text: 'Step 1', styles: {} }] }),
        makeBlock({ id: '2', type: 'numberedListItem', content: [{ type: 'text', text: 'Step 2', styles: {} }] })
      ];
      render(<BlockNoteContent blocks={blocks} />);
      expect(document.querySelector('ol')).toBeInTheDocument();
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
    });

    it('creates separate groups for bullet and numbered lists', () => {
      const blocks = [
        makeBlock({ id: '1', type: 'bulletListItem', content: [{ type: 'text', text: 'Bullet', styles: {} }] }),
        makeBlock({ id: '2', type: 'numberedListItem', content: [{ type: 'text', text: 'Number', styles: {} }] })
      ];
      render(<BlockNoteContent blocks={blocks} />);
      expect(document.querySelector('ul')).toBeInTheDocument();
      expect(document.querySelector('ol')).toBeInTheDocument();
    });
  });

  describe('checkListItem', () => {
    it('renders checked checkbox', () => {
      const block = makeBlock({
        type: 'checkListItem',
        props: { checked: true },
        content: [{ type: 'text', text: 'Done', styles: {} }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('renders unchecked checkbox', () => {
      const block = makeBlock({
        type: 'checkListItem',
        props: { checked: false },
        content: [{ type: 'text', text: 'Todo', styles: {} }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders checkbox as readOnly', () => {
      const block = makeBlock({
        type: 'checkListItem',
        props: { checked: true },
        content: [{ type: 'text', text: 'Task', styles: {} }]
      });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByRole('checkbox')).toHaveAttribute('readOnly');
    });
  });

  describe('image', () => {
    it('renders image with correct src and alt from caption', () => {
      const block = makeBlock({ type: 'image', props: { url: 'https://example.com/photo.jpg', caption: 'A photo' } });
      render(<BlockNoteContent blocks={[block]} />);
      const img = screen.getByTestId('next-image');
      expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
      expect(img).toHaveAttribute('alt', 'A photo');
    });

    it('renders figcaption when caption is provided', () => {
      const block = makeBlock({
        type: 'image',
        props: { url: 'https://example.com/photo.jpg', caption: 'My caption' }
      });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByText('My caption')).toBeInTheDocument();
    });

    it('does not render figcaption when caption is empty', () => {
      const block = makeBlock({ type: 'image', props: { url: 'https://example.com/photo.jpg', caption: '' } });
      render(<BlockNoteContent blocks={[block]} />);
      expect(document.querySelector('figcaption')).toBeNull();
    });

    it('renders nothing when image src is missing', () => {
      const block = makeBlock({ type: 'image', props: { url: '' } });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.queryByTestId('next-image')).not.toBeInTheDocument();
    });
  });

  describe('unknown block type', () => {
    it('renders inline content for unknown type', () => {
      const block = makeBlock({ type: 'unknown', content: [{ type: 'text', text: 'Fallback text', styles: {} }] });
      render(<BlockNoteContent blocks={[block]} />);
      expect(screen.getByText('Fallback text')).toBeInTheDocument();
    });

    it('renders nothing for unknown type without content', () => {
      const block = makeBlock({ type: 'unknown', content: [] });
      const { container } = render(<BlockNoteContent blocks={[block]} />);
      expect(container.textContent).toBe('');
    });
  });
});
