import { fireEvent, render, screen } from '@testing-library/react';
import { ComponentType } from 'react';

import { FilterSelect } from './FilterSelect';
import { FilterSelectItemProps } from './FilterSelectItem/FilterSelectItem';

jest.mock('~/ds-components/selector/FilterSelectItem/FilterSelectItem', () => {
  const Mock = ({ label, onClick, selected, disabled }: FilterSelectItemProps) => (
    <div onClick={onClick} data-testid={'checkbox-' + label} aria-disabled={disabled}>
      <input type="checkbox" checked={selected} readOnly />
      {label}
    </div>
  );
  Mock.displayName = 'FilterSelectItem';
  return Mock;
});

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="clear-icon" />
}));

jest.mock('next-intl', () => ({
  useTranslations: (module: string) => (key: string) => module + '.' + key
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, alt }: { Component: ComponentType; alt?: string }) => (
    <div data-testid="svg-wrapper">
      <Component />
      {alt}
    </div>
  )
}));

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

    expect(screen.getByText('1 обрано')).toBeInTheDocument();
  });

  it('should remove chip when delete icon is clicked', () => {
    render(<FilterSelect label="Select" options={mockOptions} defaultValues={['1']} />);
    expect(screen.getByText('1 обрано')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(screen.queryByText('1 обрано')).not.toBeInTheDocument();
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
    expect(onRemove).toHaveBeenCalledWith('', '', []);
  });

  it('should disable selection if maxSelections is reached', () => {
    render(<FilterSelect label="Max" options={mockOptions} maxSelections={1} defaultValues={['1']} />);
    fireEvent.click(screen.getByText('Max'));
    const secondItem = screen.getByTestId('checkbox-Second');

    expect(secondItem).toHaveAttribute('aria-disabled', 'true');
  });

  it('should not open menu if disabled', () => {
    render(<FilterSelect label="Disabled" options={mockOptions} disabled />);
    fireEvent.click(screen.getByText('Disabled'));
    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });
});
