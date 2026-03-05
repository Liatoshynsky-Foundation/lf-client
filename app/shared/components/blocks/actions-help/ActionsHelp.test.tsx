import { render, screen } from '@testing-library/react';

import ActionsHelp from './ActionsHelp';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('~/ds-components/text-card/TextCard', () => ({
  __esModule: true,
  default: ({ title, description }: { title: string; description: string }) => (
    <div data-testid="text-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}));

jest.mock('~/ds-components/button-card/ButtonCard', () => ({
  __esModule: true,
  default: ({ text, link }: { text: string; link: string }) => (
    <a data-testid="button-card" href={link}>
      {text}
    </a>
  )
}));

const mockData = {
  title: { uk: 'Actions Help', en: 'Actions Help' },
  subtitle: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.multiLangText,
            text: {
              uk: 'subtitleText',
              en: 'subtitleText'
            }
          }
        ]
      }
    ]
  } as TipTapDoc,
  paperItems: [
    { title: { uk: 'Paper 1', en: 'Paper 1' }, description: { uk: 'Description 1', en: 'Description 1' } },
    { title: { uk: 'Paper 2', en: 'Paper 2' }, description: { uk: 'Description 2', en: 'Description 2' } }
  ],
  paperButton: {
    text: { uk: 'Go to test', en: 'Go to test' },
    link: '/test-link'
  }
};

jest.mock('next-intl', () => ({
  useLocale: () => 'en'
}));

describe('ActionsHelp component', () => {
  beforeEach(() => {
    render(<ActionsHelp data={mockData} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the section title', () => {
    expect(screen.getByText('Actions Help')).toBeInTheDocument();
  });

  it('should render the subtitle using TipTapContent with custom renderer', () => {
    expect(screen.getByText('subtitleText')).toBeInTheDocument();
  });

  it('should render all paper items as TextCards', () => {
    expect(screen.getAllByTestId('text-card')).toHaveLength(mockData.paperItems.length);

    mockData.paperItems.forEach((paper) => {
      expect(screen.getByText(paper.title.en)).toBeInTheDocument();
      expect(screen.getByText(paper.description.en)).toBeInTheDocument();
    });
  });

  it('should render the ButtonCard with correct text and link', () => {
    const buttonCard = screen.getByTestId('button-card');
    expect(buttonCard).toHaveTextContent(mockData.paperButton.text.en);
    expect(buttonCard).toHaveAttribute('href', mockData.paperButton.link);
  });
});
