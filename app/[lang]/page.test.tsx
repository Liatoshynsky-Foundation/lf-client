import { render, screen, act } from '@testing-library/react';
import Home from './page';

describe('Home component', () => {
  const params = Promise.resolve({ lang: 'en' });

  it('renders the Home component correctly', async () => {
    await act(async () => {
      render(<Home params={params} />);
    });

    const homeElement = await screen.findByText(/Liatoshynsky project/i);
    expect(homeElement).toBeInTheDocument();
  });

  it('renders the Home component with correct text', async () => {
    await act(async () => {
      render(<Home params={params} />);
    });

    const homeElement = await screen.findByText(/Liatoshynsky project/i);
    expect(homeElement).toBeInTheDocument();
  });
});
