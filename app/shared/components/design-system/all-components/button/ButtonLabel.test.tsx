import { render, screen } from '@testing-library/react';

import { ButtonLabel } from './ButtonLabel';

jest.mock('./Button.styles', () => ({
  styles: {
    short: { display: 'none' },
    full: { display: 'inline' }
  }
}));

describe('ButtonLabel', () => {
  it('should render children when provided and ignore label and shortLabel props', () => {
    render(
      <ButtonLabel label="Full Label" shortLabel="Short">
        <span data-testid="custom-child">Child Content</span>
      </ButtonLabel>
    );

    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
    expect(screen.queryByText('Full Label')).not.toBeInTheDocument();
    expect(screen.queryByText('Short')).not.toBeInTheDocument();
  });

  it('should render both shortLabel and full label when both props are passed together', () => {
    render(<ButtonLabel label="Full Label" shortLabel="Short" />);

    const shortElement = screen.getByText('Short');
    const fullElement = screen.getByText('Full Label');

    expect(shortElement).toBeInTheDocument();
    expect(shortElement).toHaveAttribute('aria-hidden', 'true');
    expect(fullElement).toBeInTheDocument();
  });

  it('should render only full label when shortLabel is missing', () => {
    render(<ButtonLabel label="Only Full Label" />);

    expect(screen.getByText('Only Full Label')).toBeInTheDocument();
  });

  it('should render only shortLabel when full label is missing', () => {
    render(<ButtonLabel shortLabel="Only Short" />);

    expect(screen.getByText('Only Short')).toBeInTheDocument();
  });

  it('should render null clean when absolutely no props or children are provided', () => {
    const { container } = render(<ButtonLabel />);

    expect(container.firstChild).toBeNull();
  });
});
