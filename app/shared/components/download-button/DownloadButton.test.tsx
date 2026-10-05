import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DownloadButton from './DownloadButton';

import { useDownload } from '~/shared/hooks/use-download/useDownload';

jest.mock('~/shared/hooks/use-download/useDownload', () => ({
  useDownload: jest.fn()
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

  it('should call download with the correct parameters when clicked', async () => {
    const user = userEvent.setup();
    const download = jest.fn();
    const testUrl = 'https://example.com/sheet-music.pdf';
    const testFileName = 'summer-vacation.jpeg';

    (useDownload as jest.Mock).mockReturnValue({ download });

    render(<DownloadButton url={testUrl} fileName={testFileName} />);

    const button = screen.getByRole('button', { name: /Download/i });
    await user.click(button);

    expect(download).toHaveBeenCalledWith(testUrl, testFileName);
  });

  it('should render correctly', () => {
    render(<DownloadButton url="https://example.com/sheet-music.pdf" fileName="test" />);
    expect(screen.getByRole('button', { name: /Download/i })).toBeInTheDocument();
  });
});
