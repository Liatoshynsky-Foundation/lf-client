import { Box, Typography } from '@mui/material';

import type { OpusComposition } from '../opusDetails.types';
import Section from '../section/Section';
import SheetMusicButton from '../sheet-music-button/SheetMusicButton';
import { styles } from './Compositions.styles';

export type CompositionsProps = {
  heading: string;
  compositions: OpusComposition[];
  viewSheetMusicLabel: string;
};

const Compositions = ({ heading, compositions, viewSheetMusicLabel }: Readonly<CompositionsProps>) => {
  return (
    <Section heading={heading} dataTestId="OpusDetails-compositions" rootSx={styles.spacing}>
      <Box component="ul" sx={styles.list} data-testid="OpusDetails-compositionsList">
        {compositions.map((composition) => (
          <Box component="li" key={composition.id} sx={styles.item}>
            <Typography component="p" sx={styles.title}>
              {`№${composition.index}${composition.title}`}
            </Typography>

            {composition.sheetMusicUrl && (
              <Box sx={styles.buttonCell}>
                <SheetMusicButton
                  href={composition.sheetMusicUrl}
                  label={viewSheetMusicLabel}
                  variant="outlined"
                  dataTestId={`OpusDetails-composition-sheetMusic-${composition.id}`}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Section>
  );
};

export default Compositions;
