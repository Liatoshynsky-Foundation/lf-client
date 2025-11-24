import { render, screen } from '@testing-library/react';

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

  it('should pass an onSubmit handler to ContactForm and execute it', () => {
    render(<OfferCollaborationForm />);

    const contactFormCalls = (ContactForm as jest.Mock).mock.calls;
    const lastCallProps = contactFormCalls[contactFormCalls.length - 1][0];

    expect(lastCallProps).toHaveProperty('onSubmit');
    expect(typeof lastCallProps.onSubmit).toBe('function');

    expect(() => lastCallProps.onSubmit()).not.toThrow();
  });
});
