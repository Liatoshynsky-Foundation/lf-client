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
  cipher: 'Ф. 2, оп. 1, спр. 1',
  name: 'Документи про освіту',
  dates: '1895–1955',
  sheets: 11,
  contentDescription: 'Метричні виписки, довідки',
  pdfUrl: 'https://example.com/case-1.pdf'
};

describe('TableCard', () => {
  test('should render all data passed as props', () => {
    render(<TableCard {...mockRecord} />);

    expect(screen.getByText(mockRecord.cipher)).toBeInTheDocument();
    expect(screen.getByText(mockRecord.name)).toBeInTheDocument();
    expect(screen.getByText(mockRecord.dates)).toBeInTheDocument();
    expect(screen.getByText(mockRecord.sheets.toString())).toBeInTheDocument();
    expect(screen.getByText(mockRecord.contentDescription)).toBeInTheDocument();
  });

  test('should render a PDF link that opens in a new tab when the case has a PDF', () => {
    render(<TableCard {...mockRecord} />);

    const link = screen.getByRole('link', { name: 'buttons.mobileView' });
    expect(link).toHaveAttribute('href', mockRecord.pdfUrl);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('should not render the PDF button when the case has no PDF', () => {
    render(<TableCard {...mockRecord} pdfUrl={null} />);

    expect(screen.queryByText('buttons.mobileView')).not.toBeInTheDocument();
  });
});
