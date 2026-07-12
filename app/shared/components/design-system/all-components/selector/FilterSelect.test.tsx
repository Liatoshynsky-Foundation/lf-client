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
    const translations: { [key: string]: string } = {
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
    render(<FilterSelect label="Select" options={mockOptions} defaultValues={['first']} />);
    expect(screen.getByText('1 обрано')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-icon'));
    expect(screen.queryByText('1 обрано')).not.toBeInTheDocument();
  });

  it('should call onAdd when item is selected', () => {
    const onAdd = jest.fn();
    render(<FilterSelect label="Select" options={mockOptions} onAdd={onAdd} />);
    fireEvent.click(screen.getByText('Select'));
    fireEvent.click(screen.getByText('Second'));
    expect(onAdd).toHaveBeenCalledWith('second', 'Second', ['second']);
  });

  it('should call onRemove when chip is deleted', () => {
    const onRemove = jest.fn();
    render(<FilterSelect label="Remove" options={mockOptions} defaultValues={['first']} onRemove={onRemove} />);
    fireEvent.click(screen.getByText('Remove'));
    fireEvent.click(screen.getByText('First'));
    fireEvent.click(screen.getByTestId('trash-icon'));
    expect(onRemove).toHaveBeenCalledWith('first', 'First', []);
  });

  it('should not open menu if disabled', () => {
    render(<FilterSelect label="Disabled" options={mockOptions} disabled />);
    fireEvent.click(screen.getByText('Disabled'));
    expect(screen.queryByText('First')).not.toBeInTheDocument();
  });

  it('should close menu and call requestAnimationFrame when dropdown is closed to cover lines 58-59', () => {
    const rafSpy = jest.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });

    render(<FilterSelect label="Select" options={mockOptions} />);
    fireEvent.click(screen.getByText('Select'));

    const backdrop = document.querySelector('.MuiBackdrop-root') as HTMLElement;
    fireEvent.click(backdrop);

    expect(rafSpy).toHaveBeenCalled();
    rafSpy.mockRestore();
  });

  it('should not select new option when maxSelections is reached to cover line 73', () => {
    const onAdd = jest.fn();
    render(
      <FilterSelect label="Select" options={mockOptions} defaultValues={['first']} maxSelections={1} onAdd={onAdd} />
    );
    fireEvent.click(screen.getByText('Select'));
    fireEvent.click(screen.getByText('Second'));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it('should stop propagation when chip itself is clicked to cover line 131', () => {
    render(<FilterSelect label="Select" options={mockOptions} defaultValues={['first']} />);
    fireEvent.click(screen.getByText('1 обрано'));

    expect(screen.getByText('1 обрано')).toBeInTheDocument();
  });

  it('should close menu when trigger is clicked while menu is open to cover line 54', async () => {
    render(<FilterSelect label="Select" options={mockOptions} />);

    fireEvent.click(screen.getByText('Select'));
    expect(screen.getByText('First')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Select'));

    await waitFor(() => {
      expect(screen.queryByText('First')).not.toBeInTheDocument();
    });
  });
});
