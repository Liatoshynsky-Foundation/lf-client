'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import InfoErrorIcon from 'public/icons/info-error.svg';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '~/ds-components/button/Button';

import { styles } from './ContactForm.styles';

import { Link } from '~/i18n/navigation';

function ContactForm() {
  const t = useTranslations('contactForm');
  const tErrors = useTranslations('contactForm.errors');

  const schema = z.object({
    name: z.string().min(2, tErrors('nameMinLength')),
    email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
    phoneNumber: z.string().optional(),
    message: z.string().trim().min(15, tErrors('messageMinLength')),
    policy: z.boolean().refine((val) => val === true, tErrors('policyRequired'))
  });

  type ContactFormValues = z.infer<typeof schema>;

  const {
    register,
    formState: { errors }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  return (
    <Box component="form">
      <Typography variant="customItalic14" sx={styles.formWarning}>
        {t('requiredFields')}
      </Typography>
      <Box sx={styles.textFieldsContainer}>
        <TextField label={t('name')} {...register('name')} error={!!errors.name} helperText={errors.name?.message} />
        <TextField
          label={t('email')}
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField label={t('phoneNumber')} {...register('phoneNumber')} />
        <TextField
          sx={styles.textArea}
          multiline
          rows={4}
          label={t('message')}
          {...register('message')}
          error={!!errors.message}
          helperText={errors.message?.message}
        />
      </Box>
      <Box sx={styles.confidentialPolicyContainer}>
        <FormControl error={!!errors.policy}>
          <FormControlLabel
            control={
              <Checkbox
                {...register('policy')}
                sx={{
                  color: errors.policy ? 'error.main' : undefined,
                  '&.Mui-checked': {
                    color: errors.policy ? 'error.main' : 'primary.main'
                  }
                }}
              />
            }
            label={
              <Box>
                <Typography variant="customItalic14" sx={styles.confidentialPolicyText}>
                  {t('policyText')} <Link href="#">{t('policyLink')}</Link>
                </Typography>
                {errors.policy && (
                  <FormHelperText sx={styles.checkboxError}>
                    <InfoErrorIcon />
                    {errors.policy.message}
                  </FormHelperText>
                )}
              </Box>
            }
          />
        </FormControl>
      </Box>
      <Button size="large" variant="contained" color="tertiary" type="submit" sx={styles.requestButton}>
        {t('buttonText')}
      </Button>
    </Box>
  );
}

export default ContactForm;
