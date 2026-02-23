import { render, screen } from '@testing-library/react';

import EmptyState from './EmptyState';

describe('EmptyState Component', () => {
  const defaultProps = {
    title: 'No content found',
    description: 'There is no content to display at the moment',
    dataTestId: 'TestEmptyState'
  };

  it('should render with title and description', () => {
    render(<EmptyState {...defaultProps} />);

    expect(screen.getByTestId('TestEmptyState')).toBeInTheDocument();
    expect(screen.getByTestId('TestEmptyState-title')).toHaveTextContent('No content found');
    expect(screen.getByTestId('TestEmptyState-description')).toHaveTextContent(
      'There is no content to display at the moment'
    );
  });

  it('should render without description when not provided', () => {
    const propsWithoutDescription = {
      title: 'No content found',
      dataTestId: 'TestEmptyState'
    };

    render(<EmptyState {...propsWithoutDescription} />);

    expect(screen.getByTestId('TestEmptyState')).toBeInTheDocument();
    expect(screen.getByTestId('TestEmptyState-title')).toHaveTextContent('No content found');
    expect(screen.queryByTestId('TestEmptyState-description')).not.toBeInTheDocument();
  });

  it('should use default dataTestId when not provided', () => {
    const propsWithoutTestId = {
      title: 'No content found'
    };

    render(<EmptyState {...propsWithoutTestId} />);

    expect(screen.getByTestId('EmptyState')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<EmptyState {...defaultProps} />);

    const container = screen.getByTestId('TestEmptyState');
    expect(container).toHaveAttribute('role', 'status');
    expect(container).toHaveAttribute('aria-live', 'polite');
  });
});
