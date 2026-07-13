import { useState } from 'react';

import { ApiRoutes } from '~/constants/routes/api-routes';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  policy: boolean;
  phoneNumber?: string;
}

interface UseContactFormProps {
  onSuccess?: () => void;
  formType?: string;
}

export const useContactForm = ({ onSuccess, formType }: UseContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await fetch(ApiRoutes.CONTACT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, formType })
      });

      if (!response.ok) {
        const message =
          response.status === 429 ? 'Забагато запитів. Спробуйте пізніше.' : 'Помилка відправки. Спробуйте ще раз.';
        setErrorMessage(message);
        throw new Error(message);
      }
      if (onSuccess) onSuccess();
    } catch (error) {
      setErrorMessage((prev) => prev || 'Сталася помилка з’єднання. Перевірте інтернет.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, errorMessage };
};
