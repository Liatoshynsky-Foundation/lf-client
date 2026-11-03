import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ArchiveHeader from './ArchiveHeader';
import { TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: () => null
}));

describe('ArchiveHeader', () => {
  const mockOnSearch = jest.fn();

  afterEach(() => {
    mockOnSearch.mockClear();
  });

  it('should renders without crashing', () => {
    render(<ArchiveHeader description={null} onSearch={mockOnSearch} />);

    expect(screen.getByTestId('ArchiveHeader')).toBeInTheDocument();
  });

  it('should renders title', () => {
    render(<ArchiveHeader description={null} onSearch={mockOnSearch} />);

    expect(screen.getByRole('heading', { name: 'title' })).toBeInTheDocument();
  });

  it('should renders string description', () => {
    render(<ArchiveHeader description="Archive description" onSearch={mockOnSearch} />);

    expect(screen.getByText('Archive description')).toBeInTheDocument();
  });

  it('should omit the description when it is empty', () => {
    render(<ArchiveHeader description="" onSearch={mockOnSearch} />);

    expect(screen.queryByTestId('ArchiveHeader-description')).not.toBeInTheDocument();
  });

  it('should render a TipTap description with multiple paragraphs', () => {
    const description = {
      type: 'doc' as const,
      content: [
        { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
        { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] }
      ]
    } as TipTapDoc;

    render(<ArchiveHeader description={description} onSearch={mockOnSearch} />);

    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
  });

  it('should omit a TipTap description with no text', () => {
    const description = {
      type: 'doc',
      content: [{ type: 'paragraph' }]
    } as TipTapDoc;

    render(<ArchiveHeader description={description} onSearch={mockOnSearch} />);

    expect(screen.queryByTestId('ArchiveHeader-description')).not.toBeInTheDocument();
  });

  it('should renders search input', () => {
    render(<ArchiveHeader description={null} onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();
  });

  it('should calls onSearch when user types in search input', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader description={null} onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');

    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it('should updates search input value when user types', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader description={null} onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'fund');

    expect(searchInput).toHaveValue('fund');
  });

  it('should clears search input', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader description={null} onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');

    await user.clear(searchInput);
    expect(searchInput).toHaveValue('');
  });

  it('should calls onSearch with empty string when input is cleared', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader description={null} onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');

    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );

    mockOnSearch.mockClear();
    await user.clear(searchInput);

    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalledWith('');
      },
      { timeout: 1000 }
    );
  });
});
