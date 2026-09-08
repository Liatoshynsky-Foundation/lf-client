import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import NotesListModal from './NotesListModal';

import { MusicItem } from '~/domain/entities/artistry.entity';

jest.mock('./note-list-item/NoteListItem', () => {
  const MockListItem = (props: any) => (
    <div data-testid="note-list-item" data-note={JSON.stringify(props.note)}>
      {props.note.url ? (
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

const notes: MusicItem[] = [
  { url: 'https://example.com/note1', name: 'Note 1', publishDate: '2023-01-01' },
  { url: undefined, name: 'Note 2', publishDate: '2023-01-02' }
];

const paidHandler = jest.fn();

describe('NotesListModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (customNotes: MusicItem[] = notes) =>
    render(<NotesListModal composition="Test composition" notes={customNotes} paidNotesHandler={paidHandler} />);

  it('should render a NoteListItem for each note', () => {
    renderComponent();
    const items = screen.getAllByTestId('note-list-item');
    expect(items).toHaveLength(notes.length);
    expect(items[0]).toHaveAttribute('data-note', JSON.stringify(notes[0]));
    expect(items[1]).toHaveAttribute('data-note', JSON.stringify(notes[1]));
  });

  it('should render link with correct url', () => {
    renderComponent();
    const link = screen.getByTestId('note-btn-free');
    expect(link).toHaveAttribute('href', notes[0].url!);
  });

  it('should call paidNotesHandler when paid note button is clicked', () => {
    renderComponent();
    fireEvent.click(screen.getByTestId('note-btn-paid'));
    expect(paidHandler).toHaveBeenCalled();
  });

  it('should render correct buttonText for free and paid notes', () => {
    renderComponent();
    expect(screen.getByTestId('note-btn-free')).toHaveTextContent('freeNotesButton');
    expect(screen.getByTestId('note-btn-paid')).toHaveTextContent('paidNotesButton');
  });

  it('should handle notes with only fileName and missing publishDate, and filter invalid ones', () => {
    const weirdNotes: MusicItem[] = [
      { url: 'x', publishDate: null },
      { url: 'y', fileName: 'file.pdf', publishDate: null }
    ];
    renderComponent(weirdNotes);
    const items = screen.getAllByTestId('note-list-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveAttribute('data-note', JSON.stringify(weirdNotes[1]));
  });

  it('should render fallback contact item if filtered notes array is empty', () => {
    renderComponent([]);
    const items = screen.getAllByTestId('note-list-item');
    expect(items).toHaveLength(1);
    expect(items[0]).toHaveTextContent('paidNotesButton');
  });
});
