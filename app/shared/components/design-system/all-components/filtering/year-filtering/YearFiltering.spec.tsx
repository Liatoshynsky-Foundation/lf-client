import { fireEvent, render, screen } from '@testing-library/react';

import YearFiltering from './YearFiltering';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    const translations: Record<string, string> = {
      'year.from': 'Від',
      'year.to': 'До',
      'year.clearFilter': 'Очистити фільтр',
      'errors.minLength': `Рік не може бути раніше ніж ${params?.min}`,
      'errors.maxLength': `Рік не може бути пізніше ніж ${params?.max}`,
      'errors.minDistance': 'Рік «До» не може бути раніше за рік «Від»'
    };

    return translations[key] || key;
  }
}));

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="trash-icon" />
}));

const minYear = 1930;
const maxYear = 2020;

describe('YearFiltering', () => {
  beforeEach(() => {
    render(<YearFiltering minYear={minYear} maxYear={maxYear} />);
  });
  it('should renders both year input fields and clear button', () => {
    expect(screen.getByLabelText(/від/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/до/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /очистити фільтр/i })).toBeInTheDocument();
  });

  it('should updates values when typing in inputs', () => {
    const fromInput = screen.getByLabelText(/від/i) as HTMLInputElement;
    const toInput = screen.getByLabelText(/до/i) as HTMLInputElement;

    fireEvent.change(fromInput, { target: { value: '1950' } });
    fireEvent.change(toInput, { target: { value: '2000' } });

    expect(fromInput.value).toBe('1950');
    expect(toInput.value).toBe('2000');
  });

  it('should updates state correctly when min and max sliders change', () => {
    render(<YearFiltering minYear={minYear} maxYear={maxYear} />);

    const sliders = screen.getAllByRole('slider');

    fireEvent.change(sliders[0], {
      target: { value: String(minYear + 5) }
    });

    fireEvent.change(sliders[1], {
      target: { value: String(maxYear - 5) }
    });

    const fromInput = screen.getByLabelText('Від') as HTMLInputElement;
    expect(fromInput.value).toBe(String(minYear + 5));

    const toInput = screen.getByLabelText('До') as HTMLInputElement;
    expect(toInput.value).toBe(String(maxYear - 5));
  });

  it('should clears fields and errors when clicking clear filter', () => {
    const fromInput = screen.getByLabelText(/від/i);
    const clearButton = screen.getByRole('button', { name: /очистити фільтр/i });

    fireEvent.change(fromInput, { target: { value: '1800' } });
    fireEvent.click(clearButton);

    expect(fromInput).toHaveValue('1930');
    expect(screen.queryByText(/Рік не може бути раніше ніж/i)).not.toBeInTheDocument();
  });
});
