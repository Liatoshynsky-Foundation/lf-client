import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { styles } from './NoteListItem.styles';
import { Notes } from '~/types/types/getNotes.types';

type NotesListItemProps = {
  note: Notes;
  buttonText: 'freeNotesButton' | 'paidNotesButton';
  endIcon: React.ReactNode;
  handler?: () => void;
};

const NotesListItem = ({ note, buttonText, handler, endIcon }: NotesListItemProps) => {
  const t = useTranslations('getNotes.notesList');

  const title = note.url.split('/').pop()?.split('.')[0];
  const date = new Date(note.dateUploaded).toLocaleDateString();

  const buttonComponent = (
    <Button variant="outlined" endIcon={endIcon} onClick={handler}>
      {t(buttonText)}
    </Button>
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.notesTitleContainer}>
        <SvgImage src={'/icons/frame.svg'} alt={title ?? 'file-icon'} width={25} height={25} />
        <Typography sx={styles.notesTitle} variant="customMedium16">
          {title}
        </Typography>
      </Box>
      <Typography variant="customMedium16">{date}</Typography>
      {note.isFree ? (
        <a href={note.url} target="_blank" rel="noopener noreferrer">
          {buttonComponent}
        </a>
      ) : (
        buttonComponent
      )}
    </Box>
  );
};

export default NotesListItem;
