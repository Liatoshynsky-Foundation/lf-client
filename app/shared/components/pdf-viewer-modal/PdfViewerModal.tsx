import dynamic from 'next/dynamic';

import ModalComponent from '~/components/modal-component/ModalComponent';

import DownloadButton from '../download-button/DownloadButton';
const PdfViewer = dynamic(() => import('./pdf-viewer/PdfViewer'), {
  ssr: false
});

import { Box, Typography } from '@mui/material';

import { IconButton } from '../design-system/all-components/icon-button/IconButton';
import { SvgImage } from '../svg-image/SvgImage';
import { styles } from './PdfViewerModal.style';
import { IconButtonVariant } from '~/types/enums/common.enums';

import { MusicItem } from '~/domain/entities/artistry.entity';

type PdfViewerModalProps = {
  opened: boolean;
  handleClose: () => void;
  note: MusicItem;
};

const PdfViewerModal = ({ opened, handleClose, note }: PdfViewerModalProps) => {
  const fileName = note.fileName || note.name || '';
  const url = note.url ?? '';

  return (
    <ModalComponent
      open={opened}
      onClose={handleClose}
      slots={{
        paper: Box
      }}
      slotProps={{
        backdrop: { sx: styles.backdrop },
        paper: { sx: styles.paper },
        container: { sx: { padding: 0 } }
      }}
    >
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Box sx={styles.headerBlock}>
            <IconButton sx={styles.closeButton} type={IconButtonVariant.icon} size="medium" onClick={handleClose}>
              <SvgImage src="/icons/x-white.svg" alt="Close" width={20} height={20} />
            </IconButton>
            <Box sx={styles.headerBlock}>
              <SvgImage src="/icons/pdf.svg" alt="Close" width={25} height={24} />
              <Typography variant="h2" sx={styles.caption}>
                {note.fileName}
              </Typography>
            </Box>
          </Box>
          <Box sx={styles.headerBlock}>
            <DownloadButton url={url} fileName={fileName} />
          </Box>
        </Box>
        <PdfViewer note={note} />
      </Box>
    </ModalComponent>
  );
};

export default PdfViewerModal;
