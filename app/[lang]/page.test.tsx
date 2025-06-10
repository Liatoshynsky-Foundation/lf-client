import { render, screen } from '@testing-library/react';

import Home from './page';

jest.mock('~/components/Liatoshynsky-office/LiatoshynskyOffice', () => {
  const MockLiatoshynskyOffice = () => <div>Liatoshynsky office</div>;
  MockLiatoshynskyOffice.displayName = 'MockLiatoshynskyOffice';
  return MockLiatoshynskyOffice;
});

describe('Home component', () => {
  it('should render Home component correctly', async () => {
    render(await Home());
    expect(screen.getByText(/Liatoshynsky office/i)).toBeInTheDocument();
  });
});
