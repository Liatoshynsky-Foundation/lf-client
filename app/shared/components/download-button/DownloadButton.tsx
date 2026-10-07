'use client';

import { Box } from '@mui/material';

import { IconButton } from '../design-system/all-components/icon-button/IconButton';
import { SvgImage } from '../svg-image/SvgImage';
import { IconButtonVariant } from '~/types/enums/common.enums';

import { useDownload } from '~/shared/hooks/use-download/useDownload';

interface DownloadButtonProps {
  url: string;
  fileName: string;
}

const DownloadButton = ({ url, fileName }: DownloadButtonProps) => {
  const { download } = useDownload();

  return (
    <Box>
      <IconButton
        sx={{ backgroundColor: 'transparent' }}
        type={IconButtonVariant.icon}
        size="medium"
        onClick={() => download(url, fileName)}
      >
        <SvgImage src="/icons/download-white.svg" width={20} height={20} alt="download composition note" />
      </IconButton>
    </Box>
  );
};

export default DownloadButton;
