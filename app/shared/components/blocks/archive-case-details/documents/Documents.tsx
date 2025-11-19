import { Box, Typography } from '@mui/material';

import type { ArchiveCaseDocument } from '../ArchiveCaseDetails';
import PdfButton from '../pdf-button/PdfButton';
import { styles } from './Documents.styles';

export type DocumentsProps = {
  documents: ArchiveCaseDocument[];
  ariaLabel: string;
  pdfUrl: string;
  pdfLabel: string;
};

const Documents = ({ documents, ariaLabel, pdfUrl, pdfLabel }: Readonly<DocumentsProps>) => {
  return (
    <Box sx={styles.root} data-testid="ArchiveCaseDetails-documentsColumn">
      <Box sx={styles.pdfButtonMobileWrapper} data-testid="ArchiveCaseDetails-pdfButtonMobile">
        <PdfButton href={pdfUrl} label={pdfLabel} />
      </Box>

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
