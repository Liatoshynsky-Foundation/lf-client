import { render, screen } from '@testing-library/react';

import TitleWithDescription from './TitleWithDescription';

describe('TitleWithDescription', () => {
  it('should render title text', () => {
    render(<TitleWithDescription variant="goals" title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(<TitleWithDescription variant="goals" title="Title" description="Description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('should not render description when not provided', () => {
    render(<TitleWithDescription variant="goals" title="Title" />);
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });

  it('should work with different variants', () => {
    render(<TitleWithDescription variant="whatWeDo" title="Title" />);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });
});
