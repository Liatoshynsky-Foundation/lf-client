import { Box, Checkbox, TextField, Typography } from '@mui/material';

import Button from '../../design-system/all-components/button/Button';
import { styles } from './ContactForm.styles';

import { Link } from '~/i18n/navigation';

interface IContactFormProps {
  title: string;
  subTitle: string;
}

function ContactForm({ title, subTitle }: IContactFormProps) {
  return (
    <Box sx={styles.wrapper}>
      <Typography variant="h4" sx={styles.formTitle}>
        {title}
      </Typography>
      <Typography variant="subtitle1" sx={styles.formSubtitle}>
        {subTitle}
      </Typography>
      <Typography variant="customItalic14" sx={styles.formWarning}>
        * – поля обов’язкові до заповнення
      </Typography>
      <Box sx={styles.textFieldsContainer}>
        <TextField placeholder="Ім'я *" />
        <TextField placeholder="Електронна адреса (email) *" />
        <TextField placeholder="Номер телефону" />
        <TextField sx={styles.textArea} multiline rows={4} placeholder="Ваше повідомлення *" />
      </Box>
      <Box sx={styles.confidentialPolicyContainer}>
        <Checkbox />
        <Typography variant="customItalic14" sx={styles.confidentialPolicyText}>
          Я даю згоду на обробку моїх персональних даних та погоджуюся з{' '}
          <Link href="#">Політикою конфіденційності</Link>
        </Typography>
      </Box>
      <Button size="large" variant="contained" color="tertiary" sx={styles.requestButton}>
        Надіслати запит
      </Button>
    </Box>
  );
}

export default ContactForm;
