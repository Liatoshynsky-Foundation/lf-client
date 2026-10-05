import { Box } from '@mui/material';

import DownloadButton from '../download-button/DownloadButton';
import { styles } from './PdfViewer.styles';

import { MusicItem } from '~/domain/entities/artistry.entity';

type PdfViewerProps = {
  note: MusicItem;
};

const PdfViewer = ({ note }: PdfViewerProps) => {
  const fileName = note.fileName || note.name || '';
  const url = note.url ?? '';
  const title = 'PDF viewer';

  return (
    <Box sx={styles.container}>
      <Box sx={styles.viewer}>
        <iframe src={url} title={title} />
      </Box>
      <Box>
        <DownloadButton url={url} fileName={fileName} />
      </Box>
    </Box>
  );
};

export default PdfViewer;
