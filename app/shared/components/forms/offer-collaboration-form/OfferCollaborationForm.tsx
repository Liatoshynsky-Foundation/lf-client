'use client';

import { Box, SxProps, Theme, Typography } from '@mui/material';

import { styles } from './OfferCollaborationForm.styles';

import ContactForm from '~/shared/components/forms/contact-form/ContactForm';
import PaperComponent from '~/shared/components/paper-component/PaperComponent';
import { useContactForm } from '~/shared/hooks/use-contact-form/useContactForm';

interface OfferCollaborationFormProps {
  formTitle?: string;
  formSubtitle?: string;
  sx?: SxProps<Theme>;
}

export default function OfferCollaborationForm({ formTitle, formSubtitle, sx }: Readonly<OfferCollaborationFormProps>) {
  const { errorMessage, handleSubmit, isSubmitting } = useContactForm({ formType: 'Collaboration' });

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
