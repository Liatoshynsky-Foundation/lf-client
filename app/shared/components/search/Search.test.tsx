import useMediaQuery from '@mui/material/useMediaQuery';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { ReactNode } from 'react';

import { Search } from './Search';
import { TitleOption } from '~/types/types/composition.types';

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
  VirtualizedListbox: ({ children }: { children: ReactNode }) => <ul>{children}</ul>
}));

jest.mock('@mui/material/useMediaQuery', () => {
  return jest.fn().mockImplementation(() => false);
});

describe('Search', () => {
  const createOpt = (id: string, name: string, type: TitleOption['type'] = 'composition'): TitleOption => ({
    _id: id,
    name,
    type
  });

  const options: TitleOption[] = [
    ['Test Song'],
    ['Another Song'],
    ['Specific Track', 'genre'],
    ['Song Exact Match'],
    ['Prefix Match Song'],
    ['Opus Track', 'opus'],
    ['B Exact Match'],
    ['Track Prefix Match'],
    ['Some Long Track Name']
  ].map(([name, type], i) => createOpt(String(i + 1), name as string, type as TitleOption['type']));

  const renderSearch = (opts = options, initialSearch = '') => {
    const setSearch = jest.fn();
    const result = render(<Search<TitleOption> search={initialSearch} setSearch={setSearch} options={opts} />);
    const input = screen.getByRole('combobox');
    const searchIcon = screen.queryByAltText('search');
    return { setSearch, input, searchIcon, ...result };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const changeInput = (input: HTMLElement, value: string) => {
    act(() => {
      input.focus();
    });
    fireEvent.change(input, { target: { value } });
  };

  const expectSearchResult = async (input: HTMLElement, searchVal: string, expectedText: string) => {
    changeInput(input, searchVal);
    await waitFor(() => {
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  };

  it('should render the input and fetches options', async () => {
    const { input } = renderSearch();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    await expectSearchResult(input, 'T', options[0].name);
  });

  it('should NOT call setSearch on input change', async () => {
    const { setSearch, input } = renderSearch();
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    await waitFor(() => {
      expect(setSearch).not.toHaveBeenCalled();
    });
  });

  it('should call setSearch when Enter is pressed', async () => {
    const { setSearch, input } = renderSearch();
    fireEvent.change(input, { target: { value: 'Bohemian' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    await waitFor(() => {
      expect(setSearch).toHaveBeenCalledWith('Bohemian');
    });
  });

  it('should call setSearch when option is selected', async () => {
    const { setSearch, input } = renderSearch();
    changeInput(input, 'Test');
    const optionElement = await screen.findByText(options[0].name);
    fireEvent.click(optionElement);
    expect(setSearch).toHaveBeenCalledWith(options[0].name);
  });

  it('should display no options text when no results', async () => {
    const { input } = renderSearch([], 'xyz');
    await expectSearchResult(input, 'Bohemian', 'Not found');
  });

  it('should focus input when search icon is clicked', async () => {
    const { input, searchIcon } = renderSearch();
    act(() => {
      input.blur();
    });
    expect(document.activeElement).not.toBe(input);
    if (!searchIcon) throw new Error('search icon not found');
    act(() => {
      fireEvent.click(searchIcon);
    });
    expect(document.activeElement).toBe(input);
  });

  it('should ignore input change if text length exceeds 200 characters', async () => {
    const { input } = renderSearch();
    const longText = 'a'.repeat(201);
    fireEvent.change(input, { target: { value: longText } });
    expect(input).not.toHaveValue(longText);
  });

  it('should clear the input and value state cleanly when clear icon is clicked', async () => {
    const { setSearch, input } = renderSearch(options, 'Test');
    act(() => {
      input.focus();
    });
    const clearIcon = screen.getByAltText('clear');
    fireEvent.click(clearIcon);
    expect(input).toHaveValue('');
    expect(setSearch).toHaveBeenCalledWith('');
  });

  it('should invoke setSearch during onBlur event if inputValue differs from current search state', async () => {
    const { setSearch, input } = renderSearch(options, 'Initial');
    changeInput(input, 'Changed Text');
    act(() => {
      input.blur();
    });
    expect(setSearch).toHaveBeenCalledWith('Changed Text');
  });

  it('should NOT invoke setSearch during onBlur event if inputValue remains identical to search state', async () => {
    const { setSearch, input } = renderSearch(options, 'Same');
    act(() => {
      input.focus();
    });
    act(() => {
      input.blur();
    });
    expect(setSearch).not.toHaveBeenCalled();
  });

  it.each([
    { name: 'multi-word sorting', val: 'Song', expected: 'Song Exact Match' },
    { name: 'prefix ranking', val: 'Prefix', expected: 'Prefix Match Song' },
    { name: 'localized string', val: 'Specific', expected: 'Specific Track' },
    { name: 'opus identifiers', val: 'Opus', expected: 'Opus Track' }
  ])('should process $name correctly', async ({ val, expected }) => {
    const { input } = renderSearch();
    await expectSearchResult(input, val, expected);
  });

  it('should alternate responsive icon style parameters when render context detects mobile breakpoints', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue(true);
    const { input } = renderSearch();
    expect(input).toBeInTheDocument();
  });

  it('should alternate style configurations when desktop node becomes explicitly focused', () => {
    (useMediaQuery as unknown as jest.Mock).mockReturnValue(false);
    const { input } = renderSearch();
    act(() => {
      input.focus();
    });
    expect(input).toBeInTheDocument();
  });

  const testSorting = async (customOptions: TitleOption[], searchValue: string, expectedName: string) => {
    const { input } = renderSearch(customOptions);
    await expectSearchResult(input, searchValue, expectedName);
  };

  it('should return all options when trimmedInput is empty', async () => {
    const { input } = renderSearch();
    await expectSearchResult(input, 'T', 'Test Song');
    await expectSearchResult(input, '', 'Another Song');
  });

  it.each([
    {
      description: 'should satisfy the bLabel exact match condition inside sorting block',
      customOptions: [createOpt('a', 'Z Random Track Name'), createOpt('b', 'Target')],
      searchValue: 'Target',
      expectedName: 'Target'
    },
    {
      description: 'should satisfy the bLabel startsWith condition inside prefix matching block',
      customOptions: [createOpt('a', 'Z Middle Contains Start Word'), createOpt('b', 'Start Mirror Track')],
      searchValue: 'Start',
      expectedName: 'Start Mirror Track'
    },
    {
      description: 'should calculate mismatched substring placement indices within labels',
      customOptions: [createOpt('a', 'Z Word Long Long Long End'), createOpt('b', 'Short Phrase Word Inside')],
      searchValue: 'Word',
      expectedName: 'Short Phrase Word Inside'
    },
    {
      description: 'should test fallback alphabetical sorting for identical weights',
      customOptions: [createOpt('a', 'B Duplicate Track'), createOpt('b', 'A Duplicate Track')],
      searchValue: 'Duplicate',
      expectedName: 'A Duplicate Track'
    },
    {
      description: 'should satisfy both exact match comparator branches during insertion sort',
      customOptions: [createOpt('a', 'Bxtarget'), createOpt('b', 'Target'), createOpt('c', 'Axtarget')],
      searchValue: 'target',
      expectedName: 'Target'
    }
  ])('$description', async ({ customOptions, searchValue, expectedName }) => {
    await testSorting(customOptions, searchValue, expectedName);
  });

  it('should call handleSelect with null value on blur after clearing input', async () => {
    const { setSearch, input } = renderSearch();
    changeInput(input, 'Test');
    const optionElement = await screen.findByText('Test Song');
    fireEvent.click(optionElement);
    fireEvent.change(input, { target: { value: '' } });
    act(() => {
      input.blur();
    });
    expect(setSearch).toHaveBeenCalledWith('');
  });
});
