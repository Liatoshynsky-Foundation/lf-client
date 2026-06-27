'use client';

import { SxProps, Theme, Typography } from '@mui/material';
import { useState } from 'react';

import { styles } from './OfferCollaborationForm.styles';

import logger from '~/middleware/logger/logger';
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

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/collaboration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        if (response.status === 429) throw new Error('Забагато запитів. Спробуйте пізніше.');
        throw new Error('Помилка відправки');
      }
    } catch (error) {
      logger.error(error);
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
    </PaperComponent>
  );
}
