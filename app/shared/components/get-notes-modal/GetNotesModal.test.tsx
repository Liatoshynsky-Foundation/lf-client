import { fireEvent, render, screen } from '@testing-library/react';
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

jest.mock('~/components/forms/contact-form/ContactForm', () => ({
  __esModule: true,
  default: ({ onSubmit }: any) => <button onClick={onSubmit}>ContactForm</button>
}));

jest.mock('~/components/modal-component/ModalComponent', () => ({
  __esModule: true,
  default: ({ open, slots }: any) => (open ? <div data-testid="modal">{slots.paper()}</div> : null)
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
  default: ({ notes, paidNotesHandler }: any) => (
    <div data-testid="notes-list-modal">
      <a href={notes[0].url} target="_blank" rel="noopener noreferrer">
        Free Notes
      </a>
      <button onClick={paidNotesHandler}>Paid Notes</button>
      {notes.map((n: any) => (
        <div key={n.url}>{n.url}</div>
      ))}
    </div>
  )
}));

const composition = 'Composition 1';
const notes = [
  { url: '/note-1.pdf', isFree: true, dateUploaded: '2023-01-01' },
  { url: '/note-2.pdf', isFree: false, dateUploaded: '2023-01-02' }
];

const handleCloseModal = jest.fn();

describe('GetNotesModal', () => {
  afterAll(() => {
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

  it('should switch to FORM state when Paid Notes button is clicked', () => {
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    fireEvent.click(screen.getByText('Paid Notes'));
    expect(screen.getByText('form.title')).toBeInTheDocument();
    expect(screen.getByText('form.subtitle')).toBeInTheDocument();
    expect(screen.getByText('ContactForm')).toBeInTheDocument();
  });

  it('should switch to CONFIRM state when ContactForm is submitted', () => {
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    fireEvent.click(screen.getByText('Paid Notes'));
    fireEvent.click(screen.getByText('ContactForm'));

    const confirmModal = screen.getByTestId('notes-confirm-modal');

    expect(confirmModal).toBeInTheDocument();
    expect(confirmModal).toHaveTextContent('confirmation.title');
    expect(confirmModal).toHaveTextContent('confirmation.subtitle');
    expect(confirmModal).toHaveTextContent('confirmation.btnText');
  });

  it('should close modal when close icon is clicked', () => {
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    fireEvent.click(screen.getByTestId('icon-button'));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it('should render Free Notes as a link with correct attributes', () => {
    render(<GetNotesModal composition={composition} notes={notes} opened={true} handleClose={handleCloseModal} />);
    const link = screen.getByText('Free Notes');
    expect(link).toHaveAttribute('href', notes[0].url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
