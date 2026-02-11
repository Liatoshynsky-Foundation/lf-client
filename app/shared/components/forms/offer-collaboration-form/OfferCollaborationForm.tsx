'use client';

import { SxProps, Theme, Typography } from '@mui/material';
import { useState } from 'react';

import ContactForm from '~/components/forms/contact-form/ContactForm';

import PaperComponent from '../../paper-component/PaperComponent';
import { styles } from './OfferCollaborationForm.styles';

interface OfferCollaborationFormProps {
  formTitle?: string;
  formSubtitle?: string;
  sx?: SxProps<Theme>;
}

export default function OfferCollaborationForm({ formTitle, formSubtitle, sx }: Readonly<OfferCollaborationFormProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    name: string;
    email: string;
    message: string;
    policy: boolean;
    phoneNumber?: string;
  }) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/collaboration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          message: data.message
        })
      });

      const result = await response.json();

      if (!response.ok) {
        // eslint-disable-next-line no-console
        console.error('Failed to submit collaboration request:', result.errors);
        throw new Error('Failed to submit collaboration request');
      }

      if (result.previewUrl) {
        // eslint-disable-next-line no-console
        console.log('Email preview URL:', result.previewUrl);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error submitting collaboration request:', error);
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
