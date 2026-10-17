'use client';

import { render, screen } from '@testing-library/react';
import React from 'react';

import ManagedPageSection from './ManagedPageSection';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { MANAGED_PAGE_SECTION_ITEM_TYPE, MANAGED_PAGE_SECTION_KIND } from '~/types/page/managed-page-section.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    <img {...props} alt={props.alt ?? ''} data-filled={fill ? 'true' : undefined} data-testid="next-image" />
  )
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: { title: string | TipTapDoc }) => (
    <h2 data-testid="ManagedPageSection-title">{typeof title === 'string' ? title : 'TipTap Title'}</h2>
  )
}));

jest.mock('~/components/title-with-description/TitleWithDescription', () => ({
  __esModule: true,
  default: ({ title, dataTestId }: { title: string | TipTapDoc; dataTestId?: string }) => (
    <h3 data-testid={dataTestId}>{typeof title === 'string' ? title : 'TipTap subtitle'}</h3>
  )
}));

jest.mock('~/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data }: { data: TipTapDoc }) => {
    const rawText = data.content?.[0]?.content?.[0]?.text;
    const text = typeof rawText === 'string' ? rawText : '';
    return <p data-testid="mock-tiptap-content">{text}</p>;
  }
}));

jest.mock('../../tip-tap-content/nodes', () => ({
  renderData: jest.fn((input: unknown) => {
    if (typeof input === 'object' && input !== null) return input;
    return {
      type: 'doc',
      content: [{ type: 'paragraph', content: [{ type: 'text', text: String(input) }] }]
    };
  })
}));

jest.mock('~/utils/generateSizesAttribute', () => ({
  generateSizesAttribute: jest.fn(() => '(max-width: 600px) 16px, 24px')
}));

const makeDoc = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text }]
    }
  ]
});

describe('ManagedPageSection', () => {
  it('renders the section title and mixed items like OurGoals', () => {
    render(
      <ManagedPageSection
        data={{
          kind: MANAGED_PAGE_SECTION_KIND,
          title: 'Що хочемо поліпшити',
          items: [
            { id: 'sub', type: MANAGED_PAGE_SECTION_ITEM_TYPE.SUBTITLE, value: 'Підзаголовок' },
            { id: 'p', type: MANAGED_PAGE_SECTION_ITEM_TYPE.PARAGRAPH, value: makeDoc('Абзац') },
            { id: 'b', type: MANAGED_PAGE_SECTION_ITEM_TYPE.BULLET, value: makeDoc('Пункт') }
          ]
        }}
      />
    );

    expect(screen.getByTestId('ManagedPageSection')).toHaveTextContent('Що хочемо поліпшитиПідзаголовокАбзацПункт');
  });

  it('renders only the title when there are no items', () => {
    render(
      <ManagedPageSection
        data={{
          kind: MANAGED_PAGE_SECTION_KIND,
          title: 'Порожня секція',
          items: []
        }}
      />
    );

    expect(screen.getByText('Порожня секція')).toBeInTheDocument();
    expect(screen.queryByTestId('ManagedPageSection-items')).not.toBeInTheDocument();
  });
});
