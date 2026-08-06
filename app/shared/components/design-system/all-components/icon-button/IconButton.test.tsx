import { render, screen } from '@testing-library/react';

import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('should render a loader', () => {
    render(<IconButton loading={true} />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should render an IconButton with correct props', () => {
    render(<IconButton />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();
    expect(button).toHaveStyle('color: white');
    expect(button).toHaveStyle('backgroundColor: black');
  });

  it('should render children', () => {
    render(
      <IconButton>
        <span data-testid="menu-icon">Test Value</span>
      </IconButton>
    );
    const children = screen.getByTestId('menu-icon');
    expect(children).toBeInTheDocument();
  });
});
