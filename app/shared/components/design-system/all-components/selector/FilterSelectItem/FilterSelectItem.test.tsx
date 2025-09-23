import { fireEvent, render, screen } from '@testing-library/react';

import FilterSelectItem from './FilterSelectItem';

const label = 'Test Label';
const handleClick = jest.fn();

describe('FilterSelectItem', () => {
  it('should render the label', () => {
    render(<FilterSelectItem label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render the checkbox', () => {
    render(<FilterSelectItem label={label} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should call onClick when the Box is clicked', () => {
    render(<FilterSelectItem label={label} onClick={handleClick} />);
    fireEvent.click(screen.getByText(label));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should call onClick when the checkbox is clicked', () => {
    render(<FilterSelectItem label={label} onClick={handleClick} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('should render the checkbox as checked when selected is true', () => {
    render(<FilterSelectItem label={label} selected />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should render the checkbox as disabled when disabled is true', () => {
    render(<FilterSelectItem label={label} disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
