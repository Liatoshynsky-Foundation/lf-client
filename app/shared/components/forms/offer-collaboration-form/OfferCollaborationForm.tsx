'use client';

import { Box, SxProps, Theme, Typography } from '@mui/material';
import { useState } from 'react';

import { styles } from './OfferCollaborationForm.styles';

import ContactForm from '~/shared/components/forms/contact-form/ContactForm';
import PaperComponent from '~/shared/components/paper-component/PaperComponent';

interface OfferCollaborationFormProps {
  formTitle?: string;
  formSubtitle?: string;
  sx?: SxProps<Theme>;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  policy: boolean;
  phoneNumber?: string;
}

export default function OfferCollaborationForm({ formTitle, formSubtitle, sx }: Readonly<OfferCollaborationFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await fetch('/api/collaboration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const message =
          response.status === 429 ? 'Забагато запитів. Спробуйте пізніше.' : 'Помилка відправки. Спробуйте ще раз.';
        setErrorMessage(message);
        throw new Error(message);
      }
    } catch (error) {
      setErrorMessage((prev) => prev || 'Сталася помилка з’єднання. Перевірте інтернет.');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PaperComponent sx={{ ...sx }} data-testid="OfferCollaborationForm">
      <Typography sx={styles.formTitle} variant="h5" data-testid="OfferCollaborationForm-formTitle">
        {formTitle}
      </Typography>
      <Typography sx={styles.formSubtitle} variant="subtitle1" data-testid="OfferCollaborationForm-formSubtitle">
        {formSubtitle}
      </Typography>
      <ContactForm onSubmit={handleSubmit} disabled={isSubmitting} />
      {errorMessage && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography color="error" variant="body2" sx={{ fontWeight: 'bold' }}>
            {errorMessage}
          </Typography>
        </Box>
      )}
    </PaperComponent>
  );
}
