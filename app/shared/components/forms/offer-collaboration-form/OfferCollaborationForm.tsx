import { SxProps, Theme, Typography } from '@mui/material';

import ContactForm from '~/components/forms/contact-form/ContactForm';

import PaperComponent from '../../paper-component/PaperComponent';
import { styles } from './OfferCollaborationForm.styles';

export default function OfferCollaborationForm({
  formTitle,
  formSubtitle,
  sx
}: {
  formTitle?: string;
  formSubtitle?: string;
  sx?: SxProps<Theme>;
}) {
  return (
    <PaperComponent sx={{ ...sx }} data-testid="OfferCollaborationForm">
      <Typography sx={styles.formTitle} variant="h5" data-testid="OfferCollaborationForm-formTitle">
        {formTitle}
      </Typography>
      <Typography sx={styles.formSubtitle} variant="subtitle1" data-testid="OfferCollaborationForm-formSubtitle">
        {formSubtitle}
      </Typography>
      <ContactForm onSubmit={() => {}} />
    </PaperComponent>
  );
}
