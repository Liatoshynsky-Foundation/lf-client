import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { FAQ } from './Faq';

describe('FAQ component', () => {
  const title = 'What is title';
  const content = 'title is a a sequence of words which defines overall meaning of the text';

  test('renders the FAQ title', () => {
    render(<FAQ title={title} content={content} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('does not show the content initially', () => {
    render(<FAQ title={title} content={content} />);
    const contentElement = screen.queryByText(content);
    expect(contentElement).not.toBeVisible();
  });

  test('shows plus icon initially', () => {
    render(<FAQ title={title} content={content} />);
    expect(screen.getByAltText('toggle icon')).toBeInTheDocument();
  });

  test('shows minus icon after clicking to expand', () => {
    render(<FAQ title={title} content={content} />);
    const toggleButton = screen.getByRole('img');
    fireEvent.click(toggleButton);
    expect(screen.getByAltText('toggle icon')).toBeInTheDocument();
  });

  test('shows the content after expanding', () => {
    render(<FAQ title={title} content={content} />);
    const toggleButton = screen.getByRole('img');
    fireEvent.click(toggleButton);
    expect(screen.getByText(content)).toBeVisible();
  });
});
