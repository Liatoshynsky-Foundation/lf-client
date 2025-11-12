import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import MediaAboutUs from './page';

it('renders the MediaAboutUs component correctly', async () => {
  render(MediaAboutUs());
  const aboutElement = await screen.findByText(/Our media work/i);
  expect(aboutElement).toBeInTheDocument();
});
