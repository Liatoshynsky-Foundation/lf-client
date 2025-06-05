import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Biography from './page';

it('renders the Biography component correctly', async () => {
  render(Biography());
  const aboutElement = await screen.findByText(/Biography/i);
  expect(aboutElement).toBeInTheDocument();
});
