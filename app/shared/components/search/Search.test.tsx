import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { Search } from './Search';

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

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

describe('Search', () => {
  const options = [
    { _id: '1', title: 'Test Song' },
    { _id: '2', title: 'Another Song' }
  ];
  const getOptionLabel = (option: { title: string }) => option.title;

  it('should render the input and fetches options', async () => {
    const setSearch = jest.fn();

    render(
      <Search<{ _id: string; title: string }>
        search=""
        setSearch={setSearch}
        options={options}
        getOptionLabel={getOptionLabel}
      />
    );

    const input = screen.getByRole('combobox');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    input.focus();
    fireEvent.change(input, { target: { value: 'T' } });

    await waitFor(() => {
      expect(screen.getByText('Test Song')).toBeInTheDocument();
    });
  });

  it('should call setSearch on input change', async () => {
    const setSearch = jest.fn();

    render(
      <Search<{ _id: string; title: string }>
        search=""
        setSearch={setSearch}
        options={options}
        getOptionLabel={getOptionLabel}
      />
    );

    const input = screen.getByRole('combobox');
    input.focus();
    fireEvent.change(input, { target: { value: 'Bohemian' } });

    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith('Bohemian');
    });
  });

  it('should display no options text when no results', async () => {
    render(
      <Search<{ _id: string; title: string }>
        search="xyz"
        setSearch={jest.fn()}
        options={[]}
        getOptionLabel={getOptionLabel}
      />
    );

    const input = screen.getByRole('combobox');
    input.focus();
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('should focus input when search icon is clicked', async () => {
    const setSearch = jest.fn();

    render(
      <Search<{ _id: string; title: string }>
        search=""
        setSearch={setSearch}
        options={options}
        getOptionLabel={getOptionLabel}
      />
    );

    const input = screen.getByRole('combobox');
    const searchIcon = screen.getByAltText('search');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });

  it('should focus input when search icon is clicked even if not focused', async () => {
    const setSearch = jest.fn();

    render(
      <Search<{ _id: string; title: string }>
        search=""
        setSearch={setSearch}
        options={options}
        getOptionLabel={getOptionLabel}
      />
    );
    const input = screen.getByRole('combobox');
    input.blur();
    expect(document.activeElement).not.toBe(input);
    const searchIcon = screen.getByAltText('search');
    fireEvent.click(searchIcon);
    expect(document.activeElement).toBe(input);
  });
});
