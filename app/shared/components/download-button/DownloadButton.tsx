'use client';

import { Box } from '@mui/material';
import { useTranslations } from 'next-intl';

import { SvgImage } from '~/components/svg-image/SvgImage';
import Button from '~/ds-components/button/Button';

import { useDownload } from '~/shared/hooks/use-download/useDownload';

interface DownloadButtonProps {
  url: string;
  fileName: string;
}

const DownloadButton = ({ url, fileName }: DownloadButtonProps) => {
  const { download } = useDownload();
  const t = useTranslations('table.buttons');

  return (
    <Box>
      <Button
        onClick={() => download(url, fileName)}
        size={'medium'}
        variant={'outlined'}
        endIcon={<SvgImage src="/icons/download.svg" width={24} height={24} alt="download composition note" />}
        label={t('downloadMusic')}
      />
    </Box>
  );
};

export default DownloadButton;
