import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import About from './page';

describe('About Component', () => {
  it('renders the About component correctly', () => {
    render(<About />);
    const aboutElement = screen.getByText('About');
    expect(aboutElement).toMatchSnapshot();
  });
});
