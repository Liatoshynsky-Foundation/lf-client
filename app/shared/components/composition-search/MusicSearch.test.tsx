import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { MusicSearch } from './MusicSearch';

jest.mock('next-intl', () => ({
  useTranslations: () => {
    const translations: Record<string, string> = {
      notFound: 'Not found',
      loading: 'Loading...'
    };

    return (key: string) => translations[key] || key;
  }
}));
jest.mock('./LazyListItem', () => ({
  VirtualizedListbox: ({ children }: any) => <ul>{children}</ul>
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ _id: '1', title: 'Test Song' }])
  })
) as jest.Mock;
describe('MusicSearch', () => {
  it('renders the input and fetches options', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);

    const input = screen.getByRole('combobox');
    expect(input).toBeInTheDocument();

    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeInTheDocument();
    });
  });

  it('calls setSearch on input change', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);

    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Bohemian' } });

    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith('Bohemian');
    });
  });

  it('displays no options text when no results', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve([])
    });

    render(<MusicSearch search="xyz" setSearch={jest.fn()} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('displays loading text', async () => {
    render(<MusicSearch search="" setSearch={jest.fn()} />);

    const input = screen.getByRole('combobox');
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  it('should find clear button and clean the input after a click', async () => {
    render(<MusicSearch search="" setSearch={jest.fn()} />);
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    const clearButton = screen.getByAltText('close');
    fireEvent.click(clearButton);
    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });
  it('should focus input when search icon is clicked', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);

    const input = screen.getByRole('combobox');
    const searchIcon = screen.getByAltText('search');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
  it('should focus input when search icon is clicked even if not focused', async () => {
    const setSearch = jest.fn();

    render(<MusicSearch search="" setSearch={setSearch} />);
    const input = screen.getByRole('combobox');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    const searchIcon = screen.getByAltText('search');
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});
