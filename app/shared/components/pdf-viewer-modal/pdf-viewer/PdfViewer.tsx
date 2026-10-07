'use client';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Box } from '@mui/material';
import { Viewer, Worker } from '@react-pdf-viewer/core';

import { styles } from './PdfViewer.styles';

import { MusicItem } from '~/domain/entities/artistry.entity';

type PdfViewerProps = {
  note: MusicItem;
};

const PdfViewer = ({ note }: PdfViewerProps) => {
  const url = note.url ?? '';

  return (
    <Box sx={styles.container}>
      <Box sx={styles.viewer}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={url} />
        </Worker>
      </Box>
    </Box>
  );
};

export default PdfViewer;
