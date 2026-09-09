import { fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';

import type { OpusComposition } from '../opusDetails.types';
import Compositions from './Compositions';

import type { GetNotesModalProps } from '~/shared/components/get-notes-modal/GetNotesModal';

jest.mock('~/shared/components/get-notes-modal/GetNotesModal', () => ({
  __esModule: true,
  default: ({ opened, composition, notes, handleClose }: GetNotesModalProps) => {
    if (!opened) return null;
    return (
      <div data-testid="mock-GetNotesModal">
        <span data-testid="modal-composition">{composition}</span>
        <span data-testid="modal-notes-count">{notes.length}</span>
        <button data-testid="modal-close" onClick={handleClose}>
          Close
        </button>
      </div>
    );
  }
}));

const mockCompositions: OpusComposition[] = [
  {
    id: 'c1',
    index: 1,
    name: 'Composition 1',
    sheetMusic: [{ name: 'file1.pdf', url: 'https://example.com/file1.pdf' }]
  },
  {
    id: 'c2',
    index: 2,
    name: 'Composition 2 Without Valid Notes',
    sheetMusic: [{ publishDate: '2022' }]
  },
  {
    id: 'c3',
    index: 3,
    name: 'Composition 3',
    sheetMusic: []
  }
];

describe('Compositions', () => {
  const baseProps = {
    heading: 'Test Compositions',
    compositions: mockCompositions,
    viewSheetMusicLabel: 'View Notes'
  };

  it('renders the section with heading and lists all compositions', () => {
    render(<Compositions {...baseProps} />);

    expect(screen.getByText('Test Compositions')).toBeInTheDocument();

    const list = screen.getByTestId('OpusDetails-compositionsList');
    expect(within(list).getByText('Composition 1')).toBeInTheDocument();
    expect(within(list).getByText('Composition 2 Without Valid Notes')).toBeInTheDocument();
    expect(within(list).getByText('Composition 3')).toBeInTheDocument();
  });

  it('renders the view notes button only for compositions that have valid sheet music', () => {
    render(<Compositions {...baseProps} />);

    const c1Button = screen.getByTestId('OpusDetails-composition-sheetMusic-c1');
    expect(c1Button).toBeInTheDocument();
    expect(c1Button).toHaveTextContent('View Notes');

    expect(screen.queryByTestId('OpusDetails-composition-sheetMusic-c2')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-composition-sheetMusic-c3')).toBeNull();
  });

  it('opens and closes the modal with the correct composition data', () => {
    render(<Compositions {...baseProps} />);

    expect(screen.queryByTestId('mock-GetNotesModal')).toBeNull();

    const c1Button = screen.getByTestId('OpusDetails-composition-sheetMusic-c1');
    fireEvent.click(c1Button);

    const modal = screen.getByTestId('mock-GetNotesModal');
    expect(modal).toBeInTheDocument();
    expect(screen.getByTestId('modal-composition')).toHaveTextContent('Composition 1');
    expect(screen.getByTestId('modal-notes-count')).toHaveTextContent('1');

    const closeBtn = screen.getByTestId('modal-close');
    fireEvent.click(closeBtn);

    expect(screen.queryByTestId('mock-GetNotesModal')).toBeNull();
  });
});
