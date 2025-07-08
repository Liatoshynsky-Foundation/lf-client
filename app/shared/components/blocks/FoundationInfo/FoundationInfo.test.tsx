import { render, screen } from '@testing-library/react';

import FoundationInfo from '~/components/blocks/FoundationInfo/FoundationInfo';

jest.mock('~/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

const mockDataWithImage = {
  organisationBoldText: 'Львівська Спадщина',
  organisationMainText: ' - це громадська організація',
  mainText: 'Головний текст про місію.',
  textImage: 'Текст під картинкою.',
  foundationImage: {
    src: '/images/foundation-photo.jpg',
    alt: 'Фото команди фонду'
  }
};

describe('FoundationInfo', () => {
  it('should render the FoundationInfo with text', () => {
    render(FoundationInfo({ data: mockDataWithImage }));

    expect(screen.getByText('Львівська Спадщина')).toBeInTheDocument();
    expect(screen.getByText('Головний текст про місію.')).toBeInTheDocument();
    expect(screen.getByText('Текст під картинкою.')).toBeInTheDocument();
  });
});
