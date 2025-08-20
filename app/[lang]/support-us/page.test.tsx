import { render, screen } from '@testing-library/react';

import SupportUs from './page';

jest.mock('~/components/blocks/faq/Faq', () => {
  const MockFAQ = () => <div>FAQ</div>;
  MockFAQ.displayName = 'MockFAQ';
  return MockFAQ;
});

describe('SupportUs page', () => {
  it('should render support us page correctly', async () => {
    render(await SupportUs());

    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
  });
});
