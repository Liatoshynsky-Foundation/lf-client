import { useMediaQuery } from '@mui/material';
import { render, screen } from '@testing-library/react';

import ActionsHelp from './ActionsHelp';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';
jest.mock('swiper/react', () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-swiper">{children}</div>,
  SwiperSlide: ({ children }: { children: React.ReactNode }) => <div data-testid="mock-swiper-slide">{children}</div>
}));

jest.mock('swiper/css', () => ({}));
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn()
}));
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
  title: 'Actions Help',
  subtitle: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'subtitleText'
          }
        ]
      }
    ]
  } as TipTapDoc,
  paperItems: [
    { title: 'Paper 1', description: 'Description 1' },
    { title: 'Paper 2', description: 'Description 2' }
  ],
  paperButton: {
    text: 'Go to test',
    link: '/test-link'
  }
};
describe('ActionsHelp mobile version', () => {
  it('should render Swiper on mobile screens', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<ActionsHelp data={mockData} />);

    expect(screen.getByTestId('mock-swiper')).toBeInTheDocument();
    expect(screen.getAllByTestId('mock-swiper-slide')).toHaveLength(mockData.paperItems.length + 1);
  });
});
describe('ActionsHelp Responsive Rendering', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render plain cards array on Desktop (isMobile = false)', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false);

    render(<ActionsHelp data={mockData} />);

    expect(screen.queryByTestId('mock-swiper')).not.toBeInTheDocument();

    expect(screen.getAllByTestId('text-card')).toHaveLength(mockData.paperItems.length);
    expect(screen.getByTestId('button-card')).toBeInTheDocument();
  });

  it('should render cards inside Swiper on Mobile (isMobile = true)', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);

    render(<ActionsHelp data={mockData} />);

    expect(screen.getByTestId('mock-swiper')).toBeInTheDocument();

    const slides = screen.getAllByTestId('mock-swiper-slide');
    expect(slides.length).toBe(mockData.paperItems.length + 1);
  });
});
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
      expect(screen.getByText(paper.title)).toBeInTheDocument();
      expect(screen.getByText(paper.description)).toBeInTheDocument();
    });
  });

  it('should render the ButtonCard with correct text and link', () => {
    const buttonCard = screen.getByTestId('button-card');
    expect(buttonCard).toHaveTextContent(mockData.paperButton.text);
    expect(buttonCard).toHaveAttribute('href', mockData.paperButton.link);
  });
});
