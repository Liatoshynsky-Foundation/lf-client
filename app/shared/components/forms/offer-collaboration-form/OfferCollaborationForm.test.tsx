import { act, render, screen } from '@testing-library/react';
import React from 'react';

import OfferCollaborationForm from './OfferCollaborationForm';
import { ApiRoutes } from '~/constants/routes/api-routes';

import ContactForm from '~/shared/components/forms/contact-form/ContactForm';

jest.mock('~/shared/components/forms/contact-form/ContactForm', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-contact-form" />)
}));

jest.mock('~/shared/components/paper-component/PaperComponent', () => ({
  __esModule: true,
  default: jest.fn(({ children, ...props }) => (
    <div data-testid="mock-paper-component" {...props}>
      {children}
    </div>
  ))
}));

global.fetch = jest.fn();

describe('OfferCollaborationForm', () => {
  const mockProps = {
    formTitle: 'Test Title',
    formSubtitle: 'Test Subtitle',
    sx: { backgroundColor: 'red' }
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component structure correctly', () => {
    render(<OfferCollaborationForm />);

    expect(screen.getByTestId('OfferCollaborationForm')).toBeInTheDocument();
    expect(screen.getByTestId('OfferCollaborationForm-formTitle')).toBeInTheDocument();
    expect(screen.getByTestId('OfferCollaborationForm-formSubtitle')).toBeInTheDocument();
    expect(screen.getByTestId('mock-contact-form')).toBeInTheDocument();
  });

  it('should render the provided formTitle and formSubtitle', () => {
    render(<OfferCollaborationForm formTitle={mockProps.formTitle} formSubtitle={mockProps.formSubtitle} />);

    expect(screen.getByTestId('OfferCollaborationForm-formTitle')).toHaveTextContent(mockProps.formTitle);
    expect(screen.getByTestId('OfferCollaborationForm-formSubtitle')).toHaveTextContent(mockProps.formSubtitle);
  });

  describe('onSubmit handler coverage', () => {
    it('should handle successful submission', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      render(<OfferCollaborationForm />);

      const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
      const onSubmit = contactFormCalls[contactFormCalls.length - 1][0].onSubmit;

      await act(async () => {
        await expect(onSubmit({ name: 'Test' })).resolves.toBeUndefined();
      });

      expect(global.fetch).toHaveBeenCalledWith(ApiRoutes.CONTACT, expect.any(Object));
    });

    it('should throw an error on 429 (Too many requests)', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 429
      });

      render(<OfferCollaborationForm />);

      const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
      const onSubmit = contactFormCalls[contactFormCalls.length - 1][0].onSubmit;

      await act(async () => {
        await expect(onSubmit({ name: 'Test' })).rejects.toThrow('Забагато запитів. Спробуйте пізніше.');
      });
    });

    it('should throw a general error on other failed submissions', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500
      });

      render(<OfferCollaborationForm />);

      const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
      const onSubmit = contactFormCalls[contactFormCalls.length - 1][0].onSubmit;

      await act(async () => {
        await expect(onSubmit({ name: 'Test' })).rejects.toThrow('Помилка відправки');
      });
    });

    it('should handle network connection error and set fallback error message', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      render(<OfferCollaborationForm />);

      const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
      const onSubmit = contactFormCalls[contactFormCalls.length - 1][0].onSubmit;

      await act(async () => {
        await expect(onSubmit({ name: 'Test' })).rejects.toThrow('Network error');
      });

      expect(screen.getByText('Сталася помилка з’єднання. Перевірте інтернет.')).toBeInTheDocument();
    });
  });
});
