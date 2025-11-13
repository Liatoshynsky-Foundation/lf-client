import { render, screen } from '@testing-library/react';

import CollaborationIntro from './CollaborationIntro';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

describe('CollaborationIntro', () => {
  const mockedData = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    content: {
      type: TipTapNodeTypes.doc as TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph as TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text as TipTapNodeTypes.text,
              text: 'Test content paragraph.'
            }
          ]
        },
        {
          type: TipTapNodeTypes.paragraph as TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text as TipTapNodeTypes.text,
              text: 'Test content second paragraph.'
            }
          ]
        }
      ]
    }
  };

  it('should render title, subtitle and content', () => {
    render(
      <CollaborationIntro
        title={mockedData.title}
        subtitle={mockedData.subtitle}
        content={mockedData.content}
        contentAbove={{ type: TipTapNodeTypes.doc, content: [] }}
      />
    );
    const title = screen.getByText(mockedData.title);
    const subtitle = screen.getByText(mockedData.subtitle);
    const paragraph1 = screen.getByText(mockedData.content.content[0].content[0].text);
    const paragraph2 = screen.getByText(mockedData.content.content[1].content[0].text);

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
});
