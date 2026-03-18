import { render, screen } from '@testing-library/react';

import FoundationSection from './FoundationSection';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('~/components/image-with-caption/ImageWithCaption', () => {
  return function MockImageWithCaption(props: { src?: string; alt?: string; caption?: string }) {
    return (
      <div data-testid="image-with-caption">
        <img src={props.src} alt={props.alt} />
        {props.caption && <span>{props.caption}</span>}
      </div>
    );
  };
});

jest.mock('~/components/tip-tap-content/TipTapContent', () => {
  return function MockTipTapContent() {
    return <div data-testid="tip-tap-content">TipTap Content</div>;
  };
});

jest.mock('~/ds-components/button/Button', () => {
  return function MockButton({ children, link }: { children: React.ReactNode; link?: string }) {
    return (
      <button data-testid="custom-button" data-link={link}>
        {children}
      </button>
    );
  };
});

jest.mock('~/public/icons/arrow-up-right.svg', () => 'ArrowUpRightIcon');
jest.mock('~/shared/components/colored-svg/ColoredSvg', () => ({
  Svg: () => <svg data-testid="mock-svg" />
}));

describe('FoundationSection', () => {
  const mockParagraph1: TipTapDoc = {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [{ type: TipTapNodeTypes.text, text: 'First paragraph content' }]
      }
    ]
  };

  const mockParagraph2: TipTapDoc = {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [{ type: TipTapNodeTypes.text, text: 'Second paragraph content' }]
      }
    ]
  };

  const defaultProps = {
    imageSrc: '/test-image.jpg',
    caption: 'Test caption',
    paragraph1: mockParagraph1,
    buttonText: 'Learn More',
    buttonLink: '/test-link'
  };

  it('should render without crashing', () => {
    render(<FoundationSection {...defaultProps} />);

    expect(screen.getByAltText('Foundation')).toBeInTheDocument();
  });

  it('should display the image with correct src', () => {
    render(<FoundationSection {...defaultProps} />);

    const image = screen.getByAltText('Foundation');
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render button with correct text and link', () => {
    render(<FoundationSection {...defaultProps} />);

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveTextContent('Learn More');
    expect(button).toHaveAttribute('data-link', '/test-link');
  });

  it('should render with paragraph2', () => {
    render(<FoundationSection {...defaultProps} paragraph2={mockParagraph2} />);

    const paragraphs = screen.getAllByTestId('tip-tap-content');
    expect(paragraphs).toHaveLength(2);
  });

  it('should render without paragraph2', () => {
    render(<FoundationSection {...defaultProps} />);

    const paragraphs = screen.getAllByTestId('tip-tap-content');
    expect(paragraphs).toHaveLength(1);
  });

  it('should render without caption', () => {
    //eslint-disable-next-line
    const { caption, ...propsWithoutCaption } = defaultProps;

    render(<FoundationSection {...propsWithoutCaption} />);

    expect(screen.queryByText('Test caption')).not.toBeInTheDocument();
  });
});
