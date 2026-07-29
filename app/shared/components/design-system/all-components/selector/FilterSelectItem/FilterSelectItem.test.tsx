import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import FilterSelectItem from './FilterSelectItem';

const TEST_LABEL = 'Test Label';
const KEY_ENTER = 'Enter';
const KEY_SPACE = ' ';
const KEY_TAB = 'Tab';

jest.mock('./FilterSelectItem.styles', () => ({
  styles: {
    container: {}
  }
}));

describe('FilterSelectItem', () => {
  it('should render the label', () => {
    render(<FilterSelectItem label={TEST_LABEL} />);
    expect(screen.getByText(TEST_LABEL)).toBeInTheDocument();
  });

  it('should render the checkbox', () => {
    render(<FilterSelectItem label={TEST_LABEL} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should call onClick when the Box is clicked', async () => {
    const handleClick = jest.fn();
    render(<FilterSelectItem label={TEST_LABEL} onClick={handleClick} />);
    await userEvent.click(screen.getByRole('option'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled and clicked', async () => {
    const handleClick = jest.fn();
    render(<FilterSelectItem label={TEST_LABEL} disabled onClick={handleClick} />);
    await userEvent.click(screen.getByRole('option'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should call onClick when pressing Enter or Space key', () => {
    const handleClick = jest.fn();
    render(<FilterSelectItem label={TEST_LABEL} onClick={handleClick} />);
    const option = screen.getByRole('option');

    fireEvent.keyDown(option, { key: KEY_ENTER });
    expect(handleClick).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(option, { key: KEY_SPACE });
    expect(handleClick).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(option, { key: KEY_TAB });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('should not call onClick on key down when disabled', () => {
    const handleClick = jest.fn();
    render(<FilterSelectItem label={TEST_LABEL} disabled onClick={handleClick} />);
    const option = screen.getByRole('option');

    fireEvent.keyDown(option, { key: KEY_ENTER });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render the checkbox as checked when selected is true', () => {
    render(<FilterSelectItem label={TEST_LABEL} selected />);
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
  });

  it('should render the checkbox as disabled when disabled is true', () => {
    render(<FilterSelectItem label={TEST_LABEL} disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
    expect(screen.getByRole('option')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('option')).toHaveAttribute('tabIndex', '-1');
  });

  it('should forward ref correctly', () => {
    const ref = createRef<HTMLDivElement>();
    render(<FilterSelectItem ref={ref} label={TEST_LABEL} />);
    expect(ref.current).toBe(screen.getByRole('option'));
  });

  it('should apply custom sx prop and proper cursor style', () => {
    const customSx = { backgroundColor: 'red' };
    const { rerender } = render(<FilterSelectItem label={TEST_LABEL} sx={customSx} />);
    const option = screen.getByRole('option');
    expect(option).toHaveStyle({ cursor: 'pointer' });

    rerender(<FilterSelectItem label={TEST_LABEL} disabled sx={customSx} />);
    expect(option).toHaveStyle({ cursor: 'default' });
  });
});
