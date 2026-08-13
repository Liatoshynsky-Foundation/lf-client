import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import NotesListItem from './NoteListItem';
import { Notes } from '~/types/types/getNotes.types';

import useBreakpoints from '~/shared/hooks/use-breakpoints/useBreakpoints';

interface MockButtonProps {
  label: string;
  onClick?: () => void;
  endIcon?: React.ReactNode;
}

interface MockIconButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
}

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useFormatter: () => ({
    dateTime: (date: Date) => date.toISOString()
  })
}));

jest.mock(
  '~/ds-components/button/Button',
  () =>
    function MockButton({ label, onClick, endIcon }: MockButtonProps) {
      return (
        <button onClick={onClick}>
          {label}
          {endIcon}
        </button>
      );
    }
);

jest.mock('~/shared/components/design-system/all-components/icon-button/IconButton', () => ({
  __esModule: true,
  IconButton: function MockIconButton({ children, onClick }: MockIconButtonProps) {
    return (
      <button data-testid="icon-button" onClick={onClick}>
        {children}
      </button>
    );
  }
}));

jest.mock('~/components/svg-image/SvgImage', () => ({
  SvgImage: ({ alt }: { alt: string }) => <img data-testid="svg-image" alt={alt} />
}));

jest.mock('~/shared/hooks/use-breakpoints/useBreakpoints', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isMobile: false,
    isTablet: false
  }))
}));

const note = {
  url: '/notes/test-note.pdf',
  isFree: true,
  dateUploaded: '2023-01-01T00:00:00.000Z'
} as unknown as Notes;
const icon = <svg data-testid="end-icon" />;
const handler = jest.fn();

describe('NotesListItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false, isTablet: false });
  });

  it('should render note title, date, and button on desktop viewports', () => {
    render(<NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} />);
    expect(screen.getByText('test-note')).toBeInTheDocument();
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

  it('should call handler when button is clicked on desktop for paid notes', () => {
    render(
      <NotesListItem note={{ ...note, isFree: false }} buttonText="paidNotesButton" endIcon={icon} handler={handler} />
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handler).toHaveBeenCalled();
  });

  it('should render endIcon if provided', () => {
    render(<NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} />);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  it('should render mobile layouts and hide the decorative frame icon on compact viewports', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: true, isTablet: false });
    render(<NotesListItem note={note} buttonText="freeNotesButton" endIcon={icon} handler={handler} />);

    expect(screen.queryByTestId('svg-image')).not.toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/notes/test-note.pdf');
  });

  it('should render an icon button configuration that triggers click parameters for paid mobile items', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false, isTablet: true });
    render(
      <NotesListItem note={{ ...note, isFree: false }} buttonText="paidNotesButton" endIcon={icon} handler={handler} />
    );

    fireEvent.click(screen.getByTestId('icon-button'));
    expect(handler).toHaveBeenCalled();
  });

  it('should fallback to default literal labels if file extensions or text payloads parsing steps resolve to empty structures', () => {
    (useBreakpoints as jest.Mock).mockReturnValue({ isMobile: false, isTablet: false });

    const fakeUrlMock = {
      split: () => ({
        pop: () => ({
          split: () => ({
            0: undefined
          })
        })
      })
    };

    const corruptNote = {
      url: fakeUrlMock,
      isFree: false,
      dateUploaded: '2023-01-01T00:00:00.000Z'
    } as unknown as Notes;

    render(<NotesListItem note={corruptNote} buttonText="paidNotesButton" endIcon={icon} handler={handler} />);
    expect(screen.getByTestId('svg-image')).toHaveAttribute('alt', 'file-icon');
  });
});
