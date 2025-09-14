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
  default: ({ notes, freeNotesHandler, paidNotesHandler }: any) => (
    <div data-testid="notes-list-modal">
      <button onClick={freeNotesHandler}>Free Notes</button>
      <button onClick={paidNotesHandler}>Paid Notes</button>
      {notes.map((n: any) => (
        <div key={n.title}>{n.title}</div>
      ))}
    </div>
  )
}));

const notes = [
  { title: 'Note 1', free: true, date: '2023-01-01' },
  { title: 'Note 2', free: false, date: '2023-01-02' }
];

const alertFn = jest.fn();
const originalAlert = window.alert;

describe('GetNotesModal', () => {
  beforeAll(() => {
    window.alert = alertFn;
  });

  afterAll(() => {
    window.alert = originalAlert;
    jest.clearAllMocks();
  });

  it('should render notes list modal and title in LIST state', () => {
    render(<GetNotesModal notes={notes} opened={true} />);
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('notesList.title')).toBeInTheDocument();
    expect(screen.getByTestId('notes-list-modal')).toBeInTheDocument();
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
  });

  it('should switch to FORM state when Paid Notes button is clicked', () => {
    render(<GetNotesModal notes={notes} opened={true} />);
    fireEvent.click(screen.getByText('Paid Notes'));
    expect(screen.getByText('form.title')).toBeInTheDocument();
    expect(screen.getByText('form.subtitle')).toBeInTheDocument();
    expect(screen.getByText('ContactForm')).toBeInTheDocument();
  });

  it('should switch to CONFIRM state when ContactForm is submitted', () => {
    render(<GetNotesModal notes={notes} opened={true} />);
    fireEvent.click(screen.getByText('Paid Notes'));
    fireEvent.click(screen.getByText('ContactForm'));

    const confirmModal = screen.getByTestId('notes-confirm-modal');

    expect(confirmModal).toBeInTheDocument();
    expect(confirmModal).toHaveTextContent('confirmation.title');
    expect(confirmModal).toHaveTextContent('confirmation.subtitle');
    expect(confirmModal).toHaveTextContent('confirmation.btnText');
  });

  it('should close modal when close icon is clicked', () => {
    render(<GetNotesModal notes={notes} opened={true} />);
    fireEvent.click(screen.getByTestId('icon-button'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should call alert when Free Notes button is clicked', () => {
    render(<GetNotesModal notes={notes} opened={true} />);
    fireEvent.click(screen.getByText('Free Notes'));
    expect(alertFn).toHaveBeenCalledWith('Free notes gotten');
  });
});
