import { Box, Typography } from '@mui/material';
import React from 'react';

import NotesListItem from './note-list-item/NoteListItem';
import { styles } from './NotesListModal.styles';

import { MusicItem } from '~/domain/entities/artistry.entity';
import ArrowUpRightIcon from '~/public/icons/arrow-up-right.svg';
import MessagesSquareIcon from '~/public/icons/messages-square.svg';

type NotesListModalProps = {
  composition: string;
  notes: MusicItem[];
  paidNotesHandler: () => void;
  onViewPdf: (note: MusicItem) => void;
};

const NotesListModal = ({ composition, notes, paidNotesHandler, onViewPdf }: NotesListModalProps) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.typography}>{composition}</Typography>
      {notes
        .filter((n) => n.name || n.fileName)
        .map((note, index) => (
          <NotesListItem
            key={(note.publishDate || '') + index}
            note={note}
            endIcon={
              note.url ? <ArrowUpRightIcon width={20} height={20} /> : <MessagesSquareIcon width={20} height={20} />
            }
            handler={!note.url ? paidNotesHandler : undefined}
            buttonText={note.url ? 'freeNotesButton' : 'paidNotesButton'}
            onViewPdf={() => onViewPdf(note)}
          />
        ))}
      {notes.length === 0 && (
        <NotesListItem
          key="empty-notes-contact"
          note={{ url: '', publishDate: new Date().toISOString() }}
          endIcon={<MessagesSquareIcon width={20} height={20} />}
          handler={paidNotesHandler}
          buttonText="paidNotesButton"
        />
      )}
    </Box>
  );
};

export default NotesListModal;
