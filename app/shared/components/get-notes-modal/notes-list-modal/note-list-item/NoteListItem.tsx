import { Box, Typography } from '@mui/material';
import { useFormatter, useTranslations } from 'next-intl';
import React from 'react';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { styles } from './NoteListItem.styles';
import { IconButtonColorVariant, IconButtonVariant } from '~/types/enums/common.enums';
import { Notes } from '~/types/types/getNotes.types';

import { IconButton } from '~/shared/components/design-system/all-components/icon-button/IconButton';
import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

type NotesListItemProps = {
  note: Notes;
  buttonText: 'freeNotesButton' | 'paidNotesButton';
  endIcon: React.ReactNode;
  handler?: () => void;
};

const NotesListItem = ({ note, buttonText, handler, endIcon }: NotesListItemProps) => {
  const t = useTranslations('getNotes.notesList');
  const format = useFormatter();
  const { isMobile, isTablet } = useBreakpoints();

  const title = note.url.split('/').pop()?.split('.')[0];
  const parsedDate = new Date(note.dateUploaded);
  const isValidDate = !Number.isNaN(parsedDate.getTime());

  const date = isValidDate
    ? format.dateTime(parsedDate, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    : '';

  const isCompact = isMobile || isTablet;
  const buttonProps = note.isFree ? { link: note.url, externalLink: true } : { onClick: handler };

  const desktopButton = <Button variant="outlined" label={t(buttonText)} endIcon={endIcon} {...buttonProps} />;

  const mobileButton = note.isFree ? (
    <a href={note.url} target="_blank" rel="noopener noreferrer">
      <IconButton variant={IconButtonColorVariant.Primary} type={IconButtonVariant.outlined}>
        {endIcon}
      </IconButton>
    </a>
  ) : (
    <IconButton onClick={handler} variant={IconButtonColorVariant.Primary} type={IconButtonVariant.outlined}>
      {endIcon}
    </IconButton>
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

      {isCompact ? mobileButton : desktopButton}
    </Box>
  );
};

export default NotesListItem;
