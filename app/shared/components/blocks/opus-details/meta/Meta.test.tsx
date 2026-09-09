import { render, screen, within } from '@testing-library/react';
import React from 'react';

import type { SheetMusicButtonProps } from '../sheet-music-button/SheetMusicButton';
import Meta, { MetaProps } from './Meta';

jest.mock('../sheet-music-button/SheetMusicButton', () => ({
  __esModule: true,
  default: ({ href, label, dataTestId }: SheetMusicButtonProps) => (
    <a href={href} data-testid={dataTestId}>
      {label}
    </a>
  )
}));

const mockLabels = {
  number: 'Number Label:',
  date: 'Date Label:',
  genre: 'Genre Label:',
  viewSheetMusic: 'View Sheet Music'
};

const baseProps: MetaProps = {
  number: 'Op. 1',
  labels: mockLabels
};

describe('Meta', () => {
  it('renders only the required number field when no optional fields are provided', () => {
    render(<Meta {...baseProps} />);

    expect(screen.getByTestId('OpusDetails-meta-number')).toHaveTextContent('Op. 1');
    expect(screen.getByText('Number Label:')).toBeInTheDocument();

    expect(screen.queryByTestId('OpusDetails-meta-date')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-meta-genre')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-meta-movements')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-meta-sheetMusic')).toBeNull();
  });

  it('renders the year field when provided', () => {
    render(<Meta {...baseProps} year="1999" />);

    expect(screen.getByTestId('OpusDetails-meta-date')).toHaveTextContent('1999');
    expect(screen.getByText('Date Label:')).toBeInTheDocument();
  });

  it('renders the genre field when provided', () => {
    render(<Meta {...baseProps} genre="Symphony" />);

    expect(screen.getByTestId('OpusDetails-meta-genre')).toHaveTextContent('Symphony');
    expect(screen.getByText('Genre Label:')).toBeInTheDocument();
  });

  it('renders movements when provided', () => {
    render(<Meta {...baseProps} movements={['Movement I', 'Movement II']} />);

    const movementsContainer = screen.getByTestId('OpusDetails-meta-movements');
    expect(within(movementsContainer).getByText('Movement I')).toBeInTheDocument();
    expect(within(movementsContainer).getByText('Movement II')).toBeInTheDocument();
  });

  it('does not render movements container if movements array is empty', () => {
    render(<Meta {...baseProps} movements={[]} />);
    expect(screen.queryByTestId('OpusDetails-meta-movements')).toBeNull();
  });

  it('renders the sheet music button when sheetMusic url is provided', () => {
    render(<Meta {...baseProps} sheetMusic={{ name: 'score.pdf', url: 'https://example.com/score.pdf' }} />);

    const button = screen.getByTestId('OpusDetails-meta-sheetMusic');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('View Sheet Music');
    expect(button).toHaveAttribute('href', 'https://example.com/score.pdf');
  });

  it('does not render the sheet music button when sheetMusic url is missing', () => {
    render(<Meta {...baseProps} sheetMusic={{ name: 'missing url' }} />);

    expect(screen.queryByTestId('OpusDetails-meta-sheetMusic')).toBeNull();
  });
});
