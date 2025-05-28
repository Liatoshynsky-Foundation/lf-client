import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Footer />);
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
