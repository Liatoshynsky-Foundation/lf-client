import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { FaqAccordion } from './FaqAccordion';

describe('FaqAccordion component', () => {
  const title = 'What is title';
  const content = 'title is a a sequence of words which defines overall meaning of the text';
  beforeEach(() => {
    render(<FaqAccordion title={title} content={content} />);
  });

  it('should render the FaqAccordion title', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should not show the content initially', () => {
    const contentElement = screen.queryByText(content);
    expect(contentElement).not.toBeVisible();
  });

  it('should not show plus icon initially', () => {
    const icons = screen.getAllByAltText('toggle icon');
    expect(icons[0]).toBeInTheDocument();
  });

  it('should show minus icon after clicking to expand', () => {
    const toggleButton = screen.getByRole('img');
    fireEvent.click(toggleButton);
    expect(screen.getByAltText('toggle icon')).toBeInTheDocument();
  });

  it('should show the content after expanding', () => {
    const toggleButton = screen.getByRole('img');
    fireEvent.click(toggleButton);
    expect(screen.getByText(content)).toBeVisible();
  });
});
