import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import PolicySection from './PolicySection';
import type { TipTapDoc } from '~/types/types/common.types';

const makeTextNode = (text: string) => ({ type: 'text', text });
const makeParagraph = (text: string) => ({ type: 'paragraph', content: [makeTextNode(text)] });
const makeDoc = (text: string): TipTapDoc => ({ type: 'doc', content: [makeParagraph(text)] }) as TipTapDoc;

jest.mock('../policy-content/PolicyContent', () => ({
  PolicyContent: ({
    doc,
    paragraphSx
  }: {
    doc: import('~/types/types/common.types').TipTapDoc;
    paragraphSx?: import('@mui/material').SxProps<import('@mui/material').Theme>;
  }) => (
    <div
      data-testid="policy-content"
      data-grid={
        paragraphSx && (paragraphSx as Record<string, unknown>)?.['gridColumn']
          ? JSON.stringify((paragraphSx as Record<string, unknown>)['gridColumn'])
          : ''
      }
    >
      {JSON.stringify(doc)}
    </div>
  )
}));

jest.mock('~/components/list-item/ListItem', () => ({
  __esModule: true,
  default: ({ text, sx }: { text: React.ReactNode; sx?: Record<string, unknown> }) => (
    <div data-testid="list-item" data-sx={sx ? '1' : ''}>
      {text}
    </div>
  )
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title, mb }: { title: string; mb?: number }) => (
    <h2 data-testid="section-title" data-mb={mb ?? ''}>
      {title}
    </h2>
  )
}));

describe('PolicySection', () => {
  it('should render title', () => {
    render(<PolicySection title="Privacy Policy" />);
    expect(screen.getByTestId('section-title')).toHaveTextContent('Privacy Policy');
  });

  it('should render description via PolicyContent', () => {
    const description = makeDoc('Description text');
    render(<PolicySection description={description} />);
    const pcs = screen.getAllByTestId('policy-content');
    expect(pcs).toHaveLength(1);
    expect(pcs[0]).toHaveTextContent('Description text');
  });

  it('should render list items', () => {
    const list = [makeDoc('First list item'), makeDoc('Second list item')];
    render(<PolicySection list={list} />);
    const items = screen.getAllByTestId('list-item');
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent('First list item');
    expect(items[1]).toHaveTextContent('Second list item');
  });

  it('should render note at the end', () => {
    const note = makeDoc('Final note');
    render(<PolicySection note={note} />);
    const pcs = screen.getAllByTestId('policy-content');
    expect(pcs).toHaveLength(1);
    expect(pcs[0]).toHaveTextContent('Final note');
  });

  it('should render sections: subtitle, list, and section note', () => {
    const sections = [
      {
        subtitle: makeDoc('Section One Subtitle'),
        list: [makeDoc('Section list item 1'), makeDoc('Section list item 2')],
        note: makeDoc('Section note')
      }
    ];
    render(<PolicySection sections={sections} />);
    expect(screen.getByText(/Section One Subtitle/)).toBeInTheDocument();
    const sectionListItems = screen.getAllByTestId('list-item');
    expect(sectionListItems).toHaveLength(2);
    expect(sectionListItems[0]).toHaveTextContent('Section list item 1');
    expect(sectionListItems[1]).toHaveTextContent('Section list item 2');
    expect(screen.getByText(/Section note/)).toBeInTheDocument();
  });

  it('should render top-level list and sections together', () => {
    const list = [makeDoc('Top list item')];
    const sections = [
      {
        subtitle: makeDoc('Subtitle inside section'),
        list: [makeDoc('Section list item')]
      }
    ];
    render(<PolicySection list={list} sections={sections} />);
    const allListItems = screen.getAllByTestId('list-item');
    expect(allListItems).toHaveLength(2);
    expect(screen.getByText(/Top list item/)).toBeInTheDocument();
    expect(screen.getByText(/Section list item/)).toBeInTheDocument();
  });

  it('should pass custom contentGridColumn to PolicyContent', () => {
    const description = makeDoc('Grid description');
    const contentGridColumn = { xs: '1 / 2', sm: '2 / 4', md: '7 / 12' };
    render(<PolicySection description={description} contentGridColumn={contentGridColumn} />);
    const pc = screen.getByTestId('policy-content');
    expect(pc).toHaveAttribute('data-grid', JSON.stringify(contentGridColumn));
  });

  it('should render section list with custom listGridColumn', () => {
    const listGridColumn = { xs: '1 / 3', sm: '3 / 6', md: '8 / 12' };
    const sections = [{ subtitle: makeDoc('S'), list: [makeDoc('LI')] }];
    render(<PolicySection sections={sections} listGridColumn={listGridColumn} />);
    expect(screen.getByTestId('list-item')).toBeInTheDocument();
  });

  it('should render everything together', () => {
    const props = {
      title: 'Full Example',
      description: makeDoc('Description text'),
      list: [makeDoc('First list item'), makeDoc('Second list item')],
      note: makeDoc('Final note'),
      sections: [
        {
          subtitle: makeDoc('Section One Subtitle'),
          list: [makeDoc('Section list item')],
          note: makeDoc('Section note')
        },
        { subtitle: makeDoc('Section Two Subtitle') }
      ]
    };
    render(<PolicySection {...props} />);

    expect(screen.getByTestId('section-title')).toHaveTextContent('Full Example');
    expect(screen.getAllByTestId('policy-content').length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByTestId('list-item')).toHaveLength(3);

    const pcs = screen.getAllByTestId('policy-content');
    expect(pcs[pcs.length - 1]).toHaveTextContent('Final note');
  });
});
