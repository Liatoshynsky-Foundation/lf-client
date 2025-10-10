import { render, screen } from '@testing-library/react';

import Collaboration from './page';

jest.mock('next-intl/server', () => ({
  setRequestLocale: jest.fn()
}));

jest.mock('~/components/blocks/collaboration/offer-collaboration/OfferCollaboration', () => {
  const MockOfferCollaboration = () => <div>Offer collaboration</div>;
  MockOfferCollaboration.displayName = 'MockOfferCollaboration';
  return MockOfferCollaboration;
});

describe('Collaboration component', () => {
  it('should render Collaboration component correctly', async () => {
    render(await Collaboration({ params: Promise.resolve({ lang: 'en' }) }));
    expect(screen.getByText(/Offer collaboration/i)).toBeInTheDocument();
  });
});
