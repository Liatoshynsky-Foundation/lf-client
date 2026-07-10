import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ROUTES } from '../../constants/routes';
import ContactForm from './ContactForm';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useHandlePhoneInput } from '~/shared/hooks/use-handle-phone-input/useHandlePhoneInput';
jest.mock('~/components/get-notes-modal/notes-confirmation-modal/NotesConfirmModal', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="fake-notes-confirm-modal">{props.title}</div>
}));

jest.mock('../../paper-component/PaperComponent', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false, isTablet: false }))
}));

jest.mock('~/shared/hooks/use-handle-phone-input/useHandlePhoneInput');

jest.mock('~/ds-components/button/Button', () => ({
  __esModule: true,
  default: ({ size, children, ...rest }: any) => (
    <button data-testid="submit-button" data-size={size} {...rest}>
      {children}
    </button>
  )
}));

jest.mock('public/icons/info-error.svg', () => {
  return function InfoErrorIcon() {
    return <span data-testid="info-error-icon">info-error</span>;
  };
});

jest.mock('next-intl', () => ({
  __esModule: true,
  useTranslations: () => (key: string) => {
    const messages: Record<string, string> = {
      name: 'Імя',
      email: 'Електронна адреса (email) *',
      phoneNumber: 'Номер телефону',
      message: 'Ваше повідомлення *',
      policyText: 'Я погоджуюсь з',
      policyLink: 'Політикою конфіденційності',
      buttonText: 'Надіслати запит',
      requiredFields: '* – поля обов’язкові до заповнення',
      nameMinLength: 'Імʼя має містити щонайменше 2 символи',
      nameMaxLength: 'Імʼя не може перевищувати 50 символів',
      emailRequired: 'Будь ласка, вкажіть вашу електронну адресу',
      emailInvalid: 'Введіть коректну email-адресу',
      phoneNumberInvalid: 'Перевірте формат номера телефону',
      messageMinLength: 'Напишіть кілька слів у повідомленні',
      messageMaxLength: 'Повідомлення не може перевищувати 1000 символів',
      policyRequired: 'Щоб продовжити, потрібно дати згоду'
    };
    return messages[key] || key;
  }
}));

