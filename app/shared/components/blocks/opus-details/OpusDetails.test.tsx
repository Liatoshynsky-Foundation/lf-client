import { render, screen, within } from '@testing-library/react';
import React from 'react';

import OpusDetails from './OpusDetails';
import type { OpusComposition, OpusDetailsLabels, OpusDetailsProps, OpusVideo } from './opusDetails.types';

jest.mock('next/image');

jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  Svg: () => <span data-testid="SvgMock" />
}));

const labels: OpusDetailsLabels = {
  back: 'Повернутися до творів',
  metaNumber: 'Опус:',
  metaDate: 'Дата створення:',
  metaGenre: 'Жанр:',
  viewSheetMusic: 'Переглянути ноти',
  compositionsTitle: 'Твори:',
  videosTitle: 'Версії виконання опусу:',
  placeholderTitle: 'СкоРо БуДе',
  placeholderSubtitle: 'Ця сторінка ще доповнюється.',
  placeholderImageAlt: 'Кіт-архіваріус',
  videoTitleFallback: 'Відео на YouTube'
};

const compositions: OpusComposition[] = [
  { id: 'c1', index: 1, title: '«Після бою», сл. І. Буніна', sheetMusicUrl: 'https://example.com/c1.pdf' },
  { id: 'c2', index: 2, title: '«Смерть», сл. І. Буніна' }
];

const videos: OpusVideo[] = [
  { id: 'v1', youTubeId: 'abc123', title: 'Виконання 1' },
  { id: 'v2', youTubeId: 'def456' }
];

const baseProps: OpusDetailsProps = {
  title: 'Український квінтет для фортепіано',
  number: 'bo.16',
  creationDate: '1929',
  genre: 'Фортепіанний квінтет',
  movements: ['I. Allegro e poco agitato', 'II. Lento e tranquillo'],
  sheetMusicUrl: 'https://example.com/opus.pdf',
  description: 'Написаний під час війни.\n\nЗа структурою квінтет являє циклічну композицію.',
  compositions,
  videos,
  backHref: '/uk/artistry',
  labels
};

const renderOpus = (props: Partial<OpusDetailsProps> = {}) => {
  return render(<OpusDetails {...baseProps} {...props} />);
};

