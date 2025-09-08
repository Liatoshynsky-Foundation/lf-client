import { render, screen } from '@testing-library/react';

import QueryProvider from './QueryProvider';

jest.mock('@tanstack/react-query-devtools', () => ({ ReactQueryDevtools: () => <div data-testid="devtools" /> }));

it('should render children and devtools', () => {
  render(
    <QueryProvider>
      {' '}
      <div data-testid="child">Hello</div>{' '}
    </QueryProvider>
  );
  expect(screen.getByTestId('child')).toBeInTheDocument();
  expect(screen.getByTestId('devtools')).toBeInTheDocument();
});
