'use client';

import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import ModalComponent from '~/components/modal-component/ModalComponent';
import PaperComponent from '~/components/paper-component/PaperComponent';
import { SvgImage } from '~/components/svg-image/SvgImage';
import { IconButton } from '~/ds-components/icon-button/IconButton';

import GetNotesForm from '../forms/get-notes-form/GetNotesForm';
import { styles } from './GetNotesModal.styles';
import NotesConfirmModal from './notes-confirmation-modal/NotesConfirmModal';
import NotesListModal from './notes-list-modal/NotesListModal';
import { IconButtonVariant } from '~/types/enums/common.enums';
import { GetNotesState } from '~/types/enums/getNotes.enums';

import { MusicItem } from '~/domain/entities/artistry.entity';
import { commonSx } from '~/shared/styles/commonSx';

export type GetNotesModalProps = {
  composition: string;
  notes: MusicItem[];
  opened: boolean;
  handleClose: () => void;
};

const GetNotesModal = ({ composition, notes, opened, handleClose }: GetNotesModalProps) => {
  const t = useTranslations('getNotes');
  const [state, setState] = useState(GetNotesState.LIST);

  useEffect(() => {
    if (opened) {
      setState(GetNotesState.LIST);
    }
  }, [opened]);

  let title = null;
  let innards = null;

  switch (state) {
    case GetNotesState.LIST:
      title = (
        <Typography variant="h2" sx={{ fontSize: commonSx.layout.typography.heroTitle }}>
          {t('notesList.title')}
        </Typography>
      );
      innards = (
        <NotesListModal composition={composition} notes={notes} paidNotesHandler={() => setState(GetNotesState.FORM)} />
      );
      break;
    case GetNotesState.FORM:
      title = (
        <Box data-testid="GetNotesModal" sx={{ mb: '8px' }}>
          <Typography
            variant="h4"
            sx={{ mb: 2, textTransform: 'uppercase', fontSize: commonSx.layout.typography.sectionTitle }}
          >
            {t('form.title')}
          </Typography>
          <Typography
            data-testid="GetNotesModal-subtitle"
            variant="subtitle1"
            sx={{
              textIndent: { xs: 'calc(50% - 100px)', md: 'calc(50% - 50px)' },
              display: 'block',
              fontSize: commonSx.layout.typography.bodyMedium
            }}
          >
            {t('form.subtitle')}
          </Typography>
        </Box>
      );
      innards = <GetNotesForm onSuccess={() => setState(GetNotesState.CONFIRM)} />;
      break;
    case GetNotesState.CONFIRM:
      innards = (
        <NotesConfirmModal
          title={t('confirmation.title')}
          subtitle={t('confirmation.subtitle')}
          btnText={t('confirmation.btnText')}
          onSubmit={handleClose}
        />
      );
      break;
  }

  const paper = () => (
    <PaperComponent sx={styles.paper(state)}>
      <Box sx={{ position: 'sticky' }}>{title}</Box>
      <Box sx={styles.scrollContainer(state)}>{innards}</Box>
    </PaperComponent>
  );

  return (
    <ModalComponent open={opened} onClose={handleClose} sx={styles.backdrop} disableRestoreFocus>
      <Box sx={{ position: 'relative' }}>
        <IconButton sx={styles.closeIcon(state)} type={IconButtonVariant.icon} size="large" onClick={handleClose}>
          <SvgImage src="/icons/x.svg" alt="Close" width={30} height={30} />
        </IconButton>
        {paper()}
      </Box>
    </ModalComponent>
  );
};

export default GetNotesModal;
