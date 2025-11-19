import { render, screen } from '@testing-library/react';

import Documents, { type DocumentsProps } from './Documents';

describe('Documents', () => {
  const baseProps: DocumentsProps = {
    documents: [
      { id: 'doc-1', title: 'Документ А' },
      { id: 'doc-2', title: 'Документ Б' }
    ],
    ariaLabel: 'Документи справи',
    pdfUrl: 'https://example.com/f2-op1-spr3.pdf',
    pdfLabel: 'Переглянути PDF'
  };

  it('renders wrapper and ordered list with data-testids', () => {
    render(<Documents {...baseProps} />);

    const column = screen.getByTestId('ArchiveCaseDetails-documentsColumn');
    expect(column).toBeInTheDocument();

    const list = screen.getByTestId('ArchiveCaseDetails-documentsList');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('aria-label', baseProps.ariaLabel);
  });

  it('renders all documents with correct titles', () => {
    render(<Documents {...baseProps} />);

    expect(screen.getByText('Документ А')).toBeInTheDocument();
    expect(screen.getByText('Документ Б')).toBeInTheDocument();
  });

  it('renders no items when documents array is empty', () => {
    render(
      <Documents documents={[]} ariaLabel="Документи справи" pdfUrl={baseProps.pdfUrl} pdfLabel={baseProps.pdfLabel} />
    );

    const list = screen.getByTestId('ArchiveCaseDetails-documentsList');
    expect(list.childElementCount).toBe(0);
  });

  it('renders mobile pdf button', () => {
    render(<Documents {...baseProps} />);

    const wrapper = screen.getByTestId('ArchiveCaseDetails-pdfButtonMobile');
    expect(wrapper).toBeInTheDocument();

    const link = screen.getByRole('link', { name: baseProps.pdfLabel });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', baseProps.pdfUrl);
  });
});
