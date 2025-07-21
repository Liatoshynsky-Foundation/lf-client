import React, { createContext, ReactNode, useContext, useState } from 'react';

type SearchContextType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState('');

  return <SearchContext.Provider value={{ searchValue, setSearchValue }}>{children}</SearchContext.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
