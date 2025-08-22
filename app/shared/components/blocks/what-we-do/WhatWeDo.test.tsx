import { render, screen } from '@testing-library/react';

import WhatWeDo from './WhatWeDo';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IWhatWeDo } from '~/types/types/about-us.types';

const testData: IWhatWeDo = {
  title: 'What are we doing?:',
  items: [
    {
      title: 'titlesList.title1',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'We organize artistic events that bring Lyatoshynsky`s music back to the stage.'
              }
            ]
          }
        ]
      }
    },
    {
      title: 'titlesList.title2',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'We conduct master classes, public lectures, residencies, and research programs for professionals and a wider audience.'
              }
            ]
          }
        ]
      }
    },
    {
      title: 'titlesList.title3',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'We are developing the Borys Lyatoshynsky Memorial Cabinet-Museum in Kyiv as a place of memory, research, and inspiration.'
              }
            ]
          }
        ]
      }
    },
    {
      title: 'titlesList.title4',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'We create modern sheet music editions of Lyatoshynsky`s works.'
              }
            ]
          }
        ]
      }
    },
    {
      title: 'titlesList.title5',
      description: {
        type: TipTapNodeTypes.doc,
        content: [
          {
            type: TipTapNodeTypes.paragraph,
            content: [
              {
                type: TipTapNodeTypes.text,
                text: 'We work together with musicians, researchers, and institutions in Ukraine and abroad, because we know that Ukrainian music is part of the global cultural process.'
              }
            ]
          }
        ]
      }
    }
  ]
};
describe('WhatWeDo component', () => {
  it('should renders the section title and all goal items', () => {
    render(WhatWeDo({ data: testData }));

    expect(screen.getByText('What are we doing?:')).toBeInTheDocument();

    expect(screen.getByText('titlesList.title1')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title2')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title3')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title4')).toBeInTheDocument();
    expect(screen.getByText('titlesList.title5')).toBeInTheDocument();
  });
});