describe('OpusDetails', () => {
  it('renders the static elements: back link, title and metadata sidebar', () => {
    renderOpus();

    expect(screen.getByTestId('OpusDetails')).toBeInTheDocument();
    expect(screen.getByTestId('OpusDetails-back')).toBeInTheDocument();
    expect(screen.getByTestId('OpusDetails-title')).toHaveTextContent('Український квінтет для фортепіано');

    const meta = screen.getByTestId('OpusDetails-meta');
    expect(within(meta).getByTestId('OpusDetails-meta-number')).toHaveTextContent('bo.16');
    expect(within(meta).getByTestId('OpusDetails-meta-date')).toHaveTextContent('1929');
    expect(within(meta).getByTestId('OpusDetails-meta-genre')).toHaveTextContent('Фортепіанний квінтет');

    const movements = within(meta).getByTestId('OpusDetails-meta-movements');
    expect(movements).toHaveTextContent('I. Allegro e poco agitato');
    expect(movements).toHaveTextContent('II. Lento e tranquillo');
  });

  it('renders the sheet-music button in the sidebar when a link exists', () => {
    renderOpus();

    const button = screen.getByTestId('OpusDetails-meta-sheetMusic');
    expect(button).toHaveTextContent('Переглянути ноти');
    expect(button).toHaveAttribute('href', 'https://example.com/opus.pdf');
    expect(button).toHaveAttribute('target', '_blank');
    expect(button).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('hides optional sidebar fields when they are not provided', () => {
    renderOpus({ creationDate: undefined, genre: undefined, movements: [], sheetMusicUrl: undefined });

    expect(screen.getByTestId('OpusDetails-meta-number')).toBeInTheDocument();
    expect(screen.queryByTestId('OpusDetails-meta-date')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-meta-genre')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-meta-movements')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-meta-sheetMusic')).toBeNull();
  });

  it('renders the rich description (split into paragraphs) and hides the placeholder', () => {
    renderOpus();

    const description = screen.getByTestId('OpusDetails-description');
    expect(description).toBeInTheDocument();
    expect(within(description).getByText('Написаний під час війни.')).toBeInTheDocument();
    expect(within(description).getByText('За структурою квінтет являє циклічну композицію.')).toBeInTheDocument();

    expect(screen.queryByTestId('OpusDetails-placeholder')).toBeNull();
  });

  it('renders the cat placeholder and hides the description when description is missing', () => {
    renderOpus({ description: null });

    const placeholder = screen.getByTestId('OpusDetails-placeholder');
    expect(placeholder).toBeInTheDocument();
    expect(within(placeholder).getByText('СкоРо БуДе')).toBeInTheDocument();
    expect(within(placeholder).getByText('Ця сторінка ще доповнюється.')).toBeInTheDocument();
    expect(within(placeholder).getByAltText('Кіт-архіваріус')).toBeInTheDocument();

    expect(screen.queryByTestId('OpusDetails-description')).toBeNull();
  });

  it('treats a blank description as missing and shows the placeholder', () => {
    renderOpus({ description: '   ' });

    expect(screen.getByTestId('OpusDetails-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('OpusDetails-description')).toBeNull();
  });

  it('renders the compositions list only when compositions exist', () => {
    renderOpus();

    const list = screen.getByTestId('OpusDetails-compositionsList');
    expect(within(list).getByText('№1«Після бою», сл. І. Буніна')).toBeInTheDocument();
    expect(within(list).getByText('№2«Смерть», сл. І. Буніна')).toBeInTheDocument();

    expect(screen.getByTestId('OpusDetails-composition-sheetMusic-c1')).toHaveAttribute(
      'href',
      'https://example.com/c1.pdf'
    );
    expect(screen.queryByTestId('OpusDetails-composition-sheetMusic-c2')).toBeNull();
  });

  it('does not render the compositions block when there are no compositions', () => {
    renderOpus({ compositions: [] });

    expect(screen.queryByTestId('OpusDetails-compositions')).toBeNull();
  });

  it('renders the video gallery with embedded YouTube players only when videos exist', () => {
    renderOpus();

    expect(screen.getByTestId('OpusDetails-videos')).toBeInTheDocument();

    const firstVideo = screen.getByTestId('OpusDetails-video-v1');
    const iframe = within(firstVideo).getByTitle('Виконання 1');
    expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed/abc123');
    expect(iframe).toHaveAttribute('allowfullscreen');

    expect(within(screen.getByTestId('OpusDetails-video-v2')).getByTitle('Відео на YouTube')).toBeInTheDocument();
  });

  it('does not render the video gallery when there are no videos', () => {
    renderOpus({ videos: [] });

    expect(screen.queryByTestId('OpusDetails-videos')).toBeNull();
  });

  it('renders the placeholder while still rendering compositions and videos sequentially', () => {
    renderOpus({ description: null });

    expect(screen.getByTestId('OpusDetails-placeholder')).toBeInTheDocument();
    expect(screen.getByTestId('OpusDetails-compositions')).toBeInTheDocument();
    expect(screen.getByTestId('OpusDetails-videos')).toBeInTheDocument();
  });

  it('renders a minimal opus with description, compositions and videos omitted', () => {
    renderOpus({ description: undefined, compositions: undefined, videos: undefined });

    expect(screen.getByTestId('OpusDetails-meta-number')).toBeInTheDocument();
    expect(screen.getByTestId('OpusDetails-placeholder')).toBeInTheDocument();
    expect(screen.queryByTestId('OpusDetails-compositions')).toBeNull();
    expect(screen.queryByTestId('OpusDetails-videos')).toBeNull();
  });
});
