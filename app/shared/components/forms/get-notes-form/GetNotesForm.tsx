'use client';

import { Box, Typography } from '@mui/material';

import ContactForm from '~/shared/components/forms/contact-form/ContactForm';
import { useContactForm } from '~/shared/hooks/use-contact-form/useContactForm';

interface GetNotesFormProps {
  onSuccess?: () => void;
}

export default function GetNotesForm({ onSuccess }: Readonly<GetNotesFormProps>) {
  const { errorMessage, handleSubmit, isSubmitting } = useContactForm({ onSuccess, formType: 'Notes' });

  return (
    <>
      <ContactForm onSubmit={handleSubmit} disabled={isSubmitting} />
      {errorMessage && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography color="error" variant="body2" sx={{ fontWeight: 'bold' }}>
            {errorMessage}
          </Typography>
        </Box>
      )}
    </>
  );
}
