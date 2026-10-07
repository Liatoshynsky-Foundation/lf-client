import { Box, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

import { styles } from './Section.styles';
import { sxToArray } from '~/utils/sxToArray';

export type SectionProps = {
  heading: string;
  dataTestId: string;
  rootSx?: SxProps<Theme>;
  children: ReactNode;
};

const Section = ({ heading, dataTestId, rootSx, children }: Readonly<SectionProps>) => {
  const trimmedHeading = heading.trim();

  return (
    <Box sx={[styles.root, ...sxToArray(rootSx)]} data-testid={dataTestId}>
      {trimmedHeading && (
        <Box sx={styles.headingRow}>
          <Box sx={styles.accent} aria-hidden>
            <Box sx={styles.noteHead} />
          </Box>

          <Typography component="h2" sx={styles.heading}>
            {trimmedHeading}
          </Typography>
        </Box>
      )}

      {children}
    </Box>
  );
};

export default Section;
