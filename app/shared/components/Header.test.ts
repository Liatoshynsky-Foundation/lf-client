import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import Header from './Header';

it('renders the Header component correctly', async () => {
  render(Header());
  const aboutElement = await screen.findByText(/Heade/i);
  expect(aboutElement).toBeInTheDocument();
});
