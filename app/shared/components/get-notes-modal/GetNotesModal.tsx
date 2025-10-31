'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import ContactForm from '~/components/forms/contact-form/ContactForm';
import ModalComponent from '~/components/modal-component/ModalComponent';
import PaperComponent from '~/components/paper-component/PaperComponent';
import { SvgImage } from '~/components/svg-image/SvgImage';
import { IconButton } from '~/ds-components/icon-button/IconButton';

import { styles } from './GetNotesModal.styles';
import NotesConfirmModal from './notes-confirmation-modal/NotesConfirmModal';
import NotesListModal from './notes-list-modal/NotesListModal';
import { IconButtonVariant } from '~/types/enums/common.enums';
import { GetNotesState } from '~/types/enums/getNotes.enums';
import { Notes } from '~/types/types/getNotes.types';

type GetNotesModalProps = {
  composition: string;
  notes: Notes[];
  opened: boolean;
  handleClose: () => void;
};

const GetNotesModal = ({ composition, notes, opened, handleClose }: GetNotesModalProps) => {
  const t = useTranslations('getNotes');
  const [state, setState] = useState(GetNotesState.LIST);

  const pNHandler = () => {
    setState(GetNotesState.FORM);
  };

  let title = null;
  let innards = null;

  switch (state) {
    case GetNotesState.LIST:
      title = <Typography variant="h2">{t('notesList.title')}</Typography>;
      innards = <NotesListModal composition={composition} notes={notes} paidNotesHandler={pNHandler} />;
      break;
    case GetNotesState.FORM:
      title = (
        <Box data-testid="GetNotesModal">
          <Typography sx={{ mb: 2, textTransform: 'uppercase' }} variant="h4" data-testid="GetNotesModal-title">
            {t('form.title')}
          </Typography>
          <Typography
            sx={{ textIndent: 'calc(50% - 50px)', display: 'block' }}
            variant="subtitle1"
            data-testid="GetNotesModal-subtitle"
          >
            {t('form.subtitle')}
          </Typography>
        </Box>
      );
      innards = <ContactForm onSubmit={() => setState(GetNotesState.CONFIRM)} />;
      break;
    case GetNotesState.CONFIRM:
      innards = (
        <NotesConfirmModal
          title={t('confirmation.title')}
          subtitle={t('confirmation.subtitle')}
          btnText={t('confirmation.btnText')}
        />
      );
      break;
  }

  const paper = () => (
    <PaperComponent sx={{ ...styles.paper, ...styles.maxWidth(state) }}>
      <Box sx={styles.headerContainer}>
        <IconButton sx={styles.closeIcon} type={IconButtonVariant.icon} size="small" onClick={handleClose}>
          <SvgImage src="/icons/x.svg" alt="Close" width={24} height={24} />
        </IconButton>
        {title}
      </Box>
      {innards}
    </PaperComponent>
  );

  return <ModalComponent open={opened} sx={styles.backdrop} slots={{ paper }} />;
};

export default GetNotesModal;
