import { Box, Typography } from '@mui/material';

import SheetMusicButton from '../sheet-music-button/SheetMusicButton';
import { styles } from './Meta.styles';

import { MusicItem } from '~/domain/entities/artistry.entity';

export type MetaLabels = {
  number: string;
  date: string;
  genre: string;
  viewSheetMusic: string;
};

export type MetaProps = {
  number: string;
  year?: string;
  genre?: string;
  movements?: string[];
  sheetMusic?: MusicItem | null;
  labels: MetaLabels;
};

const Meta = ({ number, year, genre, movements, sheetMusic, labels }: Readonly<MetaProps>) => {
  return (
    <Box sx={styles.root} data-testid="OpusDetails-meta">
      <Box sx={styles.metaBlock}>
        <Typography sx={styles.metaLabel}>{labels.number}</Typography>
        <Typography sx={styles.metaValue} data-testid="OpusDetails-meta-number">
          {number}
        </Typography>
      </Box>

      {year && (
        <Box sx={styles.metaBlock}>
          <Typography sx={styles.metaLabel}>{labels.date}</Typography>
          <Typography sx={styles.metaValueAccent} data-testid="OpusDetails-meta-date">
            {year}
          </Typography>
        </Box>
      )}

      {genre && (
        <Box sx={styles.metaBlock}>
          <Typography sx={styles.metaLabel}>{labels.genre}</Typography>
          <Typography sx={styles.metaValueAccent} data-testid="OpusDetails-meta-genre">
            {genre}
          </Typography>
        </Box>
      )}

      {movements && movements.length > 0 && (
        <Box sx={styles.movements} data-testid="OpusDetails-meta-movements">
          {movements.map((movement, index) => (
            <Typography key={`${movement}-${index}`} sx={styles.movementItem}>
              {movement}
            </Typography>
          ))}
        </Box>
      )}

      {sheetMusic?.url && (
        <SheetMusicButton
          href={sheetMusic.url}
          label={labels.viewSheetMusic}
          variant="contained"
          dataTestId="OpusDetails-meta-sheetMusic"
        />
      )}
    </Box>
  );
};

export default Meta;
