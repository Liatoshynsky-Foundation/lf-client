import { screen, render } from '@testing-library/react';
import NotFoundPage from './not-found';

describe('NotFound ', () => {
  it('should render NotFound page', async () => {
    render(await NotFoundPage());
    expect(await screen.findByText(/Сторінка ще недоступна цією мовою/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Повернутись на головну/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
