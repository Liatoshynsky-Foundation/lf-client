import { downloadWithAnchor } from '~/utils/downloadFile';

jest.mock('~/services/client/baseService');

describe('downloadWithAnchor', () => {
  const fileUrl = 'https://example.com/file.pdf';
  const fileName = 'file.pdf';

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('downloads the file using a blob URL', async () => {
    const blob = new Blob(['file content'], { type: 'application/pdf' });
    const blobUrl = 'blob:http://localhost/file';

    const mockLink = {
      href: '',
      download: '',
      click: jest.fn()
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      blob: jest.fn().mockResolvedValue(blob)
    } as unknown as Response);
    URL.createObjectURL = jest.fn().mockReturnValue(blobUrl);
    URL.revokeObjectURL = jest.fn();
    jest.spyOn(document.body, 'appendChild').mockImplementation((child: Node) => child);
    jest.spyOn(document.body, 'removeChild').mockImplementation((child: Node) => child);
    jest.spyOn(document, 'createElement').mockReturnValue(mockLink as unknown as HTMLAnchorElement);

    await downloadWithAnchor(fileUrl, fileName);

    expect(fetch).toHaveBeenCalledWith(fileUrl);
    expect(URL.createObjectURL).toHaveBeenCalledWith(blob);
    expect(mockLink.download).toBe(fileName);
    expect(mockLink.click).toHaveBeenCalled();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith(blobUrl);
  });

  it('throws an error when the download request fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false
    } as Response);

    await expect(downloadWithAnchor(fileUrl, fileName)).rejects.toThrow('Failed to download file');
  });
});
