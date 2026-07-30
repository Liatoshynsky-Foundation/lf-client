import { render, screen } from '@testing-library/react';

import WarInfoSection from './WarInfoSection';

jest.mock('~/components/design-system/all-components/content-block/ContentBlock', () => ({
  __esModule: true,
  default: ({ description }: { description: string }) => <div data-testid="content-block">{description}</div>
}));

describe('WarInfoSection', () => {
  const mockData = {
    title: 'Support the War Effort',
    description: 'Support Ukraine by donating or volunteering.'
  };

  it('should render nothing when no data is provided', () => {
    const { container } = render(<WarInfoSection />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render the title from data', () => {
    render(<WarInfoSection data={mockData} />);
    expect(screen.getByText('Support the War Effort')).toBeInTheDocument();
  });

  it('should render the title as an h1 element', () => {
    render(<WarInfoSection data={mockData} />);
    const title = screen.getByText('Support the War Effort');
    expect(title.tagName).toBe('H1');
  });

  it('should pass the description through to ContentBlock', () => {
    render(<WarInfoSection data={mockData} />);
    const content = screen.getByTestId('content-block');
    expect(content).toHaveTextContent(mockData.description);
  });
});
