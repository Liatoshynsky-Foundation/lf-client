'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import InfoErrorIcon from 'public/icons/info-error.svg';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '~/ds-components/button/Button';

import { styles } from './ContactForm.styles';

import { Link } from '~/i18n/navigation';
import { normalizePhoneNumberFromMask } from '~/lib/utils/normalizePhoneNumberFromMask';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useHandlePhoneInput } from '~/shared/hooks/use-handle-phone-input/useHandlePhoneInput';

type ContactFormProps = {
  onSubmit: (data: { name: string; email: string; message: string; policy: true; phoneNumber?: string }) => void;
};

function ContactForm({ onSubmit }: Readonly<ContactFormProps>) {
  const t = useTranslations('contactForm');
  const tErrors = useTranslations('contactForm.errors');
  const { isMobile, isTablet } = useBreakpoints();
  const { handlePhoneInput, hasError } = useHandlePhoneInput();
  const phoneInputRef = useRef<HTMLInputElement | null>(null);

  const phoneSchema = z
    .string()
    .trim()
    .pipe(
      z.union([
        z.literal(''),
        z.string().transform((value) => {
          if (hasError) return;
          return normalizePhoneNumberFromMask(value);
        })
      ])
    );

  const schema = z.object({
    name: z.string().min(2, tErrors('nameMinLength')),
    email: z.string().email(tErrors('emailInvalid')),
    phoneNumber: phoneSchema.optional(),
    message: z.string().trim().min(15, tErrors('messageMinLength')),
    policy: z.literal(true, { errorMap: () => ({ message: tErrors('policyRequired') }) })
  });

  type ContactFormInput = z.input<typeof schema>;

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ContactFormInput>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const phoneField = register('phoneNumber');

  const onValid = (data: ContactFormInput) => {
    if (hasError) return;
    onSubmit(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onValid)}>
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
        <TextField
          label={t('phoneNumber')}
          {...phoneField}
          inputRef={phoneInputRef}
          onChange={(e) => {
            phoneField.onChange(e);
            handlePhoneInput(e.target.value, phoneInputRef.current);
          }}
          error={!!errors.phoneNumber || hasError}
          helperText={errors.phoneNumber?.message || (hasError ? tErrors('phoneNumberInvalid') : '')}
        />
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
                  },
                  alignSelf: 'flex-start'
                }}
              />
            }
            label={
              <Box>
                <Typography variant="customItalic14" sx={styles.confidentialPolicyText}>
                  {t('policyText')} <Link href="/privacy-policy">{t('policyLink')}</Link>
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

      <Button
        type="submit"
        size={isMobile || isTablet ? 'medium' : 'large'}
        variant="contained"
        color="tertiary"
        sx={styles.requestButton}
      >
        {t('buttonText')}
      </Button>
    </Box>
  );
}

export default ContactForm;
