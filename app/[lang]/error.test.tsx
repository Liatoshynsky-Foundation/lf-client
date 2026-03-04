import { render, screen } from '@testing-library/react';

import ErrorFallback from './error';

jest.mock('~/shared/components/error-component/Error', () => {
  return function MockError() {
    return <div data-testid="error-component">Mock Error</div>;
  };
});

describe('ErrorFallback', () => {
  it('should render ErrorComponent inside a Box', () => {
    render(<ErrorFallback />);
    expect(screen.getByTestId('error-component')).toBeInTheDocument();
  });
});
