import { render, screen } from '@testing-library/react';

import ContentBlock from './ContentBlock';

const paragraphs = [
  { id: 1, text: 'Paragraph 1' },
  { id: 2, text: 'Paragraph 2' }
];

const listItems = [
  { id: 1, text: 'List item 1' },
  { id: 2, text: 'List item 2' }
];

const additionalDescription = [
  { id: 1, text: 'Text 1' },
  { id: 2, text: 'Text 2' }
];

describe('ContentBlock', () => {
  it('should render SectionTitle when title prop is provided', () => {
    render(<ContentBlock title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render single string description correctly', () => {
    render(<ContentBlock description="Single string description" />);
    expect(screen.getByText('Single string description')).toBeInTheDocument();
  });

  it('should render multiple paragraphs description correctly', () => {
    render(<ContentBlock description={paragraphs} />);
    paragraphs.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('should render single string list item correctly', () => {
    render(<ContentBlock list="Single list item" />);
    expect(screen.getByText('Single list item')).toBeInTheDocument();
  });

  it('should render multiple list items correctly', () => {
    render(<ContentBlock list={listItems} />);
    listItems.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('should render single string additionalDescription correctly', () => {
    render(<ContentBlock additionalDescription="Additional description" />);
    expect(screen.getByText('Additional description')).toBeInTheDocument();
  });
  it('should render multiple paragraphs additionalDescription correctly', () => {
    render(<ContentBlock additionalDescription={additionalDescription} />);
    additionalDescription.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('should render all sections together', () => {
    render(
      <ContentBlock
        title="Title"
        description={paragraphs}
        list={listItems}
        additionalDescription={additionalDescription}
      />
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    paragraphs.forEach(({ text }) => expect(screen.getByText(text)).toBeInTheDocument());
    listItems.forEach(({ text }) => expect(screen.getByText(text)).toBeInTheDocument());
    additionalDescription.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('should render only container with no content when no props are provided', () => {
    const { container } = render(<ContentBlock />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild?.textContent).toBe('');
  });
});
