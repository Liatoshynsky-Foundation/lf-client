import { Box, Typography } from '@mui/material';

import type { ArchiveCaseDocument } from '../ArchiveCaseDetails';
import { styles } from './Documents.styles';

export type DocumentsProps = {
  documents: ArchiveCaseDocument[];
  title?: string;
  ariaLabel: string;
};

const Documents = ({ documents, title, ariaLabel }: Readonly<DocumentsProps>) => {
  return (
    <Box sx={styles.root} data-testid="ArchiveCaseDetails-documentsColumn">
      {title && <Typography sx={styles.title}>{title}</Typography>}
      <Box component="ol" sx={styles.list} aria-label={ariaLabel} data-testid="ArchiveCaseDetails-documentsList">
        {documents.map((doc) => (
          <Box component="li" key={doc.id} sx={styles.item}>
            <Box sx={styles.text}>
              <Typography component="p" sx={styles.title}>
                {doc.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Documents;
