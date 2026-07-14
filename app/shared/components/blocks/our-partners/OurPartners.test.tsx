import { render, screen } from '@testing-library/react';
import React from 'react';

import OurPartners from './OurPartners';
import { gridConfigs } from './partnerLayouts';
import { partnersMock } from './partners.data';

interface PartnerGridProps {
  layout: unknown[];
  columns: number;
  partners: unknown[];
}

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'ourPartners.title': 'Our Partners',
      'ourPartners.description': 'Фундація Лятошинського щиро відкрита до партнерства і цінує будь-яку підтримку'
    };
    return translations[key] ?? key;
  }
}));

jest.mock('~/ds-components/content-block/ContentBlock', () => {
  const MockContentBlock = ({ description }: { description?: string }) => (
    <div data-testid="content-block-description">{description}</div>
  );
  MockContentBlock.displayName = 'ContentBlock';
  return MockContentBlock;
});

jest.mock('../../section-title/SectionTitle', () => {
  const MockSectionTitle = ({ title }: { title: string }) => <h2 data-testid="section-title">{title}</h2>;
  MockSectionTitle.displayName = 'SectionTitle';
  return MockSectionTitle;
});

jest.mock('../../partner-logo/PartnerLogo', () => {
  const MockPartnerLogo = ({ image }: { image: React.ReactNode }) => <div data-testid="partner-logo">{image}</div>;
  MockPartnerLogo.displayName = 'PartnerLogo';
  return MockPartnerLogo;
});

jest.mock('./partner-grid/PartnerGrid', () => {
  const MockPartnerGrid = (props: PartnerGridProps) => <div data-testid="partner-grid">{JSON.stringify(props)}</div>;
  MockPartnerGrid.displayName = 'PartnerGrid';
  return MockPartnerGrid;
});

describe('OurPartners', () => {
  const originalGridConfigs = [...gridConfigs];

  afterEach(() => {
    jest.clearAllMocks();
    (gridConfigs as unknown as unknown[]).splice(0, gridConfigs.length, ...originalGridConfigs);
  });

  it('should render translated title using SectionTitle', () => {
    render(<OurPartners />);
    expect(screen.getByTestId('section-title')).toHaveTextContent('title');
  });

  it('should render translated description', () => {
    render(<OurPartners />);
    expect(screen.getByTestId('content-block-description')).toHaveTextContent('description');
  });

  it('should render the first two xs partners', () => {
    render(<OurPartners />);
    const logos = screen.getAllByTestId('partner-logo');
    expect(logos.length).toBe(partnersMock.length);

    const firstPartnerName = partnersMock[0].name;
    const secondPartnerName = partnersMock[1].name;

    expect(logos[0].querySelector('img')).toHaveAttribute('alt', firstPartnerName);
    expect(logos[1].querySelector('img')).toHaveAttribute('alt', secondPartnerName);
  });

  it('should render PartnerGrid for each gridConfig', () => {
    render(<OurPartners />);
    const grids = screen.getAllByTestId('partner-grid');
    expect(grids.length).toBe(gridConfigs.length);

    for (const grid of grids) {
      const props = JSON.parse(grid.textContent || '{}') as PartnerGridProps;
      expect(props).toHaveProperty('layout');
      expect(props).toHaveProperty('columns');
      expect(props).toHaveProperty('partners');
      expect(props.partners.length).toBeGreaterThan(0);
    }
  });

  it('should cover line 61 fallback array branch when layouts key is missing', () => {
    (gridConfigs as unknown as unknown[]).splice(0, gridConfigs.length, {
      key: 'missing_layout_key' as never,
      min: 'md',
      columns: 4
    });

    render(<OurPartners />);

    const grids = screen.getAllByTestId('partner-grid');
    expect(grids).toHaveLength(1);

    const props = JSON.parse(grids[0].textContent || '{}') as PartnerGridProps;
    expect(props.layout).toEqual([]);
  });
});
