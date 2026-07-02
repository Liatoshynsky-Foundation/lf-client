import { render, screen } from '@testing-library/react';

import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';

import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IFoundationInfo } from '~/types/page/about-us.types';

jest.mock('~/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

const mockDataWithImage: IFoundationInfo = {
  image: {
    src: '/images/foundation-photo.jpg',
    alt: 'Фото команди фонду',
    generatedSrc: '/images/foundation-photo.jpg',
    caption: 'підпис під фото'
  },
  ourOrganisation: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'ourOrganisation текст'
          }
        ]
      }
    ]
  },
  ourBelief: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'ourBelief текст'
          }
        ]
      }
    ]
  },
  ourName: {
    type: TipTapNodeTypes.doc,
    content: [
      {
        type: TipTapNodeTypes.paragraph,
        content: [
          {
            type: TipTapNodeTypes.text,
            text: 'ourName текст'
          }
        ]
      }
    ]
  }
};

describe('FoundationInfo', () => {
  it('should render the FoundationInfo with text', () => {
    render(<FoundationInfo data={mockDataWithImage} />);

    expect(screen.getByText('ourOrganisation текст')).toBeInTheDocument();
    expect(screen.getByText('ourName текст')).toBeInTheDocument();
    expect(screen.getByText('ourBelief текст')).toBeInTheDocument();
  });
});
