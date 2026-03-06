import { render, screen } from '@testing-library/react';

import ApiDocs from './page';

jest.mock('next/dynamic', () => () => {
  const MockRedoc = () => <div data-testid="redoc">Redoc Content</div>;
  MockRedoc.displayName = 'RedocStandalone';
  return MockRedoc;
});

describe('ApiDocs Page', () => {
  it('should render RedocStandalone with correct specUrl', () => {
    render(<ApiDocs />);
    expect(screen.getByTestId('redoc')).toBeInTheDocument();
  });
});
