import { render, screen } from '@testing-library/react';

import FoundationFounders from './FoundationFounders';
import { TipTapMarkType, TipTapNodeTypes } from '~/types/enums/common.enums';
import { IFoundationFounders } from '~/types/types/about-us.types';
import { TipTapDoc } from '~/types/types/common.types';

const mockComponent = (testId: string, children: React.ReactNode) => {
  const Mock = (props: any) => <div data-testid={testId}>{children || props.title || null}</div>;
  Mock.displayName = `Mock${testId}`;
  return Mock;
};

jest.mock('./FoundationTeam/FoundationTeam', () => mockComponent('foundation-team', null));

jest.mock('./FoundationWasCreated/FoundationWasCreated', () => {
  const MockFoundationWasCreated = ({ data }: { data: TipTapDoc }) => {
    const paragraph = data.content?.[0];
    const nodes = paragraph?.content ?? [];

    return (
      <div data-testid="foundation-was-created">
        <p>
          {nodes.map((node, i) =>
            node.marks?.some((m) => m.type === 'bold') ? (
              <strong key={i}>{node.text}</strong>
            ) : (
              <span key={i}>{node.text}</span>
            )
          )}
        </p>
      </div>
    );
  };
  MockFoundationWasCreated.displayName = 'MockFoundationWasCreated';
  return MockFoundationWasCreated;
});

const createPhoto = (name: string, alt: string) => ({
  src: `/api/blob-url?folderName=photos&blobName=${name}`,
  alt,
  caption: null
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
            marks: [{ type: TipTapMarkType.bold }]
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
      photo: createPhoto('Tetyana-Homon', 'Tetyana Gomon'),
      name: 'Tetyana Gomon',
      description: 'Heir to the composer, co-founder and head of the Foundation, chamber pianist.'
    },
    {
      photo: createPhoto('Iryna-Tykova', 'Iryna Tukova'),
      name: 'Iryna Tukova',
      description: 'Co-founder of the Foundation, musicologist, lecturer and teacher, Doctor of Arts.'
    },
    {
      photo: createPhoto('Maria-Hurska', 'Maria Hurska'),
      name: 'Maria Hurska',
      description:
        'Digital projects manager, oversees website development, information architecture, and communication.'
    }
  ]
};

const setup = () => render(<FoundationFounders data={testData} />);

describe('FoundationFounders', () => {
  beforeEach(() => {
    setup();
  });

  it('should render description', () => {
    expect(screen.getByText(/in 2023 by Tetyana Gomon, Iryna Tukova, and/i)).toBeInTheDocument();
  });
});
