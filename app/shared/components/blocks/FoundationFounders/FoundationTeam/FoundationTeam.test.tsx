import { render, screen } from '@testing-library/react';
import React from 'react';

import FoundationTeam from './FoundationTeam';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IImageBlock } from '~/types/page/about-us.types';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data?: TipTapDoc;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

type MockPersonCardProps = {
  name: string | TipTapDoc;
  description: string | TipTapDoc;
  imgURL?: string;
};

jest.mock('~/components/svg-image/SvgImage', () => ({
  SvgImage: ({ alt }: { alt: string }) => <img data-testid="svg-image" alt={alt} />
}));

jest.mock('~/components/tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];

    return (
      <div data-testid="mock-tiptap-title">
        {ParagraphRenderer ? ParagraphRenderer('Mocked TipTap Title') : 'Fallback'}
      </div>
    );
  }
}));

jest.mock('~/ds-components/person-card/PersonCard', () => ({
  __esModule: true,
  default: ({ name, description }: MockPersonCardProps) => (
    <div data-testid="person-card">
      <span>{typeof name === 'string' ? name : 'tiptap-name'}</span>
      <span>{typeof description === 'string' ? description : 'tiptap-desc'}</span>
    </div>
  )
}));

const mockTeamData = [
  {
    name: 'Тетяна Гомон',
    description: 'Спадкоємиця композитора',
    photo: { src: '/img1.jpg', alt: 'Tetyana', generatedSrc: 'test-image-1' } as unknown as IImageBlock
  },
  {
    name: 'Іван Коваленко',
    description: 'Дослідник творчості Лятошинського',
    photo: { src: '/img2.jpg', alt: 'Ivan', generatedSrc: 'test-image-2' } as unknown as IImageBlock
  },
  {
    name: 'Марія Петрівна',
    description: 'Куратор проектів фонду',
    photo: { src: '/img3.jpg', alt: 'Maria', generatedSrc: 'test-image-3' } as unknown as IImageBlock
  }
];

describe('FoundationTeam', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Title Rendering', () => {
    it('should render a standard string title inside a Typography component', () => {
      render(<FoundationTeam title="String Foundation Title" team={mockTeamData} />);

      expect(screen.getByText('String Foundation Title')).toBeInTheDocument();
      expect(screen.queryByTestId('mock-tiptap-title')).not.toBeInTheDocument();
    });

    it('should render TipTapContent when title is a TipTapDoc object', () => {
      const mockTipTapTitle = { type: 'doc', content: [] } as unknown as TipTapDoc;

      render(<FoundationTeam title={mockTipTapTitle} team={mockTeamData} />);

      const tiptapContainer = screen.getByTestId('mock-tiptap-title');
      expect(tiptapContainer).toBeInTheDocument();
      expect(tiptapContainer).toHaveTextContent('Mocked TipTap Title');
    });
  });

  describe('Team & Layout Structure', () => {
    it('should apply the provided dataTestId to the root container', () => {
      render(<FoundationTeam title="Title" team={mockTeamData} dataTestId="custom-team-wrapper" />);
      expect(screen.getByTestId('custom-team-wrapper')).toBeInTheDocument();
    });

    it('should render a PersonCard for each team member', () => {
      render(<FoundationTeam title="Title" team={mockTeamData} />);

      const personCards = screen.getAllByTestId('person-card');
      expect(personCards).toHaveLength(3);

      expect(screen.getByText('Тетяна Гомон')).toBeInTheDocument();
      expect(screen.getByText('Спадкоємиця композитора')).toBeInTheDocument();
      expect(screen.getByText('Іван Коваленко')).toBeInTheDocument();
    });

    it('should correctly render the fallback logos based on the math logic', () => {
      render(<FoundationTeam title="Title" team={mockTeamData} />);

      const logos = screen.getAllByAltText('logo');

      expect(logos).toHaveLength(2);
      expect(logos[0]).toBeInTheDocument();
    });
  });
});
