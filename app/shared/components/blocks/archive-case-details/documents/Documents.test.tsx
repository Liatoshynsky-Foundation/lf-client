import { render, screen } from '@testing-library/react';

import Documents, { type DocumentsProps } from './Documents';

describe('Documents', () => {
  const baseProps: DocumentsProps = {
    documents: [
      { id: 'doc-1', title: 'Документ А' },
      { id: 'doc-2', title: 'Документ Б' }
    ],
    title: 'Перелік документів справи',
    ariaLabel: 'Перелік документів справи'
  };

  it('renders wrapper and ordered list with data-testids', () => {
    render(<Documents {...baseProps} />);

    const column = screen.getByTestId('ArchiveCaseDetails-documentsColumn');
    expect(column).toBeInTheDocument();

    const list = screen.getByTestId('ArchiveCaseDetails-documentsList');
    expect(list).toBeInTheDocument();
    expect(list).toHaveAttribute('aria-label', baseProps.ariaLabel);
    expect(screen.getByText(baseProps.title!)).toBeInTheDocument();
  });

  it('renders all documents with correct titles', () => {
    render(<Documents {...baseProps} />);

    expect(screen.getByText('Документ А')).toBeInTheDocument();
    expect(screen.getByText('Документ Б')).toBeInTheDocument();
  });

  it('renders no items when documents array is empty', () => {
    render(<Documents documents={[]} ariaLabel="Перелік документів справи" />);

    const list = screen.getByTestId('ArchiveCaseDetails-documentsList');
    expect(list.childElementCount).toBe(0);
  });
});
