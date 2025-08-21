import { Box, Checkbox, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

import Button from '~/ds-components/button/Button';

import { styles } from './ContactForm.styles';

import { Link } from '~/i18n/navigation';

function ContactForm() {
  const t = useTranslations('contactForm');

  return (
    <Box sx={styles.wrapper}>
      <Typography variant="customItalic14" sx={styles.formWarning}>
        {t('requiredFields')}
      </Typography>
      <Box sx={styles.textFieldsContainer}>
        <TextField label={t('name')} />
        <TextField label={t('email')} />
        <TextField label={t('phoneNumber')} />
        <TextField sx={styles.textArea} multiline rows={4} label={t('message')} />
      </Box>
      <Box sx={styles.confidentialPolicyContainer}>
        <Checkbox />
        <Typography variant="customItalic14" sx={styles.confidentialPolicyText}>
          {t('policyText')} <Link href="#">{t('policyLink')}</Link>
        </Typography>
      </Box>
      <Button size="large" variant="contained" color="tertiary" sx={styles.requestButton}>
        {t('buttonText')}
      </Button>
    </Box>
  );
}

export default ContactForm;
