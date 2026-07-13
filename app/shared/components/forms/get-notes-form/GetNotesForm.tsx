'use client';

import ContactForm from '~/shared/components/forms/contact-form/ContactForm';
import FormError from '~/shared/components/forms/form-error/FormError';
import { useContactForm } from '~/shared/hooks/use-contact-form/useContactForm';

interface GetNotesFormProps {
  onSuccess?: () => void;
}

export default function GetNotesForm({ onSuccess }: Readonly<GetNotesFormProps>) {
  const { errorMessage, handleSubmit, isSubmitting } = useContactForm({ onSuccess, formType: 'Notes' });

  return (
    <>
      <ContactForm onSubmit={handleSubmit} disabled={isSubmitting} />
      {errorMessage && <FormError errorMessage={errorMessage} />}
    </>
  );
}
