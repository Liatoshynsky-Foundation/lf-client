import { render, screen, fireEvent } from '@testing-library/react';
import CustomMenuItem from './MenuItem';

describe('CustomMenuItem', () => {
  it('should render children correctly', () => {
    render(<CustomMenuItem>Test Item</CustomMenuItem>);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });

  it('should show check icon when selected', () => {
    render(<CustomMenuItem selected>Selected Item</CustomMenuItem>);
    const checkIcon = screen.getByAltText('Item selected');
    expect(checkIcon).toBeInTheDocument();
    expect(checkIcon).toHaveAttribute('src', '/icons/check-icon.svg');
  });

  it('should not show check icon when not selected', () => {
    render(<CustomMenuItem>Not Selected</CustomMenuItem>);
    const checkIcon = screen.queryByAltText('check');
    expect(checkIcon).not.toBeInTheDocument();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<CustomMenuItem onClick={handleClick}>Clickable Item</CustomMenuItem>);
    fireEvent.click(screen.getByText('Clickable Item'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
