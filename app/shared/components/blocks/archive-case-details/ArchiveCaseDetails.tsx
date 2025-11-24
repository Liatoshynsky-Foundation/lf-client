import { Box, Typography } from '@mui/material';

import { styles } from './ArchiveCaseDetails.styles';
import BackLink from './back-link/BackLink';
import Documents from './documents/Documents';
import Meta from './meta/Meta';
import Navigation from './navigation/Navigation';
import PdfButton from './pdf-button/PdfButton';
import type { ArchiveAdjacentCase } from '~/types/page/archive.types';

export interface ArchiveCaseDocument {
  id: string;
  title: string;
}

export type ArchiveCaseDetailsLabels = {
  back: string;
  metaCode: string;
  metaDates: string;
  metaSheets: string;
  documentsAria: string;
  viewPdf: string;
  prevCase: string;
  nextCase: string;
};

export interface ArchiveCaseDetailsProps {
  title: string;
  index: string;
  dateRange: string;
  sheetsCount?: number;
  pdfUrl: string;
  documents: ArchiveCaseDocument[];
  fundHref: string;
  prevCase?: ArchiveAdjacentCase | null;
  nextCase?: ArchiveAdjacentCase | null;
  labels: ArchiveCaseDetailsLabels;
}

const ArchiveCaseDetails = ({
  title,
  index,
  dateRange,
  sheetsCount,
  pdfUrl,
  documents,
  fundHref,
  prevCase,
  nextCase,
  labels
}: Readonly<ArchiveCaseDetailsProps>) => {
  return (
    <Box sx={styles.gridContainer} data-testid="ArchiveCaseDetails">
      <BackLink href={fundHref} label={labels.back} dataTestId="ArchiveCaseDetails-back" />

      <Typography variant="h2" sx={styles.sectionTitle} data-testid="ArchiveCaseDetails-title">
        {title}
      </Typography>

      <Box sx={styles.contentGrid}>
        <Meta
          index={index}
          dateRange={dateRange}
          sheetsCount={sheetsCount}
          labels={{
            code: labels.metaCode,
            dates: labels.metaDates,
            sheets: labels.metaSheets
          }}
        />

        <Box sx={styles.pdfButtonWrapper} data-testid="ArchiveCaseDetails-pdfButtonSticky">
          <PdfButton href={pdfUrl} label={labels.viewPdf} dataTestId="ArchiveCaseDetails-pdfButton" />
        </Box>

        <Documents documents={documents} ariaLabel={labels.documentsAria} />
      </Box>

      <Navigation prevCase={prevCase} nextCase={nextCase} prevLabel={labels.prevCase} nextLabel={labels.nextCase} />
    </Box>
  );
};

export default ArchiveCaseDetails;
