import { render, screen } from '@testing-library/react';

import Meta, { type MetaProps } from './Meta';

const defaultProps: MetaProps = {
  index: 'Ф. 2, оп. 1, спр. 3',
  dateRange: '1895–1955',
  sheetsCount: 26,
  labels: {
    code: 'Шифр',
    dates: 'Дати справи',
    sheets: 'Аркушів'
  }
};

describe('Meta', () => {
  it('renders basic meta info', () => {
    render(<Meta {...defaultProps} />);

    const root = screen.getByTestId('ArchiveCaseDetails-meta');
    expect(root).toBeInTheDocument();

    expect(screen.getByText(defaultProps.labels.code)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.labels.dates)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.labels.sheets)).toBeInTheDocument();

    expect(screen.getByText(defaultProps.index)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.dateRange)).toBeInTheDocument();
    expect(screen.getByText(String(defaultProps.sheetsCount))).toBeInTheDocument();
  });

  it('does not render sheets count block when sheetsCount is undefined', () => {
    const { queryByText } = render(
      <Meta index={defaultProps.index} dateRange={defaultProps.dateRange} labels={defaultProps.labels} />
    );

    expect(queryByText(defaultProps.labels.sheets)).not.toBeInTheDocument();
  });

  it('supports zero sheetsCount value', () => {
    render(
      <Meta
        index={defaultProps.index}
        dateRange={defaultProps.dateRange}
        sheetsCount={0}
        labels={defaultProps.labels}
      />
    );

    expect(screen.getByText(defaultProps.labels.sheets)).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
