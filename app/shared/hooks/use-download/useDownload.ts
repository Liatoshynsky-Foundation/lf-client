import { useState } from 'react';

import { downloadWithAnchor } from '~/lib/utils/downloadFile';

export const useDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const download = async (url: string, fileName: string) => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      await downloadWithAnchor(url, fileName);
    } finally {
      setIsDownloading(false);
    }
  };

  return { download };
};
