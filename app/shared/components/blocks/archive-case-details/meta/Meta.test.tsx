import { render, screen } from '@testing-library/react';

import Meta, { type MetaProps } from './Meta';

const defaultProps: MetaProps = {
  index: 'Ф. 2, оп. 1, спр. 3',
  dateRange: '1895–1955',
  sheetsCount: 26,
  pdfUrl: 'https://example.com/f2-op1-spr3.pdf',
  labels: {
    code: 'Шифр',
    dates: 'Дати справи',
    sheets: 'Аркушів',
    viewPdf: 'Переглянути PDF'
  }
};

describe('Meta', () => {
  it('renders basic meta info and PDF button', () => {
    render(<Meta {...defaultProps} />);

    const root = screen.getByTestId('ArchiveCaseDetails-meta');
    expect(root).toBeInTheDocument();

    expect(screen.getByText(defaultProps.labels.code)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.labels.dates)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.labels.sheets)).toBeInTheDocument();

    expect(screen.getByText(defaultProps.index)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.dateRange)).toBeInTheDocument();
    expect(screen.getByText(String(defaultProps.sheetsCount))).toBeInTheDocument();

    const pdfButtonSticky = screen.getByTestId('ArchiveCaseDetails-pdfButtonSticky');
    expect(pdfButtonSticky).toBeInTheDocument();

    const pdfButton = screen.getByTestId('ArchiveCaseDetails-pdfButton');
    expect(pdfButton).toBeInTheDocument();
    expect(pdfButton).toHaveAttribute('href', defaultProps.pdfUrl);
    expect(pdfButton).toHaveAttribute('target', '_blank');
    expect(pdfButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(pdfButton).toHaveTextContent(defaultProps.labels.viewPdf);
  });

  it('does not render sheets count block when sheetsCount is undefined', () => {
    const { queryByText } = render(
      <Meta
        index={defaultProps.index}
        dateRange={defaultProps.dateRange}
        pdfUrl={defaultProps.pdfUrl}
        labels={defaultProps.labels}
      />
    );

    expect(queryByText(defaultProps.labels.sheets)).not.toBeInTheDocument();
  });

  it('supports zero sheetsCount value', () => {
    render(
      <Meta
        index={defaultProps.index}
        dateRange={defaultProps.dateRange}
        sheetsCount={0}
        pdfUrl={defaultProps.pdfUrl}
        labels={defaultProps.labels}
      />
    );

    expect(screen.getByText(defaultProps.labels.sheets)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
