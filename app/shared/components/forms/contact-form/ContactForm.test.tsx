import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { ROUTES } from '../../constants/routes';
import ContactForm from './ContactForm';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

jest.mock('public/icons/info-error.svg', () => {
  return function InfoErrorIcon() {
    return <span data-testid="info-error-icon">info-error</span>;
  };
});

jest.mock('next-intl', () => ({
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
      nameMaxLength: 'Довжина імені не може перевищувати 50 символів',
      messageMaxLength: 'Довжина повідомлення не може перевищувати 1000 символів',
      emailRequired: 'Будь ласка, вкажіть вашу електронну адресу',
      emailInvalid: 'Введіть коректну email-адресу',
      phoneNumberInvalid: 'Перевірте формат номера телефону',
      messageMinLength: 'Напишіть кілька слів у повідомленні',
      policyRequired: 'Щоб продовжити, потрібно дати згоду'
    };
    return messages[key] || key;
  }
}));

jest.mock('~/i18n/navigation', () => ({
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({ isMobile: false, isTablet: false }))
}));

const fillInput = (label: string, value: string) => {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
};

const submitForm = () => {
  const buttons = screen.getAllByRole('button', { name: /Надіслати запит/i });
  fireEvent.click(buttons[0]);
};

const onSubmit = jest.fn();

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(<ContactForm onSubmit={onSubmit} />);
  });

  it('should contain four text inputs including a multiline message field', () => {
    const textboxes = screen.getAllByRole('textbox');
    expect(textboxes).toHaveLength(4);

    expect(screen.getByLabelText('Імя')).toBeInTheDocument();
    expect(screen.getByLabelText('Електронна адреса (email) *')).toBeInTheDocument();
    expect(screen.getByLabelText('Номер телефону')).toBeInTheDocument();
    expect(screen.getByLabelText('Ваше повідомлення *')).toBeInTheDocument();
  });

  it('should render a checkbox with privacy policy link', () => {
    expect(screen.getByRole('checkbox')).toBeInTheDocument();

    const link = screen.getByRole('link', {
      name: /Політикою конфіденційності/i
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.PRIVACY_POLICY);
  });

  it('should render a submit button', () => {
    const submit = screen.getByRole('button', { name: /Надіслати запит/i });
    expect(submit).toBeInTheDocument();
  });

  it('should show errors when incorrect inputs', async () => {
    fillInput('Імя', 'A');
    fillInput('Електронна адреса (email) *', 'test@');
    fillInput('Номер телефону', '531632');
    fillInput('Ваше повідомлення *', 'A');
    submitForm();

    await waitFor(() => {
      expect(screen.getByText('Імʼя має містити щонайменше 2 символи')).toBeInTheDocument();
      expect(screen.getByText('Введіть коректну email-адресу')).toBeInTheDocument();
      expect(screen.getByText('Перевірте формат номера телефону')).toBeInTheDocument();
      expect(screen.getByText('Напишіть кілька слів у повідомленні')).toBeInTheDocument();
    });
  });

  it('should call onSubmit callback when submit button is clicked', async () => {
    fillInput('Імя', 'Vlad');
    fillInput('Електронна адреса (email) *', 'v@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    submitForm();

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should normalize when mask chars already present', async () => {
    const submitBtn = screen.getByRole('button', { name: /Надіслати запит/i });
    const form = submitBtn.closest('form');
    expect(form).toBeInTheDocument();

    fillInput('Імя', 'Kate');
    fillInput('Електронна адреса (email) *', 'k@mail.com');
    fillInput('Номер телефону', '+380 (63) 116-4627');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    if (form) fireEvent.submit(form);

    await waitFor(() => {
      expect((screen.getByLabelText('Номер телефону') as HTMLInputElement).value).toBe('+380 (63) 116-4627');
    });

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
    const payload = (onSubmit as jest.Mock).mock.calls[0][0];
    expect(payload.phoneNumber).toBe('+380631164627');
  });

  it('should NOT call onSubmit when phone number is incomplete but not empty', async () => {
    const submitBtn = screen.getByRole('button', { name: /Надіслати запит/i });
    const form = submitBtn.closest('form');
    expect(form).toBeInTheDocument();

    fillInput('Імя', 'Kate');
    fillInput('Електронна адреса (email) *', 'k@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    fillInput('Номер телефону', '+380 (63) 116-46');

    if (form) fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText('Перевірте формат номера телефону')).toBeInTheDocument();
    });

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(0));
  });
  it('should close modal and reset form when confirmation modal is closed', async () => {
    fillInput('Імя', 'Vlad');
    fillInput('Електронна адреса (email) *', 'v@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    submitForm();

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));

    const closeButton = await screen.findByRole('button', { name: 'btnText' });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect((screen.getByLabelText('Імя') as HTMLInputElement).value).toBe('');
    });
  });

  it('should normalize extra spaces in name field on blur', () => {
    const nameInput = screen.getByLabelText('Імя') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: '  Vlad   Ivanov  ' } });
    fireEvent.blur(nameInput);

    expect(nameInput.value).toBe('Vlad Ivanov');
  });

  it('should show max length message when name reaches 50 characters', () => {
    const nameInput = screen.getByLabelText('Імя') as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'A'.repeat(50) } });

    expect(screen.getByText('Довжина імені не може перевищувати 50 символів')).toBeInTheDocument();
  });

  it('should show max length message when message reaches 1000 characters', () => {
    const messageInput = screen.getByLabelText('Ваше повідомлення *') as HTMLTextAreaElement;
    fireEvent.change(messageInput, { target: { value: 'a'.repeat(1000) } });

    expect(messageInput.value).toHaveLength(1000);
    expect(screen.getByText('Довжина повідомлення не може перевищувати 1000 символів')).toBeInTheDocument();
  });
});

describe('ContactForm Responsive', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should apply medium button size on mobile', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true, isTablet: false });
    render(<ContactForm onSubmit={jest.fn()} />);

    const submit = screen.getByRole('button', { name: /Надіслати запит/i });
    expect(submit).toBeInTheDocument();
  });

  it('should apply medium button size on tablet', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false, isTablet: true });
    render(<ContactForm onSubmit={jest.fn()} />);

    const submit = screen.getByRole('button', { name: /Надіслати запит/i });
    expect(submit).toBeInTheDocument();
  });
});
