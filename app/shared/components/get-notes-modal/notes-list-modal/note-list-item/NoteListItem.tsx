import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { styles } from './NoteListItem.styles';
import { Notes } from '~/types/types/getNotes.types';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type NotesListItemProps = {
  note: Notes;
  buttonText: 'freeNotesButton' | 'paidNotesButton';
  endIcon: React.ReactNode;
  handler?: () => void;
};

const NotesListItem = ({ note, buttonText, handler, endIcon }: NotesListItemProps) => {
  const t = useTranslations('getNotes.notesList');
  const { isMobile, isTablet } = useBreakpoints();

  const title = note.url.split('/').pop()?.split('.')[0];
  const date = new Date(note.dateUploaded).toLocaleDateString();
  const isCompact = isMobile || isTablet;

  const button = isCompact ? (
    <Box sx={styles.iconButton} onClick={handler}>
      {endIcon}
    </Box>
  ) : (
    <Button variant="outlined" endIcon={endIcon} onClick={handler}>
      {t(buttonText)}
    </Button>
  );

  const buttonWithLink = note.isFree ? (
    <a href={note.url} target="_blank" rel="noopener noreferrer">
      {button}
    </a>
  ) : (
    button
  );

  return (
    <Box sx={styles.container}>
      <Box sx={styles.leftBlock}>
        <Box sx={styles.notesTitleContainer}>
          {!isCompact && <SvgImage alt={title ?? 'file-icon'} src="/icons/frame.svg" width={25} height={25} />}
          <Typography sx={styles.notesTitle}>{title}</Typography>
        </Box>

        <Typography sx={styles.dateMobile}>{date}</Typography>
      </Box>

      <Typography sx={styles.dateDesktop}>{date}</Typography>

      {buttonWithLink}
    </Box>
  );
};

export default NotesListItem;
