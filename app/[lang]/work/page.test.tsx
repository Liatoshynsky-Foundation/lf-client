import { render, screen } from '@testing-library/react';

import Work from './page';

jest.mock('~/components/liatoshynsky-work/LiatoshynskyWork', () => {
  const MockLiatoshynskyWork = () => <div>Liatoshynksy work</div>;
  MockLiatoshynskyWork.displayName = 'MockLiatoshynskyWork';
  return MockLiatoshynskyWork;
});

describe('Liatoshynsky work page', () => {
  it('should render Liatoshynsky work page correctly', async () => {
    render(await Work());

    expect(screen.getByText(/Liatoshynksy work/i)).toBeInTheDocument();
  });
});
