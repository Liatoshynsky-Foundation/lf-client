import { render, screen } from '@testing-library/react';
import React from 'react';

import ContentBlock from './ContentBlock';
import type { TipTapDoc } from '~/types/types/tiptap.types';

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

jest.mock('next-intl', () => ({
  useLocale: () => 'uk'
}));

const mockTipTapData = {
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'TipTap Real Text' }]
    }
  ]
} as unknown as TipTapDoc;

describe('ContentBlock', () => {
  it('should render title when provided', () => {
    render(<ContentBlock title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  describe('Description Coverage', () => {
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

    it('should render TipTap description (covers lines 44, 60-73)', () => {
      render(<ContentBlock description={mockTipTapData} />);
      expect(screen.getByText('TipTap Real Text')).toBeInTheDocument();
    });
  });

  describe('List Coverage', () => {
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

    it('should render TipTap list (covers lines 85-98)', () => {
      const { container } = render(<ContentBlock list={mockTipTapData} />);

      expect(screen.getByText('TipTap Real Text')).toBeInTheDocument();

      const bulletIcon = container.querySelector('img[src*="bullet-small"]');
      expect(bulletIcon).toBeInTheDocument();
    });
  });

  describe('Additional Description Coverage', () => {
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

    it('should render TipTap additionalDescription', () => {
      render(<ContentBlock additionalDescription={mockTipTapData} />);
      expect(screen.getByText('TipTap Real Text')).toBeInTheDocument();
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
    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('Text 1')).toBeInTheDocument();
  });

  it('should render only container with no content when no props are provided', () => {
    const { container } = render(<ContentBlock />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.textContent?.trim()).toBe('');
  });

  it('should cover style merge branch with textSx', () => {
    render(<ContentBlock description={mockTipTapData} textSx={{ color: 'red' }} />);
    expect(screen.getByText('TipTap Real Text')).toBeInTheDocument();
  });

  it('should cover all style array branches (lines 31, 51, 79, 111) when styles are arrays', () => {
    const mockArraySx = [{ color: 'red' }, { fontSize: '16px' }];

    render(
      <ContentBlock
        description={mockTipTapData}
        list={mockTipTapData}
        additionalDescription={mockTipTapData}
        textSx={mockArraySx}
        additionalTextSx={mockArraySx}
        containerSx={mockArraySx}
      />
    );

    expect(screen.getAllByText('TipTap Real Text').length).toBeGreaterThan(0);
  });
});
