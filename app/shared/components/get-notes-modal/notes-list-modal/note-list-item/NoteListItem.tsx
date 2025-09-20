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
  handler: () => void;
};

const NotesListItem = ({ note, buttonText, handler, endIcon }: NotesListItemProps) => {
  const t = useTranslations('getNotes.notesList');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.notesTitleContainer}>
        <SvgImage src={'/icons/frame.svg'} alt={note.title} width={25} height={25} />
        <Typography sx={styles.notesTitle} variant="customMedium16">
          {note.title}
        </Typography>
      </Box>
      <Typography variant="customMedium16">{note.date}</Typography>
      <Button variant="outlined" endIcon={endIcon} onClick={handler}>
        {t(buttonText)}
      </Button>
    </Box>
  );
};

export default NotesListItem;
