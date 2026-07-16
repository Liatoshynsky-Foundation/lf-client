import { render, screen } from '@testing-library/react';
import React from 'react';

import CustomNotFoundPage from './not-found';

jest.mock('./[...unknown-route]/page-not-found/PageNotFound', () => ({
  PageNotFound: () => <div data-testid="page-not-found">Mocked PageNotFound</div>
}));

describe('CustomNotFoundPage', () => {
  it('should render PageNotFound component', () => {
    render(<CustomNotFoundPage />);

    expect(screen.getByTestId('page-not-found')).toBeInTheDocument();
  });
});
