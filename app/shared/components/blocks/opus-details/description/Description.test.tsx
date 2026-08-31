import { render, screen } from '@testing-library/react';
import React from 'react';

import Description from './Description';

describe('Description', () => {
  it('should split description by double newlines and render paragraphs', () => {
    const text = 'Paragraph 1\n\nParagraph 2\n\n\nParagraph 3\n\n  \n\nParagraph 4';
    render(<Description description={text} />);

    expect(screen.getByText('Paragraph 1')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 2')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 3')).toBeInTheDocument();
    expect(screen.getByText('Paragraph 4')).toBeInTheDocument();
  });

  it('should handle single paragraph without newlines', () => {
    render(<Description description="Just a single paragraph" />);
    expect(screen.getByText('Just a single paragraph')).toBeInTheDocument();
  });
});
