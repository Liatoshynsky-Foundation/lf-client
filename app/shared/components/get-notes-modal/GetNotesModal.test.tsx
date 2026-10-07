import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import GetNotesModal from './GetNotesModal';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/ds-components/icon-button/IconButton', () => ({
  IconButton: ({ children, ...props }: any) => (
    <button data-testid="icon-button" {...props}>
      {children}
    </button>
  )
}));

jest.mock('../forms/get-notes-form/GetNotesForm', () => ({
  __esModule: true,
  default: ({ onSuccess }: any) => <button onClick={onSuccess}>GetNotesForm</button>
}));

jest.mock('~/components/modal-component/ModalComponent', () => ({
  __esModule: true,
  default: ({ open, children }: any) => (open ? <div data-testid="modal">{children}</div> : null)
}));

jest.mock('~/components/paper-component/PaperComponent', () => ({
  __esModule: true,
  default: ({ children }: any) => <div data-testid="paper">{children}</div>
}));

jest.mock('./notes-confirmation-modal/NotesConfirmModal', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="notes-confirm-modal">
      {props.title}
      {props.subtitle}
      {props.btnText}
    </div>
  )
}));

jest.mock('./notes-list-modal/NotesListModal', () => ({
  __esModule: true,
  default: ({ notes, paidNotesHandler, onViewPdf }: any) => (
    <div data-testid="notes-list-modal">
      <button onClick={() => onViewPdf(notes[0])}>Free Notes</button>
      <button onClick={paidNotesHandler}>Paid Notes</button>
      {notes.map((n: any) => (
        <div key={n.url}>{n.url}</div>
      ))}
    </div>
  )
}));

jest.mock('../pdf-viewer/PdfViewer', () => ({
  __esModule: true,
  default: ({ note }: { note: { url: string } }) => <div>PDF Viewer: {note.url}</div>
}));

const composition = 'Composition 1';
const notes = [
  { url: '/note-1.pdf', isFree: true, dateUploaded: '2023-01-01' },
  { url: '/note-2.pdf', isFree: false, dateUploaded: '2023-01-02' }
];

const handleCloseModal = jest.fn();

describe('GetNotesModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render notes list modal and title in LIST state', () => {
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('notesList.title')).toBeInTheDocument();
    expect(screen.getByTestId('notes-list-modal')).toBeInTheDocument();
    expect(screen.getByText('/note-1.pdf')).toBeInTheDocument();
    expect(screen.getByText('/note-2.pdf')).toBeInTheDocument();
  });

  it('should switch to FORM state when Paid Notes button is clicked', async () => {
    const user = userEvent.setup();
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    await user.click(screen.getByText('Paid Notes'));
    expect(screen.getByText('form.title')).toBeInTheDocument();
    expect(screen.getByText('form.subtitle')).toBeInTheDocument();
    expect(screen.getByText('GetNotesForm')).toBeInTheDocument();
  });

  it('should switch to CONFIRM state when GetNotesForm is submitted', async () => {
    const user = userEvent.setup();
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    await user.click(screen.getByText('Paid Notes'));
    await user.click(screen.getByText('GetNotesForm'));

    const confirmModal = screen.getByTestId('notes-confirm-modal');

    expect(confirmModal).toBeInTheDocument();
    expect(confirmModal).toHaveTextContent('confirmation.title');
    expect(confirmModal).toHaveTextContent('confirmation.subtitle');
    expect(confirmModal).toHaveTextContent('confirmation.btnText');
  });

  it('should close modal when close icon is clicked', async () => {
    const user = userEvent.setup();
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    await user.click(screen.getByTestId('icon-button'));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it('should render PDF viewer when free note is clicked', async () => {
    const user = userEvent.setup();
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    await user.click(screen.getByRole('button', { name: 'Free Notes' }));
    expect(screen.getByText(`PDF Viewer: ${notes[0].url}`)).toBeInTheDocument();
  });
});
