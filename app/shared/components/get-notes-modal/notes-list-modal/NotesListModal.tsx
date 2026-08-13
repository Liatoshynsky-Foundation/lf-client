import { Box, Typography } from '@mui/material';
import React from 'react';

import NotesListItem from './note-list-item/NoteListItem';
import { styles } from './NotesListModal.styles';
import { Notes } from '~/types/types/getNotes.types';

import ArrowUpRightIcon from '~/public/icons/arrow-up-right.svg';
import MessagesSquareIcon from '~/public/icons/messages-square.svg';

type NotesListModalProps = {
  composition: string;
  notes: Notes[];
  paidNotesHandler: () => void;
};

const NotesListModal = ({ composition, notes, paidNotesHandler }: NotesListModalProps) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.typography}>{composition}</Typography>
      {notes.map((note, index) => (
        <NotesListItem
          key={note.dateUploaded + index}
          note={note}
          endIcon={
            note.isFree ? <ArrowUpRightIcon width={20} height={20} /> : <MessagesSquareIcon width={20} height={20} />
          }
          handler={!note.isFree ? paidNotesHandler : undefined}
          buttonText={note.isFree ? 'freeNotesButton' : 'paidNotesButton'}
        />
      ))}
      {notes.length === 0 && (
        <NotesListItem
          key="empty-notes-contact"
          note={{ isFree: false, url: '', dateUploaded: new Date().toISOString() }}
          endIcon={<MessagesSquareIcon width={20} height={20} />}
          handler={paidNotesHandler}
          buttonText="paidNotesButton"
        />
      )}
    </Box>
  );
};

export default NotesListModal;
