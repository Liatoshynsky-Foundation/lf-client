import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
    it('renders without crashing', () => {
        const { container } = render(<Footer />);
        expect(container.querySelector('footer')).toBeInTheDocument();
    });

    it('has child elements', () => {
        const { container } = render(<Footer />);
        const footerElement = container.querySelector('footer');
        expect(footerElement?.children.length).toBeGreaterThan(0);
    });
});
