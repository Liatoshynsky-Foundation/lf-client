import { render, screen } from '@testing-library/react';
import React from 'react';

import ArchiveCaseDetails, {
  type ArchiveAdjacentCase,
  type ArchiveCaseDetailsLabels,
  type ArchiveCaseDocument
} from './ArchiveCaseDetails';

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  Svg: () => <span data-testid="SvgMock" />
}));

describe('ArchiveCaseDetails', () => {
  const documents: ArchiveCaseDocument[] = [
    { id: 'doc-1', title: 'Документ А' },
    { id: 'doc-2', title: 'Документ Б' }
  ];

  const prevCase: ArchiveAdjacentCase = {
    href: '/uk/archive/2/op1-spr2',
    indexLabel: 'Ф. 2, оп. 1, спр. 2',
    title: 'Попередня справа'
  };

  const nextCase: ArchiveAdjacentCase = {
    href: '/uk/archive/2/op1-spr4',
    indexLabel: 'Ф. 2, оп. 1, спр. 4',
    title: 'Наступна справа'
  };

  const labels: ArchiveCaseDetailsLabels = {
    back: 'Повернутись',
    metaCode: 'Шифр',
    metaDates: 'Дати справи',
    metaSheets: 'Аркушів',
    documentsAria: 'Документи справи',
    viewPdf: 'Переглянути PDF',
    prevCase: 'Попередня справа',
    nextCase: 'Наступна справа'
  };

  const baseProps = {
    title: 'Трудова діяльність',
    index: 'Ф. 2, оп. 1, спр. 3',
    dateRange: '1895–1955',
    sheetsCount: 26,
    pdfUrl: 'https://example.com/f2-op1-spr3.pdf',
    documents,
    fundHref: '/uk/archive/2',
    prevCase,
    nextCase,
    labels
  };

  it('renders main layout, title and PDF button', () => {
    render(<ArchiveCaseDetails {...baseProps} />);

    expect(screen.getByTestId('ArchiveCaseDetails')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveCaseDetails-title')).toHaveTextContent('Трудова діяльність');

    expect(screen.getByTestId('ArchiveCaseDetails-back')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveCaseDetails-meta')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveCaseDetails-documentsColumn')).toBeInTheDocument();

    const pdfWrapper = screen.getByTestId('ArchiveCaseDetails-pdfButtonSticky');
    expect(pdfWrapper).toBeInTheDocument();

    const pdfButton = screen.getByTestId('ArchiveCaseDetails-pdfButton');
    expect(pdfButton).toBeInTheDocument();
    expect(pdfButton).toHaveAttribute('href', baseProps.pdfUrl);
    expect(pdfButton).toHaveAttribute('target', '_blank');
    expect(pdfButton).toHaveAttribute('rel', 'noopener noreferrer');
    expect(pdfButton).toHaveTextContent(labels.viewPdf);
  });

  it('renders navigation when prevCase / nextCase are provided', () => {
    render(<ArchiveCaseDetails {...baseProps} />);

    const nav = screen.getByTestId('ArchiveCaseDetails-navigation');
    expect(nav).toBeInTheDocument();

    expect(screen.getByTestId('ArchiveCaseDetails-prevCase')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveCaseDetails-nextCase')).toBeInTheDocument();
  });

  it('hides navigation when both prevCase and nextCase are null', () => {
    render(<ArchiveCaseDetails {...baseProps} prevCase={undefined} nextCase={undefined} />);

    expect(screen.queryByTestId('ArchiveCaseDetails-navigation')).toBeNull();
  });

  it('renders all documents in the list', () => {
    render(<ArchiveCaseDetails {...baseProps} />);

    const list = screen.getByTestId('ArchiveCaseDetails-documentsList');
    expect(list).toBeInTheDocument();

    expect(screen.getByText('Документ А')).toBeInTheDocument();
    expect(screen.getByText('Документ Б')).toBeInTheDocument();
  });
});
