import { render, screen } from '@testing-library/react';

import Navigation from './Navigation';
import type { ArchiveAdjacentCase } from '~/types/page/archive.types';

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  Svg: ({ alt }: { alt: string }) => <span data-testid="svg-mock" aria-label={alt} />
}));

describe('Navigation', () => {
  const prevCase: ArchiveAdjacentCase = {
    id: 'prev-id',
    href: '/uk/archive/fund/2/case/op1-spr2',
    indexLabel: 'Ф. 2, оп. 1, спр. 2',
    title: 'Попередня справа'
  };

  const nextCase: ArchiveAdjacentCase = {
    id: 'next-id',
    href: '/uk/archive/fund/2/case/op1-spr4',
    indexLabel: 'Ф. 2, оп. 1, спр. 4',
    title: 'Наступна справа'
  };

  const prevLabel = 'Попередня справа';
  const nextLabel = 'Наступна справа';

  it('returns null if neither prevCase nor nextCase is provided', () => {
    const { container } = render(<Navigation prevLabel={prevLabel} nextLabel={nextLabel} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders only previous case when prevCase is provided', () => {
    render(<Navigation prevCase={prevCase} prevLabel={prevLabel} nextLabel={nextLabel} />);

    const wrapper = screen.getByTestId('ArchiveCaseDetails-navigation');
    expect(wrapper).toBeInTheDocument();

    expect(screen.getByTestId('ArchiveCaseDetails-prevCase')).toBeInTheDocument();
    expect(screen.queryByTestId('ArchiveCaseDetails-nextCase')).not.toBeInTheDocument();
  });

  it('renders only next case when nextCase is provided', () => {
    render(<Navigation nextCase={nextCase} prevLabel={prevLabel} nextLabel={nextLabel} />);

    const wrapper = screen.getByTestId('ArchiveCaseDetails-navigation');
    expect(wrapper).toBeInTheDocument();

    expect(screen.getByTestId('ArchiveCaseDetails-nextCase')).toBeInTheDocument();
    expect(screen.queryByTestId('ArchiveCaseDetails-prevCase')).not.toBeInTheDocument();
  });

  it('renders both previous and next cases when both are provided', () => {
    render(<Navigation prevCase={prevCase} nextCase={nextCase} prevLabel={prevLabel} nextLabel={nextLabel} />);

    expect(screen.getByTestId('ArchiveCaseDetails-prevCase')).toBeInTheDocument();
    expect(screen.getByTestId('ArchiveCaseDetails-nextCase')).toBeInTheDocument();
  });
});
