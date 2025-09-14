import { Box } from '@mui/material';
import React from 'react';

import NotesListItem from './note-list-item/NoteListItem';
import { styles } from './NotesListModal.styles';
import { Notes } from '~/types/types/getNotes.types';

import Eye from '~/public/icons/eye.svg';
import Chat from '~/public/icons/message-square.svg';

type NotesListModalProps = {
  notes: Notes[];
  freeNotesHandler: () => void;
  paidNotesHandler: () => void;
};

const NotesListModal = ({ notes, freeNotesHandler, paidNotesHandler }: NotesListModalProps) => {
  return (
    <Box sx={styles.container}>
      {notes.map((note, index) => (
        <NotesListItem
          key={note.title + index}
          note={note}
          endIcon={note.free ? <Eye /> : <Chat />}
          handler={note.free ? freeNotesHandler : paidNotesHandler}
          buttonText={note.free ? 'freeNotesButton' : 'paidNotesButton'}
        />
      ))}
    </Box>
  );
};

export default NotesListModal;
