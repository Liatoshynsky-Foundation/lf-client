import { render, screen } from '@testing-library/react';

import TableNoResultsFound from './TableNoResultsFound';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

describe('TableNoResultsFound', () => {
  it('should render correctly', () => {
    render(
      <table>
        <tbody>
          <TableNoResultsFound />
        </tbody>
      </table>
    );

    const title = screen.getByText('title');
    const description = screen.getByText('description');
    const image = screen.getByAltText('No results found');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(image).toBeInTheDocument();
  });
});
