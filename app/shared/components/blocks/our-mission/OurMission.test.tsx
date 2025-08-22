import { render, screen } from '@testing-library/react';

import OurMission from './OurMission';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { IOurMission } from '~/types/types/about-us.types';

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn().mockImplementation(async (namespace) => {
    const translations: Record<string, string> = {
      'home.ourMission.title': 'Наша місія',
      'home.ourMission.list.item1': 'Tестовий текст один',
      'home.ourMission.list.item2': 'Tестовий текст два',
      'home.ourMission.list.item3': 'Tестовий текст три',
      'home.ourMission.imageCaption': 'Тестовий опис'
    };

    return (key: string) => translations[`${namespace}.${key}`] || key;
  })
}));

jest.mock('~/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
    <div data-testid="image-with-caption">
      <img src={src} alt={alt} />
      {caption && <p>{caption}</p>}
    </div>
  )
}));

jest.mock('~/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <h2>{title}</h2>
}));

jest.mock('~/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

jest.mock('~/components/list-item/ListItem', () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => (
    <div>
      <img src="/mock-image" alt="mock-alt" />
      <p>{text}</p>
    </div>
  )
}));

const testData: IOurMission = {
  title: 'Наша місія',
  list: [
    {
      type: TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text,
              text: 'Tестовий текст один'
            }
          ]
        }
      ]
    },
    {
      type: TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text,
              text: 'Tестовий текст два'
            }
          ]
        }
      ]
    },
    {
      type: TipTapNodeTypes.doc,
      content: [
        {
          type: TipTapNodeTypes.paragraph,
          content: [
            {
              type: TipTapNodeTypes.text,
              text: 'Tестовий текст три'
            }
          ]
        }
      ]
    }
  ],
  smallImage: {
    src: 'test',
    alt: 'Tetiana Homon',
    caption: 'Tетяна Гомон'
  },
  bigImage: {
    src: 'test',
    alt: 'Tetiana Homon',
    caption: 'Tетяна Гомон'
  }
};

describe('OurMission component', () => {
  beforeEach(() => {
    render(OurMission({ data: testData }));
  });

  it('should render the section title', () => {
    expect(screen.getByText('Наша місія')).toBeInTheDocument();
  });

  it('should render all mission list items', () => {
    expect(screen.getByText('Tестовий текст один')).toBeInTheDocument();
    expect(screen.getByText('Tестовий текст два')).toBeInTheDocument();
    expect(screen.getByText('Tестовий текст три')).toBeInTheDocument();
  });

  it('should render both images with correct alt texts', () => {
    const images = screen.getAllByAltText('Tetiana Homon');
    expect(images.length).toBe(2);
  });

  it('should render captions', () => {
    expect(screen.getAllByText('Tетяна Гомон').length).toBeGreaterThan(0);
  });

  it('should render bullet icons', () => {
    const bullets = screen.getAllByAltText('mock-alt');
    expect(bullets.length).toBe(3);
  });
});
