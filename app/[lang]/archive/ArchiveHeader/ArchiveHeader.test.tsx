import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ArchiveHeader from './ArchiveHeader';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: () => null
}));

describe('ArchiveHeader', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  it('should renders without crashing', () => {
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    expect(screen.getByTestId('ArchiveHeader')).toBeInTheDocument();
  });

  it('should renders title', () => {
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    expect(screen.getByTestId('ArchiveHeader-title')).toBeInTheDocument();
  });

  it('should renders description', () => {
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    expect(screen.getByTestId('ArchiveHeader-description')).toBeInTheDocument();
  });

  it('should renders search input', () => {
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('should calls onSearch when user types in search input', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('should updates search input value when user types', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(searchInput, 'fund');

    expect(searchInput.value).toBe('fund');
  });

  it('should clears search input', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox') as HTMLInputElement;
    await user.type(searchInput, 'test');
    expect(searchInput.value).toBe('test');

    await user.clear(searchInput);
    expect(searchInput.value).toBe('');
  });

  it('should calls onSearch with empty string when input is cleared', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');
    await user.clear(searchInput);

    expect(mockOnSearch).toHaveBeenCalledWith('');
  });
});
