import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import NotesListModal from './NotesListModal';

jest.mock('./note-list-item/NoteListItem', () => {
  const MockListItem = (props: any) => (
    <div data-testid="note-list-item" data-note={JSON.stringify(props.note)}>
      <button data-testid={`note-btn-${props.note.free ? 'free' : 'paid'}`} onClick={props.handler}>
        {props.buttonText}
      </button>
      <span data-testid="end-icon">{props.endIcon ? 'icon' : ''}</span>
    </div>
  );
  MockListItem.displayName = 'MockListItem';
  return MockListItem;
});

const notes = [
  { title: 'Note 1', free: true, date: '2023-01-01' },
  { title: 'Note 2', free: false, date: '2023-01-02' }
];

const freeHandler = jest.fn();
const paidHandler = jest.fn();

describe('NotesListModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<NotesListModal notes={notes} freeNotesHandler={freeHandler} paidNotesHandler={paidHandler} />);
  });

  it('should render a NoteListItem for each note', () => {
    const items = screen.getAllByTestId('note-list-item');
    expect(items).toHaveLength(notes.length);
    expect(items[0]).toHaveAttribute('data-note', JSON.stringify(notes[0]));
    expect(items[1]).toHaveAttribute('data-note', JSON.stringify(notes[1]));
  });

  it('should call freeNotesHandler when free note button is clicked', () => {
    fireEvent.click(screen.getByTestId('note-btn-free'));
    expect(freeHandler).toHaveBeenCalled();
    expect(paidHandler).not.toHaveBeenCalled();
  });

  it('should call paidNotesHandler when paid note button is clicked', () => {
    fireEvent.click(screen.getByTestId('note-btn-paid'));
    expect(paidHandler).toHaveBeenCalled();
    expect(freeHandler).not.toHaveBeenCalled();
  });

  it('should render correct buttonText for free and paid notes', () => {
    expect(screen.getByTestId('note-btn-free')).toHaveTextContent('freeNotesButton');
    expect(screen.getByTestId('note-btn-paid')).toHaveTextContent('paidNotesButton');
  });
});
