import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ArchiveHeader from './ArchiveHeader';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en'
}));

jest.mock('~/components/colored-svg/ColoredSvg', () => ({
  Svg: () => null
}));

describe('ArchiveHeader', () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false
    });
  });

  afterEach(() => {
    mockOnSearch.mockClear();
  });

  it('should renders without crashing', () => {
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    expect(screen.getByTestId('ArchiveHeader')).toBeInTheDocument();
  });

  it('should renders title', () => {
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    expect(screen.getByRole('heading', { name: 'title' })).toBeInTheDocument();
  });

  it('should render the CMS description', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        value: { blocks: { PageCaption: { description: 'CMS description' } } }
      })
    });

    render(<ArchiveHeader onSearch={mockOnSearch} />);

    expect(await screen.findByText('CMS description')).toBeInTheDocument();
  });

  it('should omit the description when the CMS value is empty', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, value: { blocks: { PageCaption: { description: '' } } } })
    });

    render(<ArchiveHeader onSearch={mockOnSearch} />);

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    expect(screen.queryByTestId('ArchiveHeader-description')).not.toBeInTheDocument();
  });

  it.each([
    ['returns a non-ok response', { ok: false }],
    ['returns an unsuccessful result', { ok: true, json: async () => ({ ok: false }) }]
  ])('should omit the description when the CMS request %s', async (_caseName, response) => {
    (globalThis.fetch as jest.Mock).mockResolvedValue(response);

    render(<ArchiveHeader onSearch={mockOnSearch} />);

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    expect(screen.queryByTestId('ArchiveHeader-description')).not.toBeInTheDocument();
  });

  it('should omit the description when the CMS request fails', async () => {
    (globalThis.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(<ArchiveHeader onSearch={mockOnSearch} />);

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    expect(screen.queryByTestId('ArchiveHeader-description')).not.toBeInTheDocument();
  });

  it('should omit a TipTap description with no text', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        value: { blocks: { PageCaption: { description: { type: 'doc', content: [{ type: 'paragraph' }] } } } }
      })
    });

    render(<ArchiveHeader onSearch={mockOnSearch} />);

    await waitFor(() => expect(globalThis.fetch).toHaveBeenCalled());
    expect(screen.queryByTestId('ArchiveHeader-description')).not.toBeInTheDocument();
  });

  it('should render a TipTap description with multiple paragraphs', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        value: {
          blocks: {
            PageCaption: {
              description: {
                type: 'doc',
                content: [
                  { type: 'paragraph', content: [{ type: 'text', text: 'First paragraph' }] },
                  { type: 'paragraph', content: [{ type: 'text', text: 'Second paragraph' }] }
                ]
              }
            }
          }
        }
      })
    });

    render(<ArchiveHeader onSearch={mockOnSearch} />);

    expect(await screen.findByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('Second paragraph')).toBeInTheDocument();
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

    await waitFor(
      () => {
        expect(mockOnSearch).toHaveBeenCalled();
      },
      { timeout: 1000 }
    );
  });

  it('should updates search input value when user types', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'fund');

    expect(searchInput).toHaveValue('fund');
  });

  it('should clears search input', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader onSearch={mockOnSearch} />);

    const searchInput = screen.getByRole('textbox');
    await user.type(searchInput, 'test');
    expect(searchInput).toHaveValue('test');

    await user.clear(searchInput);
    expect(searchInput).toHaveValue('');
  });

  it('should calls onSearch with empty string when input is cleared', async () => {
    const user = userEvent.setup();
    render(<ArchiveHeader onSearch={mockOnSearch} />);

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
