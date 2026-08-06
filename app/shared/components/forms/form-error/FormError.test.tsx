import { render, screen, within } from '@testing-library/react';

import FormError from './FormError';

describe('FormError', () => {
  it('should render an error message', () => {
    const errorMsg = 'Error msg';
    render(<FormError errorMessage={errorMsg} />);
    expect(screen.getByText('Error msg')).toBeInTheDocument();

    const box = screen.getByTestId('form-error-box');

    expect(box).toBeInTheDocument();
    expect(within(box).getByTestId('form-error-text')).toHaveTextContent(errorMsg);
  });
});
