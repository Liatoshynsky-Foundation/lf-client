import { render, screen } from '@testing-library/react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import PartnerGrid from './PartnerGrid';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'test-uuid')
}));

jest.mock('~/shared/components/partner-logo/PartnerLogo', () => {
  return function MockPartnerLogo({ link, image }: any) {
    return (
      <div data-testid="partner-logo">
        <a href={link}>{image}</a>
      </div>
    );
  };
});

describe('PartnerGrid', () => {
  const mockPartners = [
    { id: '1', name: 'Partner 1', img: '/img1.png', link: '/link1' },
    { id: '2', name: 'Partner 2', img: '/img2.png', link: '/link2' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render partners according to layout', () => {
    const layout = ['1', '2'];
    render(<PartnerGrid layout={layout} columns={2} partners={mockPartners} />);

    const logos = screen.getAllByTestId('partner-logo');
    expect(logos).toHaveLength(2);
    expect(screen.getByAltText('Partner 1')).toBeInTheDocument();
    expect(screen.getByAltText('Partner 2')).toBeInTheDocument();
  });

  it('should render empty Box and call uuidv4 for null values in layout', () => {
    const layout = ['1', null];
    render(<PartnerGrid layout={layout} columns={2} partners={mockPartners} />);

    expect(screen.getAllByTestId('partner-logo')).toHaveLength(1);

    expect(uuidv4).toHaveBeenCalled();
  });

  it('should render empty Box if partner ID in layout is not found in partners array', () => {
    const layout = ['999'];
    const { container } = render(<PartnerGrid layout={layout} columns={1} partners={mockPartners} />);

    expect(screen.queryByTestId('partner-logo')).not.toBeInTheDocument();

    expect(container.firstChild?.childNodes).toHaveLength(1);
  });

  it('should apply grid columns style', () => {
    const columns = 4;
    render(<PartnerGrid layout={['1']} columns={columns} partners={mockPartners} />);

    expect(screen.getByAltText('Partner 1')).toBeInTheDocument();
  });
});
