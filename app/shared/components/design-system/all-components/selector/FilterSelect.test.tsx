import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ComponentType } from 'react';

import { FilterSelect } from './FilterSelect';

const mockOptions = [
  { label: 'First', value: 'first' },
  { label: 'Second', value: 'second' },
  { label: 'Third', value: 'third' }
];

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      clear: 'clear',
      selected: 'обрано'
    };
    return translations[key];
  }
}));

jest.mock('~/public/icons/trash-2.svg', () => ({
  __esModule: true,
  default: () => <svg data-testid="trash-icon" />
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ Component, alt }: { Component: ComponentType; alt?: string }) => (
    <div data-testid="svg-wrapper">
      <Component />
      {alt}
    </div>
  )
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('FilterSelect', () => {
  it('should render the label', async () => {
    render(<FilterSelect label="Test Label" options={mockOptions} />);
    await waitFor(() => {
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });
  });

  it('should open dropdown when clicked', async () => {
    render(<FilterSelect label="Dropdown" options={mockOptions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Dropdown' }));

    await waitFor(() => {
      mockOptions.forEach(({ label }) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });
    });
  });

  it('should add selected option as chip', async () => {
    render(<FilterSelect label="Select" options={mockOptions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByText('First'));

    await waitFor(() => {
      expect(screen.getByText('1 обрано')).toBeInTheDocument();
    });
  });

  it('should remove chip when delete icon is clicked', async () => {
    render(<FilterSelect label="Select" options={mockOptions} defaultValues={['first']} />);

    await waitFor(() => {
      expect(screen.getByText('1 обрано')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('delete-icon'));

    await waitFor(() => {
      expect(screen.queryByText('1 обрано')).not.toBeInTheDocument();
    });
  });

  it('should call onAdd when item is selected', async () => {
    const onAdd = jest.fn();
    render(<FilterSelect label="Select" options={mockOptions} onAdd={onAdd} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByText('Second'));

    await waitFor(() => {
      expect(onAdd).toHaveBeenCalledWith('second', 'Second', ['second']);
    });
  });

  it('should call onRemove when chip is deleted', async () => {
    const onRemove = jest.fn();
    render(<FilterSelect label="Remove" options={mockOptions} defaultValues={['first']} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
    fireEvent.click(screen.getByText('First'));
    fireEvent.click(screen.getByTestId('trash-icon'));

    await waitFor(() => {
      expect(onRemove).toHaveBeenCalledWith('first', 'First', []);
    });
  });

  it('should clear all selections when clear button is clicked', async () => {
    const onRemove = jest.fn();
    render(<FilterSelect label="Select" options={mockOptions} defaultValues={['first']} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByText('clear'));

    await waitFor(() => {
      expect(screen.queryByText('1 обрано')).not.toBeInTheDocument();
      expect(onRemove).toHaveBeenCalledWith('', '', []);
    });
  });

  it('should update selected values when defaultValues prop changes', async () => {
    const { rerender } = render(<FilterSelect label="Select" options={mockOptions} defaultValues={['first']} />);

    await waitFor(() => {
      expect(screen.getByText('1 обрано')).toBeInTheDocument();
    });

    rerender(<FilterSelect label="Select" options={mockOptions} defaultValues={['first', 'second']} />);

    await waitFor(() => {
      expect(screen.getByText('2 обрано')).toBeInTheDocument();
    });
  });

  it('should not open menu if disabled', async () => {
    render(<FilterSelect label="Disabled" options={mockOptions} disabled />);
    const button = screen.getByRole('button', { name: 'Disabled' });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByText('First')).not.toBeInTheDocument();
    });
  });

  it('should close menu and call requestAnimationFrame when dropdown is closed', async () => {
    const rafSpy = jest.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    });

    render(<FilterSelect label="Select" options={mockOptions} />);

    fireEvent.click(screen.getByRole('button', { name: 'Select' }));

    const backdrop = document.querySelector('.MuiBackdrop-root') as HTMLElement;
    fireEvent.click(backdrop);

    await waitFor(() => {
      expect(rafSpy).toHaveBeenCalled();
    });

    rafSpy.mockRestore();
  });

  it('should not select new option when maxSelections is reached to cover', async () => {
    const onAdd = jest.fn();
    render(
      <FilterSelect label="Select" options={mockOptions} defaultValues={['first']} maxSelections={1} onAdd={onAdd} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.click(screen.getByText('Second'));

    await waitFor(() => {
      expect(onAdd).not.toHaveBeenCalled();
    });
  });

  it('should stop propagation when chip itself is clicked to cover', async () => {
    render(<FilterSelect label="Select" options={mockOptions} defaultValues={['first']} />);

    fireEvent.click(screen.getByText('1 обрано'));

    await waitFor(() => {
      expect(screen.getByText('1 обрано')).toBeInTheDocument();
    });
  });

  it('should close menu when trigger is clicked while menu is open to cover', async () => {
    render(<FilterSelect label="Select" options={mockOptions} />);
    const triggerButton = screen.getByRole('button', { name: 'Select' });

    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByText('First')).toBeInTheDocument();
    });

    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.queryByText('First')).not.toBeInTheDocument();
    });
  });
});
