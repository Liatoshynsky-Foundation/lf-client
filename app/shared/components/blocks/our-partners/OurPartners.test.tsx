import { render, screen } from '@testing-library/react';

import OurPartners from './OurPartners';
import { gridConfigs } from './partnerLayouts';
import { partnersMock } from './partners.data';

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
  const MockContentBlock = ({ title, description }: { title?: string; description?: string }) => (
    <div data-testid={title ? 'content-block-title' : 'content-block-description'}>{title || description}</div>
  );
  MockContentBlock.displayName = 'ContentBlock';
  return MockContentBlock;
});

jest.mock('../../partner-logo/PartnerLogo', () => {
  const MockPartnerLogo = ({ image }: { image: React.ReactNode }) => <div data-testid="partner-logo">{image}</div>;
  MockPartnerLogo.displayName = 'PartnerLogo';
  return MockPartnerLogo;
});

jest.mock('./partner-grid/PartnerGrid', () => {
  const MockPartnerGrid = (props: any) => <div data-testid="partner-grid">{JSON.stringify(props)}</div>;
  MockPartnerGrid.displayName = 'PartnerGrid';
  return MockPartnerGrid;
});

describe('OurPartners', () => {
  it('should render translated title', () => {
    render(<OurPartners />);
    expect(screen.getByTestId('content-block-title')).toHaveTextContent('title');
  });

  it('should render translated description', () => {
    render(<OurPartners />);
    expect(screen.getByTestId('content-block-description')).toHaveTextContent('description');
  });

  it('should render the first two xs partners', () => {
    render(<OurPartners />);
    const logos = screen.getAllByTestId('partner-logo');
    expect(logos.length).toBe(2);

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
      const props = JSON.parse(grid.textContent || '{}');
      expect(props).toHaveProperty('layout');
      expect(props).toHaveProperty('columns');
      expect(props).toHaveProperty('partners');
      expect(props.partners.length).toBeGreaterThan(0);
    }
  });
});
