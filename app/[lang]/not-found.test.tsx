import { screen, render } from '@testing-library/react';
import NotFoundPage from './not-found';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockResolvedValue((key: string) => {
    const translations: Record<string, string> = {
      '404_language': '404 Language',
      'go_home': 'go homee',
    };
    return translations[key];
  })
}));

describe('NotFound ', () => {
  it('should render NotFound page', async () => {
    render(await NotFoundPage());
    expect(await screen.findByText(/404 Language/i)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /go home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
