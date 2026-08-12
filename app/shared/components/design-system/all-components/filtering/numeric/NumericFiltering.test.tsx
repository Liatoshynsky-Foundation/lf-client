import { act, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

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
  default: ({
    children,
    onClick,
    ariaLabel
  }: {
    children: React.ReactNode;
    onClick: () => void;
    ariaLabel?: string;
  }) => (
    <button onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  )
}));

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="trash-icon" />
}));

interface MockSliderProps {
  onChange: (event: Event, newValue: number | number[], activeThumb: number) => void;
  onChangeCommitted: (event: Event | React.SyntheticEvent, newValue: number | number[]) => void;
}

let capturedSliderProps: MockSliderProps | null = null;

jest.mock('~/ds-components/slider/Slider', () => ({
  DesignSystemSlider: (props: MockSliderProps) => {
    capturedSliderProps = props;
    return <div data-testid="mock-slider" />;
  }
}));

const minNumber = 1930;
const maxNumber = 2020;
const value: [number, number] = [1940, 2000];
const onChange = jest.fn();
const onChangeCommitted = jest.fn();

describe('NumericFiltering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    capturedSliderProps = null;
    render(
      <NumericFiltering
        minNumber={minNumber}
        maxNumber={maxNumber}
        value={value}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render inputs and slider with correct default values', () => {
    expect(screen.getByLabelText(/from/i)).toHaveValue('1940');
    expect(screen.getByLabelText(/to/i)).toHaveValue('2000');
    expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
  });

  it('should update values when typing valid inputs', () => {
    const fromInput = screen.getByLabelText(/from/i) as HTMLInputElement;
    act(() => {
      fireEvent.change(fromInput, { target: { value: '1950' } });
      jest.advanceTimersByTime(400);
    });
    expect(fromInput.value).toBe('1950');
    expect(onChange).toHaveBeenCalledWith([1950, 2000]);
  });

  it('should trigger errors block when input is invalid to cover branch line 62', () => {
    const fromInput = screen.getByLabelText(/from/i) as HTMLInputElement;
    const toInput = screen.getByLabelText(/to/i) as HTMLInputElement;

    act(() => {
      fireEvent.change(fromInput, { target: { value: 'not-a-number' } });
      jest.advanceTimersByTime(400);
    });
    expect(fromInput.value).toBe('not-a-number');
    expect(onChange).not.toHaveBeenLastCalledWith([expect.any(Number), expect.any(Number)]);

    act(() => {
      fireEvent.change(toInput, { target: { value: 'xyz' } });
      jest.advanceTimersByTime(400);
    });
    expect(toInput.value).toBe('xyz');
  });

  it('should clear fields and errors when clicking clear filter', () => {
    const fromInput = screen.getByLabelText(/from/i);
    const clearButton = screen.getByRole('button', { name: /Clear filter/i });

    act(() => {
      fireEvent.change(fromInput, { target: { value: '1800' } });
      jest.advanceTimersByTime(400);
    });
    act(() => {
      fireEvent.click(clearButton);
    });

    expect(fromInput).toHaveValue(String(minNumber));
    expect(onChangeCommitted).toHaveBeenCalledWith([1930, 2020]);
  });

  describe('Slider Interactions', () => {
    it('should ignore slider change if newValue is not an array', () => {
      expect(capturedSliderProps).not.toBeNull();
      act(() => {
        capturedSliderProps!.onChange({} as Event, 1950 as unknown as number[], 0);
      });
      expect(screen.getByLabelText(/from/i)).toHaveValue('1940');
    });

    it('should handle min thumb change', () => {
      expect(capturedSliderProps).not.toBeNull();
      act(() => {
        capturedSliderProps!.onChange({} as Event, [1960, 2000], 0);
        jest.advanceTimersByTime(400);
      });
      expect(screen.getByLabelText(/from/i)).toHaveValue('1960');
    });

    it('should handle min thumb bounded by max distance', () => {
      expect(capturedSliderProps).not.toBeNull();
      act(() => {
        capturedSliderProps!.onChange({} as Event, [2010, 2000], 0);
        jest.advanceTimersByTime(400);
      });
      expect(screen.getByLabelText(/from/i)).toHaveValue('1999');
    });

    it('should handle max thumb change', () => {
      expect(capturedSliderProps).not.toBeNull();
      act(() => {
        capturedSliderProps!.onChange({} as Event, [1940, 2010], 1);
        jest.advanceTimersByTime(400);
      });
      expect(screen.getByLabelText(/to/i)).toHaveValue('2010');
    });

    it('should handle max thumb bounded by min distance', () => {
      expect(capturedSliderProps).not.toBeNull();
      act(() => {
        capturedSliderProps!.onChange({} as Event, [1940, 1920], 1);
        jest.advanceTimersByTime(400);
      });
      expect(screen.getByLabelText(/to/i)).toHaveValue('1941');
    });

    it('should ignore slider change committed if newValue is not an array', () => {
      expect(capturedSliderProps).not.toBeNull();
      act(() => {
        capturedSliderProps!.onChangeCommitted({} as Event, 1950 as unknown as number[]);
      });
      expect(onChangeCommitted).not.toHaveBeenCalled();
    });

    it('should handle slider change committed successfully', () => {
      expect(capturedSliderProps).not.toBeNull();
      act(() => {
        capturedSliderProps!.onChangeCommitted({} as Event, [1950, 2010]);
      });
      expect(onChangeCommitted).toHaveBeenCalledWith([1950, 2010]);
    });

    it('should use default values for minNumber and maxNumber when they are not provided to cover lines 28-29', () => {
      import('@testing-library/react').then(({ cleanup }) => {
        cleanup();
        act(() => {
          render(<NumericFiltering value={[1910, 2020]} onChange={onChange} onChangeCommitted={onChangeCommitted} />);
        });
        expect(screen.getByLabelText(/from/i)).toHaveValue('1910');
      });
    });
  });
});
