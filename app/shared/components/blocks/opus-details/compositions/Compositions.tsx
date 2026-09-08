'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';

import Button from '~/ds-components/button/Button';

import type { OpusComposition } from '../opusDetails.types';
import Section from '../section/Section';
import { styles } from './Compositions.styles';

import { MusicItem } from '~/domain/entities/artistry.entity';
import GetNotesModal from '~/shared/components/get-notes-modal/GetNotesModal';

export type CompositionsProps = {
  heading: string;
  compositions: OpusComposition[];
  viewSheetMusicLabel: string;
};

const Compositions = ({ heading, compositions, viewSheetMusicLabel }: Readonly<CompositionsProps>) => {
  const [modalNotes, setModalNotes] = useState<MusicItem[] | null>(null);
  const [compositionName, setCompositionName] = useState<string>('');

  const handleOpenModal = (composition: OpusComposition) => {
    setCompositionName(composition.name);
    setModalNotes(composition.sheetMusic || []);
  };

  const handleCloseModal = () => {
    setModalNotes(null);
  };
  return (
    <Section heading={heading} dataTestId="OpusDetails-compositions" rootSx={styles.spacing}>
      <Box component="ul" sx={styles.list} data-testid="OpusDetails-compositionsList">
        {compositions.map((composition) => (
          <Box component="li" key={composition.id} sx={styles.item}>
            <Typography component="p" sx={styles.title}>
              {`${composition.name}`}
            </Typography>

            {composition.sheetMusic?.some((note) => note.name || note.fileName) && (
              <Box sx={styles.buttonCell}>
                <Button
                  onClick={() => handleOpenModal(composition)}
                  variant="outlined"
                  data-testid={`OpusDetails-composition-sheetMusic-${composition.id}`}
                >
                  {viewSheetMusicLabel}
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      <GetNotesModal
        key={modalNotes ? modalNotes[0]?.publishDate || '' : 'empty'}
        composition={compositionName}
        notes={modalNotes || []}
        opened={!!modalNotes}
        handleClose={handleCloseModal}
      />
    </Section>
  );
};

export default Compositions;
