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

const createSchema = (tErrors: ReturnType<typeof useTranslations>) => {
  return z.object({
    name: z.string().min(2, tErrors('nameMinLength')),
    email: z.string().email(tErrors('emailInvalid')),
    phoneNumber: z.string().optional(),
    message: z.string().trim().min(15, tErrors('messageMinLength')),
    policy: z.literal(true, { errorMap: () => ({ message: tErrors('policyRequired') }) })
  });
};

type ContactFormSchema = ReturnType<typeof createSchema>;
export type ContactFormInput = z.input<ContactFormSchema>;
export type ContactFormOutput = z.output<ContactFormSchema>;

type ContactFormProps = {
  onSubmit: (data: ContactFormOutput) => void;
};

function ContactForm({ onSubmit }: Readonly<ContactFormProps>) {
  const t = useTranslations('contactForm');
  const tErrors = useTranslations('contactForm.errors');
  const { handlePhoneInput, hasError } = useHandlePhoneInput();
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const hiddenPhoneRef = useRef<HTMLInputElement | null>(null);
  const { isMobile, isTablet } = useBreakpoints();

  const schema = createSchema(tErrors);

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ContactFormInput>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const phoneHiddenReg = register('phoneNumber');

  const onValid = (data: ContactFormOutput) => {
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
          inputRef={phoneInputRef}
          onChange={(e) => {
            handlePhoneInput(e.target.value, phoneInputRef.current);
            const e164 = normalizePhoneNumberFromMask(e.target.value) ?? '';
            if (hiddenPhoneRef.current && hiddenPhoneRef.current.value !== e164) {
              hiddenPhoneRef.current.value = e164;
            }
          }}
          error={!!errors.phoneNumber || hasError}
          helperText={errors.phoneNumber?.message || (hasError ? tErrors('phoneNumberInvalid') : '')}
        />
        <input
          type="hidden"
          {...phoneHiddenReg}
          ref={(el) => {
            phoneHiddenReg.ref(el);
            hiddenPhoneRef.current = el;
          }}
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
