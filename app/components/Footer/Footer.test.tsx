import {render, screen} from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('should render Footer component correctly', async () => {
    render(await Footer({ lang: 'en' }));
    expect(await screen.findByText(/privacy/i)).toBeInTheDocument();
  });
});
