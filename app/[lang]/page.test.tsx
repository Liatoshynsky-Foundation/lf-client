import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('~/components/Liatoshynsky-office/LiatoshynskyOffice', () => {
  const MockLiatoshynskyOffice = () => <div>Liatoshynsky office</div>;
  MockLiatoshynskyOffice.displayName = 'MockLiatoshynskyOffice';
  return MockLiatoshynskyOffice;
});

jest.mock('~/components/FoundationFounders/FoundationFounders', () => {
  const MockFoundationFounders = () => <div>Foundation founders</div>;
  MockFoundationFounders.displayName = 'MockFoundationFounders';
  return MockFoundationFounders;
});

describe('Home component', () => {
  it('should render Home component correctly', async () => {
    render(await Home());
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
    expect(screen.getByText(/Foundation founders/i)).toBeInTheDocument();
  });
});
