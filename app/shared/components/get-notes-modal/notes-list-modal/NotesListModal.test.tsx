import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import NotesListModal from './NotesListModal';

jest.mock('./note-list-item/NoteListItem', () => {
  const MockListItem = (props: any) => (
    <div data-testid="note-list-item" data-note={JSON.stringify(props.note)}>
      {props.note.isFree ? (
        <a data-testid="note-btn-free" href={props.note.url} target="_blank" rel="noopener noreferrer">
          {props.buttonText}
        </a>
      ) : (
        <button data-testid="note-btn-paid" onClick={props.handler}>
          {props.buttonText}
        </button>
      )}
      <span data-testid="end-icon">{props.endIcon ? 'icon' : ''}</span>
    </div>
  );
  MockListItem.displayName = 'MockListItem';
  return MockListItem;
});

const notes = [
  { url: 'Note 1', isFree: true, dateUploaded: '2023-01-01' },
  { url: 'Note 2', isFree: false, dateUploaded: '2023-01-02' }
];

const paidHandler = jest.fn();

describe('NotesListModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<NotesListModal composition="Test composition" notes={notes} paidNotesHandler={paidHandler} />);
  });

  it('should render a NoteListItem for each note', () => {
    const items = screen.getAllByTestId('note-list-item');
    expect(items).toHaveLength(notes.length);
    expect(items[0]).toHaveAttribute('data-note', JSON.stringify(notes[0]));
    expect(items[1]).toHaveAttribute('data-note', JSON.stringify(notes[1]));
  });

  it('should render link with correct url', () => {
    const link = screen.getByTestId('note-btn-free');
    expect(link).toHaveAttribute('href', notes[0].url);
  });

  it('should call paidNotesHandler when paid note button is clicked', () => {
    fireEvent.click(screen.getByTestId('note-btn-paid'));
    expect(paidHandler).toHaveBeenCalled();
  });

  it('should render correct buttonText for free and paid notes', () => {
    expect(screen.getByTestId('note-btn-free')).toHaveTextContent('freeNotesButton');
    expect(screen.getByTestId('note-btn-paid')).toHaveTextContent('paidNotesButton');
  });
});
