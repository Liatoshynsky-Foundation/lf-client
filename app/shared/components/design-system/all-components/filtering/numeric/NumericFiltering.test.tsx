import { fireEvent, render, screen } from '@testing-library/react';

import NumericFiltering from './NumericFiltering';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    const translations: Record<string, string> = {
      'numeric.from': 'From',
      'numeric.to': 'To',
      clear: 'Clear filter',
      'errors.minLength': `The 'From' value cannot be less than ${params?.min}`,
      'errors.maxLength': `The 'To' value cannot be greater than ${params?.max}`,
      'errors.minDistance': 'The "To" value cannot be less than the "From" value',
      'errors.onlyNumbers': 'Only numeric values are allowed'
    };

    return translations[key] || key;
  }
}));

jest.mock('~/ds-components/button/Button', () => ({
  __esModule: true,
  default: ({ children, onClick, ariaLabel }: any) => (
    <button onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}));

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="trash-icon" />
}));

const minNumber = 1930;
const maxNumber = 2020;
const value: [number, number] = [1940, 2000];
const onChange = jest.fn();
const onChangeCommitted = jest.fn();

describe('NumericFiltering', () => {
  beforeEach(() => {
    render(
      <NumericFiltering
        minNumber={minNumber}
        maxNumber={maxNumber}
        value={value}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
    );
    onChange.mockClear();
    onChangeCommitted.mockClear();
  });

  it('should render inputs and slider with correct default values', () => {
    expect(screen.getByLabelText(/from/i)).toHaveValue(String(value[0]));
    expect(screen.getByLabelText(/to/i)).toHaveValue(String(value[1]));
  });

  it('should render both number input fields and clear button', () => {
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /clear filter/i })).toBeInTheDocument();
  });

  it('should update values when typing in inputs', () => {
    const fromInput = screen.getByLabelText(/from/i) as HTMLInputElement;
    const toInput = screen.getByLabelText(/to/i) as HTMLInputElement;

    fireEvent.change(fromInput, { target: { value: '1950' } });
    fireEvent.change(toInput, { target: { value: '2010' } });

    expect(fromInput.value).toBe('1950');
    expect(toInput.value).toBe('2010');
  });

  it('should clear fields and errors when clicking clear filter', () => {
    const fromInput = screen.getByLabelText(/from/i);
    const clearButton = screen.getByRole('button', { name: /Clear filter/i });

    fireEvent.change(fromInput, { target: { value: '1800' } });
    fireEvent.click(clearButton);

    expect(fromInput).toHaveValue(String(minNumber));
  });

  describe('Slider Interactions', () => {
    it('should handle slider change for min thumb (covers line 50)', () => {
      const sliders = screen.getAllByRole('slider', { hidden: true });
      fireEvent.change(sliders[0], { target: { value: '1960' } });
      expect(screen.getByLabelText(/from/i)).toHaveValue('1960');
    });

    it('should handle slider change for max thumb (covers line 52)', () => {
      const sliders = screen.getAllByRole('slider', { hidden: true });
      fireEvent.change(sliders[1], { target: { value: '2010' } });
      expect(screen.getByLabelText(/to/i)).toHaveValue('2010');
    });

    it('should handle slider change committed (covers lines 62-65)', () => {
      const sliders = screen.getAllByRole('slider', { hidden: true });
      fireEvent.change(sliders[0], { target: { value: '1970' } });
      fireEvent.mouseUp(sliders[0]);

      expect(onChangeCommitted).toHaveBeenCalled();
    });

    it('should handle early return in slider handlers if not array', () => {
      const sliders = screen.getAllByRole('slider', { hidden: true });
      const fromInput = screen.getByLabelText(/from/i);
      const initialValue = fromInput.getAttribute('value');

      fireEvent.change(sliders[0], { target: { value: undefined } });

      expect(fromInput).toHaveValue(initialValue);
      expect(onChangeCommitted).not.toHaveBeenCalled();
    });
  });
});
