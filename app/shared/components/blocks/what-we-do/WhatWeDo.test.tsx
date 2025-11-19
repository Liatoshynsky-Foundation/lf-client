import { render, screen } from '@testing-library/react';

import WhatWeDo from './WhatWeDo';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IWhatWeDo } from '~/types/page/about-us.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

const createDescription = (text: string): TipTapDoc => ({
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [
        {
          type: TipTapNodeTypes.text,
          text
        }
      ]
    }
  ]
});

const testData: IWhatWeDo = {
  title: 'What are we doing?:',
  items: [
    {
      title: 'titlesList.title1',
      description: createDescription('We organize artistic events that bring Lyatoshynsky`s music back to the stage.')
    },
    {
      title: 'titlesList.title2',
      description: createDescription(
        'We conduct master classes, public lectures, residencies, and research programs for professionals and a wider audience.'
      )
    },
    {
      title: 'titlesList.title3',
      description: createDescription(
        'We are developing the Borys Lyatoshynsky Memorial Cabinet-Museum in Kyiv as a place of memory, research, and inspiration.'
      )
    },
    {
      title: 'titlesList.title4',
      description: createDescription('We create modern sheet music editions of Lyatoshynsky`s works.')
    },
    {
      title: 'titlesList.title5',
      description: createDescription(
        'We work together with musicians, researchers, and institutions in Ukraine and abroad, because we know that Ukrainian music is part of the global cultural process.'
      )
    }
  ]
};

describe('WhatWeDo component', () => {
  it('should render the section title and all goal items', () => {
    render(WhatWeDo({ data: testData }));

    expect(screen.getByText('What are we doing?:')).toBeInTheDocument();

    testData.items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
    });
  });
});
