import { render, screen } from '@testing-library/react';
import Home from './page';
describe('Home component', () => {
  it('renders the Home component correctly', () => {
    render(<Home />);
    const homeElement = screen.getByText('Liatoshynsky project');
    expect(homeElement).toBeInTheDocument();
  });

  it('renders the Home component with correct text', () => {
    render(<Home />);
    const homeElement = screen.getByText('Liatoshynsky project');
    expect(homeElement).toBeInTheDocument();
  });
});
