import { render, screen } from '@testing-library/react';

import FoundationFounders from './FoundationFounders';
import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { IFoundationFounders } from '~/types/page/about-us.types';
import { MultiLangNode, TextNode, TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('./FoundationTeam/FoundationTeam', () => {
  const MockFoundationTeam = ({ title }: { title: string }) => <div data-testid="foundation-team">{title}</div>;
  MockFoundationTeam.displayName = 'MockFoundationTeam';
  return MockFoundationTeam;
});

jest.mock('./FoundationWasCreated/FoundationWasCreated', () => {
  const MockFoundationWasCreated = ({ data }: { data: TipTapDoc }) => {
    const paragraph = data.content?.[0];
    const nodes = paragraph?.content ?? [];

    function renderNode(node: TextNode | MultiLangNode) {
      if (typeof node.text === 'string') {
        return node.text;
      } else {
        return node.text.en;
      }
    }

    return (
      <div data-testid="foundation-was-created">
        <p>
          {nodes.map((node, i) =>
            node.marks?.some((m) => m.type === 'bold') ? (
              <strong key={i}>{renderNode(node)}</strong>
            ) : (
              <span key={i}>{renderNode(node)}</span>
            )
          )}
        </p>
      </div>
    );
  };
  MockFoundationWasCreated.displayName = 'MockFoundationWasCreated';
  return MockFoundationWasCreated;
});

const testData: IFoundationFounders = {
  titleText: {
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
  },
  listTitle: 'Фундація Лятошинського',
  members: [
    {
      photo: {
        src: 'Tetyana-Homon',
        alt: 'Tetyana Gomon',
        generatedSrc: 'Tetyana-Homon',
        caption: null
      },
      name: 'Tetyana Gomon',
      description: 'Heir to the composer, co-founder and head of the Foundation, chamber pianist.'
    },
    {
      photo: {
        src: 'Iryna-Tykova',
        alt: 'Iryna Tukova',
        generatedSrc: 'Iryna-Tykova',
        caption: null
      },
      name: 'Iryna Tukova',
      description: 'Co-founder of the Foundation, musicologist, lecturer and teacher, Doctor of Arts.'
    },
    {
      photo: {
        src: 'Maria-Hurska',
        alt: 'Maria Hurska',
        generatedSrc: 'Maria-Hurska',
        caption: null
      },
      name: 'Maria Hurska',
      description:
        'Digital projects manager, oversees website development, information architecture, and communication.'
    }
  ]
};
describe('FoundationFounders', () => {
  beforeEach(() => {
    render(FoundationFounders({ data: testData }));
  });

  it('should render description', () => {
    expect(screen.getByText(/in 2023 by Tetyana Gomon, Iryna Tukova, and/i)).toBeInTheDocument();
  });
});
