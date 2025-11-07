import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import ContactForm from './ContactForm';

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

    render(<ContactForm onSubmit={onSubmit} />);
  });

  it('should contain four text inputs including a multiline message field', () => {
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
    expect(link).toHaveAttribute('href', '#');
  });

  it('should render a submit button', () => {
    const submit = screen.queryByRole('button', { name: /Надіслати запит/i });
    if (!submit) {
      throw new Error('Expected a submit button to be present.');
    }
  });

  it('should show errors when incorrect inputs', async () => {
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
    fillInput('Імя', 'Vlad');
    fillInput('Електронна адреса (email) *', 'v@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    fireEvent.click(screen.getByRole('button', { name: /Надіслати запит/i }));

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1));
  });

  it('should normalize when user types with plus and mask chars already present', async () => {
    const submitBtn = screen.getByRole('button', { name: /Надіслати запит/i });

    fillInput('Імя', 'Kate');
    fillInput('Електронна адреса (email) *', 'k@mail.com');
    fillInput('Ваше повідомлення *', 'Досить довге повідомлення');
    fireEvent.click(screen.getByRole('checkbox'));

    fillInput('Номер телефону', '+380 (63) 116-4627');

    const form = submitBtn.closest('form') as HTMLFormElement;
    if (!form) throw new Error('Form element not found');

    fireEvent.submit(form);

    await waitFor(() => {
      const phoneInput = screen.getByLabelText('Номер телефону') as HTMLInputElement;
      expect(phoneInput.value).toMatch(/^\+380/);
    });

    const fd = new FormData(form);
    const storedPhone = fd.get('phoneNumber') as string | null;
    expect(storedPhone).toBe('+380631164627');
  });
});
