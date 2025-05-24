import Footer from '~/shared/components/Footer/Footer';
import {render, screen} from '@testing-library/react';

describe('Footer component', () => {
  it('should render Footer component correctly', async () => {
    render(await Footer({ lang: 'en' }));
    expect(await screen.findByText(/privacy/i)).toBeInTheDocument();
  });

  it('has child elements', () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector('footer');
    expect(footerElement?.children.length).toBeGreaterThan(0);
  });
});
