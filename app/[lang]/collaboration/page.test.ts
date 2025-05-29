import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Collaboration from './page';

it('renders the Collaboration component correctly', async () => {
  render(Collaboration());
  const aboutElement = await screen.findByText(/Collaboration/i);
  expect(aboutElement).toBeInTheDocument();
});
