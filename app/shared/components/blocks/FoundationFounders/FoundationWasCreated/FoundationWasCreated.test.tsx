import { render, screen } from '@testing-library/react';
import React from 'react';

import FoundationWasCreated from './FoundationWasCreated';
import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

const testData: TipTapDoc = {
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [
        {
          type: TipTapNodeTypes.text,
          text: 'The Liatoshynskyi Foundation, established',
          marks: [
            {
              type: TipTapMarkType.bold
            }
          ]
        },
        {
          type: TipTapNodeTypes.text,
          text: ' in 2023 by Tetyana Gomon, Iryna Tukova, and Pavlo Piminov, unites specialists in the fields of musicology, performing arts, music management, and digital projects.'
        }
      ]
    }
  ]
};

describe('FoundationWasCreated', () => {
  it('should render the title and description correctly', () => {
    render(<FoundationWasCreated data={testData} />);

    expect(screen.getByText(/The Liatoshynskyi Foundation, established/i)).toBeInTheDocument();
    expect(screen.getByText(/in 2023 by Tetyana Gomon/i)).toBeInTheDocument();
  });
});
