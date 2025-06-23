import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Faq } from './Faq';

describe('Faq component', () => {
  const title = 'What is title';
  const content = 'title is a a sequence of words which defines overall meaning of the text';

  it('renders the Faq title', () => {
    render(<Faq title={title} content={content} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('does not show the content initially', () => {
    render(<Faq title={title} content={content} />);
    const contentElement = screen.queryByText(content);
    expect(contentElement).not.toBeVisible();
  });

  it('shows plus icon initially', () => {
    render(<Faq title={title} content={content} />);
    expect(screen.getByAltText('toggle icon')).toBeInTheDocument();
  });

  it('shows minus icon after clicking to expand', () => {
    render(<Faq title={title} content={content} />);
    const toggleButton = screen.getByRole('img');
    fireEvent.click(toggleButton);
    expect(screen.getByAltText('toggle icon')).toBeInTheDocument();
  });

  it('shows the content after expanding', () => {
    render(<Faq title={title} content={content} />);
    const toggleButton = screen.getByRole('img');
    fireEvent.click(toggleButton);
    expect(screen.getByText(content)).toBeVisible();
  });
});
