import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import ContactForm from './ContactForm';

describe('ContactForm', () => {
  const props = {
    title: 'Запропонувати співпрацю',
    subTitle: 'Надішліть запит і ми сконтактуємо з вами протягом кількох робочих днів'
  };

  it('should render title and subtitle', () => {
    render(<ContactForm {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.subTitle)).toBeInTheDocument();
  });

  it('should contain four text inputs including a multiline message field', () => {
    render(<ContactForm {...props} />);

    const textboxes = screen.getAllByRole('textbox');
    if (textboxes.length !== 4) {
      throw new Error(`Expected 4 textboxes (name, email, phone, message) but found ${textboxes.length}.`);
    }

    // eslint-disable-next-line quotes
    expect(screen.getByPlaceholderText("Ім'я *")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Електронна адреса (email) *')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Номер телефону')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ваше повідомлення *')).toBeInTheDocument();
  });

  it('should render a checkbox with privacy policy link', () => {
    render(<ContactForm {...props} />);

    const checkbox = screen.queryByRole('checkbox');
    if (!checkbox) {
      throw new Error('Expected a checkbox to be present.');
    }

    const link = screen.queryByRole('link', { name: /Політикою конфіденційності/i });
    if (!link) {
      throw new Error('Expected a privacy policy link to be present.');
    }
    expect(link).toHaveAttribute('href', '#');
  });

  it('should render a submit button', () => {
    render(<ContactForm {...props} />);

    const submit = screen.queryByRole('button', { name: /Надіслати запит/i });
    if (!submit) {
      throw new Error('Expected a submit button to be present.');
    }
  });
});
