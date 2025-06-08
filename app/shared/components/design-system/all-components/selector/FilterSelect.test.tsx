import { fireEvent, render, screen } from '@testing-library/react';

import { FilterSelect } from './FilterSelect';

const mockOptions = [
  { value: '1', label: 'First' },
  { value: '2', label: 'Second' },
  { value: '3', label: 'Third' }
];

describe('FilterSelect', () => {
  it('should render the label', () => {
    render(<FilterSelect label="Test Label" options={mockOptions} />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('should open dropdown when clicked', () => {
    render(<FilterSelect label="Dropdown" options={mockOptions} />);
    fireEvent.click(screen.getByText('Dropdown'));
    mockOptions.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('should add selected option as chip', () => {
    render(<FilterSelect label="Select" options={mockOptions} />);
    fireEvent.click(screen.getByText('Select'));
    fireEvent.click(screen.getByText('First'));

    const allMatches = screen.getAllByText('First');
    expect(allMatches.length).toBeGreaterThanOrEqual(2);
  });

  it('should remove chip when delete icon is clicked', () => {
    render(<FilterSelect label="Remove Chip" options={mockOptions} defaultValues={['1']} />);
    const chip = screen.getByText('First');
    expect(chip).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });

  it('should call onAdd when item is selected', () => {
    const onAdd = jest.fn();
    render(<FilterSelect label="Select" options={mockOptions} onAdd={onAdd} />);
    fireEvent.click(screen.getByText('Select'));
    fireEvent.click(screen.getByText('Second'));
    expect(onAdd).toHaveBeenCalledWith('2', 'Second', ['2']);
  });

  it('should call onRemove when chip is deleted', () => {
    const onRemove = jest.fn();
    render(<FilterSelect label="Remove" options={mockOptions} defaultValues={['1']} onRemove={onRemove} />);
    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(onRemove).toHaveBeenCalledWith('1', 'First', []);
  });

  it('should disable selection if maxSelections is reached', () => {
    render(<FilterSelect label="Max" options={mockOptions} maxSelections={1} defaultValues={['1']} />);
    fireEvent.click(screen.getByText('Max'));
    const secondItem = screen.getByText('Second');
    expect(secondItem.closest('li')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should not open menu if disabled', () => {
    render(<FilterSelect label="Disabled" options={mockOptions} disabled />);
    fireEvent.click(screen.getByText('Disabled'));
    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });
});
