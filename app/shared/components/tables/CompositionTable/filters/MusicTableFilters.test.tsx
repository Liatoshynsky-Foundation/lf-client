import { fireEvent, render, screen } from '@testing-library/react';

import { MusicTableFilters } from './MusicTableFilters';

jest.mock('@mui/material', () => ({
  Box: jest.fn(({ children, ...props }) => (
    <div data-testid="mui-box" {...props}>
      {children}
    </div>
  )),
  useMediaQuery: jest.fn(() => false)
}));

jest.mock('~/ds-components/icon-button/IconButton', () => ({
  IconButton: jest.fn(({ children, ...props }) => (
    <button data-testid="icon-btn" {...props}>
      {children}
    </button>
  ))
}));

jest.mock('~/ds-components/selector/FilterSelect', () => ({
  FilterSelect: jest.fn(
    ({
      label,
      options,
      defaultValues,
      onAdd,
      onRemove
    }: {
      label: string;
      options: { value: string; label: string }[];
      defaultValues: string[];
      onAdd: (val: string, lab: string, allSelected: string[]) => void;
      onRemove: (val: string, lab: string, allSelected: string[]) => void;
    }) => (
      <div data-testid={`filter-select-${label}`}>
        <button onClick={() => onAdd('val', 'lab', ['a', 'b'])}>add</button>
        <button onClick={() => onRemove('val', 'lab', ['c'])}>remove</button>
        {label}
        {options.map((o) => (
          <span key={o.value}>{o.label}</span>
        ))}
        <span>{defaultValues.join(',')}</span>
      </div>
    )
  )
}));

jest.mock('~/shared/components/tables/WorksTable/filters/YearNumericFilter', () => ({
  YearNumericFilter: jest.fn(({ label, value, onChange, onChangeCommitted, minYear, maxYear }) => (
    <div data-testid="year-numeric-filter">
      <button onClick={() => onChange([1900, 2000])}>change</button>
      <button onClick={() => onChangeCommitted([1901, 2001])}>commit</button>
      <span>{label}</span>
      <span>
        {value[0]}-{value[1]}
      </span>
      <span>
        {minYear}-{maxYear}
      </span>
    </div>
  ))
}));

jest.mock('./MusicTableFilters.styles', () => ({
  filterGridHelper: jest.fn(() => ({
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto',
    containers: {
      category: { gridArea: 'cat' },
      genre: { gridArea: 'gen' },
      year: { gridArea: 'year' },
      clear: { gridArea: 'clear' }
    }
  }))
}));

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="delete-icon" />
}));

const genresOptions = [
  { key: 'g1', name: 'Genre1' },
  { key: 'g2', name: 'Genre2' }
];

const categoriesOptions = [
  { key: 'c1', name: 'Cat1' },
  { key: 'c2', name: 'Cat2' }
];

