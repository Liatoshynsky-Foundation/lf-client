import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import NotesListItem from './NoteListItem';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key
}));

jest.mock('~/ds-components/button/Button');

jest.mock('~/components/svg-image/SvgImage', () => ({
  SvgImage: (props: any) => <img data-testid="svg-image" alt={props.alt} />
}));

const note = { url: '/notes/test-note.pdf', isFree: true, dateUploaded: '2023-01-01' };

const icon = <svg data-testid="end-icon" />;

const handler = jest.fn();

describe('NotesListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render note title, date, and button', () => {
    render(<NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} />);
    expect(screen.getByText('test-note')).toBeInTheDocument();
    expect(screen.getAllByText(/2023/)).toHaveLength(2);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('svg-image')).toHaveAttribute('alt', 'test-note');
  });

  it('should render correct button text for freeNotesButton', () => {
    render(<NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} />);
    expect(screen.getByRole('button')).toHaveTextContent('freeNotesButton');
  });

  it('should render correct button text for paidNotesButton', () => {
    render(
      <NotesListItem note={{ ...note, isFree: false }} buttonText="paidNotesButton" endIcon={icon} handler={handler} />
    );
    expect(screen.getByRole('button')).toHaveTextContent('paidNotesButton');
  });

  it('calls handler when button is clicked', () => {
    render(<NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalled();
  });

  it('should render endIcon if provided', () => {
    render(<NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} />);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });
});
