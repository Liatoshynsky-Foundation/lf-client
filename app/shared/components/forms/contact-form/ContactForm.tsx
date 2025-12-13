'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Checkbox, FormControl, FormControlLabel, FormHelperText, TextField, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import InfoErrorIcon from 'public/icons/info-error.svg';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import NotesConfirmModal from '~/components/get-notes-modal/notes-confirmation-modal/NotesConfirmModal';
import ModalComponent from '~/components/modal-component/ModalComponent';
import Button from '~/ds-components/button/Button';

import PaperComponent from '../../paper-component/PaperComponent';
import { styles } from './ContactForm.styles';

import { Link } from '~/i18n/navigation';
import { normalizePhoneNumberFromMask } from '~/lib/utils/normalizePhoneNumberFromMask';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';
import { useHandlePhoneInput } from '~/shared/hooks/use-handle-phone-input/useHandlePhoneInput';

const AUTO_HIDE_MESSAGE_TIMEOUT = 3000;

type ContactFormProps = {
  onSubmit: (data: { name: string; email: string; message: string; policy: true; phoneNumber?: string }) => void;
};

function ContactForm({ onSubmit }: Readonly<ContactFormProps>) {
  const t = useTranslations('contactForm');
  const tErrors = useTranslations('contactForm.errors');
  const tConfirmation = useTranslations('contactForm.confirmation');
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
    name: z
      .string()
      .trim()
      .min(1, tErrors('nameRequired'))
      .min(2, tErrors('nameMinLength'))
      .max(50, tErrors('nameMaxLength')),
    email: z.string().min(1, tErrors('emailRequired')).email(tErrors('emailInvalid')),
    phoneNumber: phoneSchema.optional(),
    message: z
      .string()
      .trim()
      .min(1, tErrors('messageRequired'))
      .min(10, tErrors('messageMinLength'))
      .max(1000, tErrors('messageMaxLength')),
    policy: z.literal(true, { errorMap: () => ({ message: tErrors('policyRequired') }) })
  });

  type ContactFormInput = z.input<typeof schema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch
  } = useForm<ContactFormInput>({
    resolver: zodResolver(schema),
    mode: 'onChange'
  });

  const phoneField = register('phoneNumber');

  const nameLength = watch('name')?.length || 0;
  const messageLength = watch('message')?.length || 0;

  const isNameAtMaxLength = nameLength >= 50;
  const isMessageAtMaxLength = messageLength >= 1000;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNameMaxMessage, setShowNameMaxMessage] = useState(false);
  const [showMessageMaxMessage, setShowMessageMaxMessage] = useState(false);

  useEffect(() => {
    if (isNameAtMaxLength) {
      setShowNameMaxMessage(true);
      const timer = setTimeout(() => {
        setShowNameMaxMessage(false);
      }, AUTO_HIDE_MESSAGE_TIMEOUT);
      return () => clearTimeout(timer);
    } else {
      setShowNameMaxMessage(false);
    }
  }, [isNameAtMaxLength]);

  useEffect(() => {
    if (isMessageAtMaxLength) {
      setShowMessageMaxMessage(true);
      const timer = setTimeout(() => {
        setShowMessageMaxMessage(false);
      }, AUTO_HIDE_MESSAGE_TIMEOUT);
      return () => clearTimeout(timer);
    } else {
      setShowMessageMaxMessage(false);
    }
  }, [isMessageAtMaxLength]);

  const onValid = (data: ContactFormInput) => {
    if (hasError) return;
    onSubmit(data);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onValid)}>
        <Typography variant="customItalic14" sx={styles.formWarning}>
          {t('requiredFields')}
        </Typography>
        <Box sx={styles.textFieldsContainer}>
          <TextField
            label={t('name')}
            {...register('name')}
            error={!!errors.name || (isNameAtMaxLength && showNameMaxMessage)}
            helperText={
              errors.name?.message || (isNameAtMaxLength && showNameMaxMessage ? tErrors('nameMaxLength') : '')
            }
            inputProps={{ maxLength: 50 }}
          />
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
            error={!!errors.message || (isMessageAtMaxLength && showMessageMaxMessage)}
            helperText={
              errors.message?.message ||
              (isMessageAtMaxLength && showMessageMaxMessage ? tErrors('messageMaxLength') : '')
            }
            inputProps={{ maxLength: 1000 }}
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

      <ModalComponent
        open={isModalOpen}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <PaperComponent
          sx={{
            maxWidth: { xs: '100vw', sm: '400px', md: '500px' },
            padding: { xs: '40px 24px', md: '60px 50px' }
          }}
        >
          <NotesConfirmModal
            title={tConfirmation('title')}
            subtitle={tConfirmation('subtitle')}
            btnText={tConfirmation('btnText')}
            onSubmit={handleCloseModal}
          />
        </PaperComponent>
      </ModalComponent>
    </>
  );
}

export default ContactForm;