describe('MusicTableFilters', () => {
  const onGenresChange = jest.fn();
  const onCategoriesChange = jest.fn();
  const onYearChange = jest.fn();
  const onYearChangeCommitted = jest.fn();
  const onClearAllFilters = jest.fn();

  const baseProps = {
    labelGenre: 'Genre',
    labelCategory: 'Category',
    genresOptions,
    categoriesOptions,
    genreFilter: ['g1'],
    categoryFilter: ['c2'],
    yearLabel: 'Year',
    yearFilter: [1900, 2000] as [number, number],
    onGenresChange,
    onCategoriesChange,
    onYearChange,
    onYearChangeCommitted,
    onClearAllFilters,
    isAnyFilterActive: true,
    minYear: 1800,
    maxYear: 2020
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all filter components and the clear button', () => {
    render(<MusicTableFilters {...baseProps} />);
    expect(screen.getByTestId('filter-select-Category')).toBeInTheDocument();
    expect(screen.getByTestId('filter-select-Genre')).toBeInTheDocument();
    expect(screen.getByTestId('year-numeric-filter')).toBeInTheDocument();
    expect(screen.getByTestId('icon-btn')).toBeInTheDocument();
    expect(screen.getByTestId('delete-icon')).toBeInTheDocument();
  });

  it('should trigger onCategoriesChange and onGenresChange on FilterSelect actions', () => {
    render(<MusicTableFilters {...baseProps} />);

    fireEvent.click(screen.getByTestId('filter-select-Category').querySelectorAll('button')[0]);
    expect(onCategoriesChange).toHaveBeenCalledWith(['a', 'b']);

    fireEvent.click(screen.getByTestId('filter-select-Genre').querySelectorAll('button')[0]);
    expect(onGenresChange).toHaveBeenCalledWith(['a', 'b']);

    fireEvent.click(screen.getByTestId('filter-select-Category').querySelectorAll('button')[1]);
    expect(onCategoriesChange).toHaveBeenCalledWith(['c']);

    fireEvent.click(screen.getByTestId('filter-select-Genre').querySelectorAll('button')[1]);
    expect(onGenresChange).toHaveBeenCalledWith(['c']);
  });

  it('should trigger onYearChange and onYearChangeCommitted from YearNumericFilter interactions', () => {
    render(<MusicTableFilters {...baseProps} />);

    const yearFilter = screen.getByTestId('year-numeric-filter');

    fireEvent.click(yearFilter.querySelectorAll('button')[0]);
    expect(onYearChange).toHaveBeenCalledWith([1900, 2000]);

    fireEvent.click(yearFilter.querySelectorAll('button')[1]);
    expect(onYearChangeCommitted).toHaveBeenCalledWith([1901, 2001]);
  });

  it('should only show the clear button if a handler is provided and a filter is active', () => {
    const { rerender } = render(<MusicTableFilters {...baseProps} />);
    expect(screen.getByTestId('icon-btn')).toBeInTheDocument();

    rerender(<MusicTableFilters {...baseProps} isAnyFilterActive={false} />);
    expect(screen.queryByTestId('icon-btn')).not.toBeInTheDocument();

    rerender(<MusicTableFilters {...baseProps} onClearAllFilters={undefined} isAnyFilterActive={true} />);
    expect(screen.queryByTestId('icon-btn')).not.toBeInTheDocument();
  });

  it('should call onClearAllFilters when the clear button is clicked', () => {
    render(<MusicTableFilters {...baseProps} />);
    fireEvent.click(screen.getByTestId('icon-btn'));
    expect(onClearAllFilters).toHaveBeenCalled();
  });

  it('should pass the minYear and maxYear props to the YearNumericFilter', () => {
    render(<MusicTableFilters {...baseProps} minYear={1800} maxYear={2020} />);
    expect(screen.getByText('1800-2020')).toBeInTheDocument();
  });

  it('should use the default "Year" label when the yearLabel prop is not provided', () => {
    const { yearLabel: _yearLabel, ...propsWithoutYearLabel } = baseProps;
    render(<MusicTableFilters {...propsWithoutYearLabel} yearLabel={undefined as any} />);

    expect(screen.getByTestId('year-numeric-filter')).toHaveTextContent('Year');
  });

  it('should pass the correct labels and options to the FilterSelect components', () => {
    render(<MusicTableFilters {...baseProps} />);

    expect(screen.getByTestId('filter-select-Category')).toHaveTextContent('Category');

    expect(screen.getByTestId('filter-select-Category')).toHaveTextContent('Cat1');

    expect(screen.getByTestId('filter-select-Category')).toHaveTextContent('Cat2');

    expect(screen.getByTestId('filter-select-Genre')).toHaveTextContent('Genre');

    expect(screen.getByTestId('filter-select-Genre')).toHaveTextContent('Genre1');

    expect(screen.getByTestId('filter-select-Genre')).toHaveTextContent('Genre2');
  });
});
