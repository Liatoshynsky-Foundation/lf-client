import { render, screen } from '@testing-library/react';

import TableCard from './TableCard';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>
}));

const mockRecord = {
  id: '1',
  code: 'Ф. 2, оп. 1, спр. 1',
  name: 'Документи про освіту',
  date: '1895–1955',
  sheets: 11,
  content: 'Метричні виписки, довідки'
};

describe('TableCard', () => {
  test('should render all data passed as props', () => {
    render(<TableCard {...mockRecord} />);

    expect(screen.getByText(mockRecord.code)).toBeInTheDocument();
    expect(screen.getByText(mockRecord.name)).toBeInTheDocument();
    expect(screen.getByText(mockRecord.date)).toBeInTheDocument();
    expect(screen.getByText(mockRecord.sheets.toString())).toBeInTheDocument();
    expect(screen.getByText(mockRecord.content)).toBeInTheDocument();
  });
});
