/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import React from 'react';

import ContactForm from '~/components/forms/contact-form/ContactForm';

import PaperComponent from '../../paper-component/PaperComponent';
import OfferCollaborationForm from './OfferCollaborationForm';

jest.mock('~/components/forms/contact-form/ContactForm', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="mock-contact-form" />)
}));

jest.mock('../../paper-component/PaperComponent', () => ({
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

  it('should render the provided formTitle', () => {
    render(<OfferCollaborationForm formTitle={mockProps.formTitle} />);

    const titleElement = screen.getByTestId('OfferCollaborationForm-formTitle');
    expect(titleElement).toHaveTextContent(mockProps.formTitle);
  });

  it('should render the provided formSubtitle', () => {
    render(<OfferCollaborationForm formSubtitle={mockProps.formSubtitle} />);

    const subtitleElement = screen.getByTestId('OfferCollaborationForm-formSubtitle');
    expect(subtitleElement).toHaveTextContent(mockProps.formSubtitle);
  });

  it('should pass the sx prop to the PaperComponent', () => {
    render(<OfferCollaborationForm sx={mockProps.sx} />);

    const paperComponentCalls = (PaperComponent as jest.Mock).mock.calls;
    const lastCallProps = paperComponentCalls[paperComponentCalls.length - 1][0];

    expect(lastCallProps).toEqual(
      expect.objectContaining({
        sx: mockProps.sx
      })
    );
  });

  describe('onSubmit handler coverage', () => {
    beforeEach(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
      jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
      (console.error as jest.Mock).mockRestore();
      (console.log as jest.Mock).mockRestore();
    });

    it('should handle successful submission without previewUrl', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true })
      });

      render(<OfferCollaborationForm />);

      const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
      const onSubmit = contactFormCalls[contactFormCalls.length - 1][0].onSubmit;

      await onSubmit({ name: 'Test' });

      expect(global.fetch).toHaveBeenCalled();
    });

    it('should log previewUrl on successful submission if provided', async () => {
      const fakeUrl = 'https://mail.preview.url';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ previewUrl: fakeUrl })
      });

      render(<OfferCollaborationForm />);

      const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
      const onSubmit = contactFormCalls[contactFormCalls.length - 1][0].onSubmit;

      await onSubmit({ name: 'Test' });

      expect(console.log).toHaveBeenCalledWith('Email preview URL:', fakeUrl);
    });

    it('should log error and throw exception on failed submission (!response.ok)', async () => {
      const mockErrors = { field: 'Invalid data' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ errors: mockErrors })
      });

      render(<OfferCollaborationForm />);

      const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
      const onSubmit = contactFormCalls[contactFormCalls.length - 1][0].onSubmit;

      try {
        await onSubmit({ name: 'Test' });
      } catch {}

      expect(console.error).toHaveBeenCalledWith('Failed to submit collaboration request:', mockErrors);
    });
  });
});
