import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DownloadButton from './DownloadButton';
import { ApiRoutes } from '~/constants/routes/api-routes';
import { downloadWithAnchor } from '~/utils/downloadFile';
import { getStorageFileEndpoint } from '~/utils/storageFileEndpoint';

jest.mock('~/utils/downloadFile', () => ({
  downloadWithAnchor: jest.fn()
}));

jest.mock('next-intl', () => ({
  useTranslations: jest.fn().mockReturnValue((key: string) => {
    const translations = {
      downloadMusic: 'Download'
    };
    return translations[key as keyof typeof translations] ?? key;
  })
}));

jest.mock('~/ds-components/button/Button');

describe('DownloadButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call handleDownload with the correct parameters when clicked', () => {
    const testFolderName = 'my-photos';
    const testFileName = 'summer-vacation.jpeg';

    render(<DownloadButton folderName={testFolderName} fileName={testFileName} />);

    const button = screen.getByRole('button', { name: /Download/i });
    fireEvent.click(button);

    const expectedUrl = getStorageFileEndpoint(ApiRoutes.STORAGE_FILE, testFolderName, testFileName);

    expect(downloadWithAnchor).toHaveBeenCalledWith(expectedUrl, testFileName);
  });

  it('should render correctly', () => {
    render(<DownloadButton folderName="test" fileName="test" />);
    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
  });
});
