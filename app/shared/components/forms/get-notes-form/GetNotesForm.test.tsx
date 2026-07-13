import { render, screen } from '@testing-library/react';

import GetNotesForm from './GetNotesForm';

import { useContactForm } from '~/shared/hooks/use-contact-form/useContactForm';

jest.mock('~/shared/hooks/use-contact-form/useContactForm');

jest.mock('~/shared/components/forms/form-error/FormError');

jest.mock('~/shared/components/forms/contact-form/ContactForm', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-contact-form" />)
}));

describe('GetNotesForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useContactForm as jest.Mock).mockReturnValue({
      errorMessage: null,
      handleSubmit: jest.fn(),
      isSubmitting: false
    });
  });

  it('should render a form', () => {
    render(<GetNotesForm />);

    expect(screen.getByTestId('mock-contact-form')).toBeInTheDocument();
  });
  it('should render an error', () => {
    const errorMsg = 'Error';

    (useContactForm as jest.Mock).mockReturnValueOnce({
      errorMessage: errorMsg,
      handleSubmit: jest.fn(),
      isSubmitting: false
    });

    render(<GetNotesForm />);

    expect(screen.getByTestId('form-error-box')).toBeInTheDocument();
    expect(screen.getByTestId('form-error-text')).toHaveTextContent(errorMsg);
  });
});