jest.mock('~/components/modal-component/ModalComponent', () => ({
  __esModule: true,
  default: (props: any) => <button onClick={props.onClose} data-testid="fake-close-modal-trigger" />
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

const fillInput = (label: string, value: string) => {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', { name: /Надіслати запит/i }));
};

const onSubmit = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useHandlePhoneInput as jest.Mock).mockReturnValue({ handlePhoneInput: jest.fn(), hasError: false });
  });

  it('should contain four text inputs including a multiline message field', () => {
    (useHandlePhoneInput as jest.Mock).mockReturnValue({ handlePhoneInput: jest.fn(), hasError: true });
    render(<ContactForm onSubmit={onSubmit} />);

    const textboxes = screen.getAllByRole('textbox');
    if (textboxes.length !== 4) {
      throw new Error(`Expected 4 textboxes (name, email, phone, message) but found ${textboxes.length}.`);
    }

    expect(screen.getByLabelText('Імя')).toBeInTheDocument();
    expect(screen.getByLabelText('Електронна адреса (email) *')).toBeInTheDocument();
    expect(screen.getByLabelText('Номер телефону')).toBeInTheDocument();
    expect(screen.getByLabelText('Ваше повідомлення *')).toBeInTheDocument();
  });

  it('should render a checkbox with privacy policy link', () => {
    render(<ContactForm onSubmit={onSubmit} />);
    const checkbox = screen.queryByRole('checkbox');
    if (!checkbox) {
      throw new Error('Expected a checkbox to be present.');
    }

    const link = screen.queryByRole('link', {
      name: /Політикою конфіденційності/i
    });
    if (!link) {
      throw new Error('Expected a privacy policy link to be present.');
    }
    expect(link).toHaveAttribute('href', ROUTES.PRIVACY_POLICY);
  });

  it('should render a submit button', () => {
    render(<ContactForm onSubmit={onSubmit} />);
    const submit = screen.queryByRole('button', { name: /Надіслати запит/i });
    expect(submit).toBeInTheDocument();
  });

  it('should call handleBlur when input is blurred', async () => {
    render(<ContactForm onSubmit={onSubmit} />);
    const user = userEvent.setup();
    const nameInput = screen.getByLabelText('Імя');

    await user.click(nameInput);
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('nameRequired')).toBeInTheDocument();
    });
  });

  it('should call handleClose when the close button is clicked in modal after successful validation', async () => {
    const user = userEvent.setup();
    render(<ContactForm onSubmit={onSubmit} />);
    fillInput('Імя', 'Vlad');
    fillInput('Електронна адреса (email) *', 'v@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));
    submitForm();

    const closeModalButton = await screen.findByTestId('fake-close-modal-trigger');
    expect(closeModalButton).toBeInTheDocument();

    await user.click(closeModalButton);
    await waitFor(() => {
      expect(screen.queryByTestId('fake-close-modal-trigger')).not.toBeInTheDocument();
    });

    const checkbox = screen.queryByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('should show errors when incorrect inputs', async () => {
    (useHandlePhoneInput as jest.Mock).mockReturnValue({ handlePhoneInput: jest.fn(), hasError: true });
    render(<ContactForm onSubmit={onSubmit} />);
    fillInput('Імя', 'A');
    fillInput('Електронна адреса (email) *', 'test@');
    fillInput('Номер телефону', '531632');
    fillInput('Ваше повідомлення *', 'Привіт');
    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Імʼя має містити щонайменше 2 символи')).toBeInTheDocument();
      expect(screen.getByText('Введіть коректну email-адресу')).toBeInTheDocument();
      expect(screen.getByText('Перевірте формат номера телефону')).toBeInTheDocument();
      expect(screen.getByText('Напишіть кілька слів у повідомленні')).toBeInTheDocument();
    });
  });

  it('should call onSubmit callback when submit button is clicked', async () => {
    render(<ContactForm onSubmit={onSubmit} />);
    fillInput('Імя', 'Vlad');
    fillInput('Електронна адреса (email) *', 'v@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: /Надіслати запит/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should normalize when mask chars already present', async () => {
    render(<ContactForm onSubmit={onSubmit} />);
    const submitBtn = screen.getByRole('button', { name: /Надіслати запит/i });
    const form = submitBtn.closest('form') as HTMLFormElement;
    if (!form) throw new Error('Form element not found');

    fillInput('Імя', 'Kate');
    fillInput('Електронна адреса (email) *', 'k@mail.com');
    fillInput('Номер телефону', '+380 (63) 116-4627');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.submit(form);

    await waitFor(() => {
      expect((screen.getByLabelText('Номер телефону') as HTMLInputElement).value).toBe('+380 (63) 116-4627');
    });

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const payload = (onSubmit as jest.Mock).mock.calls[0][0];
    expect(payload.phoneNumber).toBe('+380631164627');
  });

  it('should NOT call onSubmit when phone number is incomplete but not empty', async () => {
    (useHandlePhoneInput as jest.Mock).mockReturnValue({ handlePhoneInput: jest.fn(), hasError: true });
    render(<ContactForm onSubmit={onSubmit} />);
    const submitBtn = screen.getByRole('button', { name: /Надіслати запит/i });
    const form = submitBtn.closest('form') as HTMLFormElement;
    if (!form) throw new Error('Form element not found');

    fillInput('Імя', 'Kate');
    fillInput('Електронна адреса (email) *', 'k@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    fillInput('Номер телефону', '+380 (63) 116-46');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Перевірте формат номера телефону')).toBeInTheDocument();
    });

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0));
  });

  it('renders submit button with medium size on mobile/tablet breakpoints', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true, isTablet: false });
    render(<ContactForm onSubmit={onSubmit} />);

    expect(screen.getByTestId('submit-button')).toHaveAttribute('data-size', 'medium');
  });

  it('renders submit button with large size on desktop', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false, isTablet: false });
    render(<ContactForm onSubmit={onSubmit} />);

    expect(screen.getByTestId('submit-button')).toHaveAttribute('data-size', 'large');
  });

  it('should show max length message when name reaches 50 characters', async () => {
    render(<ContactForm onSubmit={onSubmit} />);
    fillInput('Імя', 'A'.repeat(50));
    await waitFor(() => {
      expect(screen.getByText('Імʼя не може перевищувати 50 символів')).toBeInTheDocument();
    });
  });

  it('should show max length message when message reaches 50 characters', async () => {
    render(<ContactForm onSubmit={onSubmit} />);
    fillInput('Ваше повідомлення *', 'A'.repeat(1001));
    await waitFor(() => {
      expect(screen.getByText('Повідомлення не може перевищувати 1000 символів')).toBeInTheDocument();
    });
  });
});
