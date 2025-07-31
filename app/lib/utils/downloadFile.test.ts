import { handleDownload } from '~/utils/downloadFile';

import { baseService } from '~/services/client/baseService';

jest.mock('~/services/client/baseService');

const originalShowSaveFilePicker = window.showSaveFilePicker;
const originalCreateElement = document.createElement;

describe('handleDownload', () => {
  const fileUrl = 'https://example.com/file.pdf';
  const fileName = 'file.pdf';

  afterEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'showSaveFilePicker', {
      writable: true,
      value: originalShowSaveFilePicker
    });
    document.createElement = originalCreateElement;
  });

  describe('File System Access API is available', () => {
    const mockWritableStream = {
      write: jest.fn().mockResolvedValue(undefined),
      close: jest.fn().mockResolvedValue(undefined)
    };
    const mockFileHandle = {
      createWritable: jest.fn().mockResolvedValue(mockWritableStream)
    };

    beforeEach(() => {
      Object.defineProperty(window, 'showSaveFilePicker', {
        writable: true,
        value: jest.fn().mockResolvedValue(mockFileHandle)
      });
    });

    it('should fetch blob and use file picker to save the file', async () => {
      const mockBlob = new Blob(['test-data']);
      (baseService.request as jest.Mock).mockResolvedValue(mockBlob);

      await handleDownload(fileUrl, fileName);

      expect(window.showSaveFilePicker).toHaveBeenCalledWith({
        suggestedName: fileName
      });
      expect(mockWritableStream.write).toHaveBeenCalledWith(mockBlob);
    });

    it('should NOT call file picker if fetching blob fails', async () => {
      const apiError = new Error('Failed to fetch');
      (baseService.request as jest.Mock).mockRejectedValue(apiError);

      await expect(handleDownload(fileUrl, fileName)).rejects.toThrow('Failed to fetch');

      expect(window.showSaveFilePicker).not.toHaveBeenCalled();
    });
  });

  describe('when File System Access API is NOT available', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'showSaveFilePicker', {
        writable: true,
        value: undefined
      });
    });

    it('should create and click an anchor link to download the file', () => {
      const mockLink = {
        href: '',
        download: '',
        click: jest.fn(),
        setAttribute: jest.fn()
      };

      const createElementSpy = jest
        .spyOn(document, 'createElement')
        .mockReturnValue(mockLink as unknown as HTMLAnchorElement);
      const appendChildSpy = jest.spyOn(document.body, 'appendChild').mockImplementation((child: Node) => child);
      const removeChildSpy = jest.spyOn(document.body, 'removeChild').mockImplementation((child: Node) => child);

      handleDownload(fileUrl, fileName);

      expect(mockLink.setAttribute).toHaveBeenCalledWith('download', fileName);

      createElementSpy.mockRestore();
      appendChildSpy.mockRestore();
      removeChildSpy.mockRestore();
    });
  });
});
