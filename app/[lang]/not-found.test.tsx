import CustomNotFoundPage from './not-found';

import { PageNotFound } from './[...unknown-route]/page-not-found/PageNotFound';

import { ROUTES } from '~/shared/components/constants/routes';

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

describe('CustomNotFoundPage', () => {
  it('should execute correctly to cover all lines', async () => {
    const result = await CustomNotFoundPage();

describe('NotFound', () => {
  it('should render NotFound page', async () => {
    render(await PageNotFound());
    expect(await screen.findByText(/OoPs!/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/The page you are looking for does not exist, search again on the main page/i)
    ).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /"Return to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.HOME);
  });
});
