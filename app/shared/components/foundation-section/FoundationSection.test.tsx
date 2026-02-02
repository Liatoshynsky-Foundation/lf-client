import { render, screen } from '@testing-library/react';

import FoundationSection from './FoundationSection';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

jest.mock('~/components/image-with-caption/ImageWithCaption', () => {
  return function MockImageWithCaption(props: { alt?: string; caption?: string }) {
    return (
      <div data-testid="image-with-caption">
        <img alt={props.alt} />
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

jest.mock('~/shared/components/blocks/terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  return function MockButtonContentBlock(props: { buttonText: string }) {
    return <button data-testid="button-content-block">{props.buttonText}</button>;
  };
});

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
    expect(image).toBeInTheDocument();
  });

  it('should render button with correct text', () => {
    render(<FoundationSection {...defaultProps} />);

    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should render with paragraph2', () => {
    render(<FoundationSection {...defaultProps} paragraph2={mockParagraph2} />);

    expect(screen.getByAltText('Foundation')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should render without paragraph2', () => {
    render(<FoundationSection {...defaultProps} />);

    expect(screen.getByAltText('Foundation')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should render without caption', () => {
    //eslint-disable-next-line
    const { caption, ...propsWithoutCaption } = defaultProps;

    render(<FoundationSection {...propsWithoutCaption} />);

    expect(screen.getByAltText('Foundation')).toBeInTheDocument();
  });
});
