import { render, screen } from '@testing-library/react';

import PdfViewer from './PdfViewer';

import { MusicItem } from '~/domain/entities/artistry.entity';

jest.mock('../download-button/DownloadButton', () => ({
  __esModule: true,
  default: () => <button>Download</button>
}));

const note: MusicItem = {
  name: 'Test note',
  url: '/notes/test-note.pdf'
};

describe('PdfViewer', () => {
  it('should render PDF viewer with correct URL', () => {
    render(<PdfViewer note={note} />);
    expect(screen.getByTitle('PDF viewer')).toHaveAttribute('src', note.url);
  });

  it('should render download button', () => {
    render(<PdfViewer note={note} />);
    expect(screen.getByRole('button', { name: 'Download' })).toBeInTheDocument();
  });
});
