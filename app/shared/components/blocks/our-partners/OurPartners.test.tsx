import { render, screen } from '@testing-library/react';

import OurPartners from './OurPartners';
import { gridConfigs } from './partnerLayouts';
import { partners } from './partners.const';

jest.mock('../../design-system/all-components/content-block/ContentBlock', () => {
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
  it('should render the title', () => {
    render(<OurPartners />);
    expect(screen.getByTestId('content-block-title')).toHaveTextContent('Our Partners');
  });

  it('should render the description', () => {
    render(<OurPartners />);
    expect(screen.getByTestId('content-block-description')).toHaveTextContent(
      'Фундація Лятошинського щиро відкрита до партнерства і цінує будь-яку підтримку'
    );
  });

  it('should render the first two xs partners', () => {
    render(<OurPartners />);
    const logos = screen.getAllByTestId('partner-logo');
    expect(logos.length).toBe(2);

    const firstPartnerName = Object.values(partners)[0].name;
    const secondPartnerName = Object.values(partners)[1].name;

    expect(logos[0].querySelector('img')).toHaveAttribute('alt', firstPartnerName);
    expect(logos[1].querySelector('img')).toHaveAttribute('alt', secondPartnerName);
  });

  it('should render PartnerGrid for each gridConfig', () => {
    render(<OurPartners />);
    const grids = screen.getAllByTestId('partner-grid');
    expect(grids.length).toBe(gridConfigs.length);
  });
});
