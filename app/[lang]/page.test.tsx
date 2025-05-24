import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home component', () => {
    const params = Promise.resolve({ lang: 'en' });
    it('should render Home component correctly', async () => {
        render(await Home ({params: params }));
        expect(await screen.findByText(/Liatoshynsky project/i)).toBeInTheDocument();
    });
});
