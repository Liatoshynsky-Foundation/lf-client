import { render, screen } from '@testing-library/react';
import Image from 'next/image';

import OurMission from './OurMission';

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

jest.mock('~/shared/components/image-with-caption/ImageWithCaption', () => ({
  __esModule: true,
  default: ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
    <div data-testid="image-with-caption">
      <Image src={src} alt={alt} />
      {caption && <p>{caption}</p>}
    </div>
  )
}));

jest.mock('~/shared/components/section-title/SectionTitle', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <h2>{title}</h2>
}));

jest.mock('~/shared/components/svg-image/SvgImage', () => ({
  __esModule: true,
  SvgImage: ({ src, alt }: { src: string; alt: string }) => <Image src={src} alt={alt} />
}));

jest.mock('~/shared/components/list-item/ListItem', () => ({
  __esModule: true,
  default: ({ text }: { text: string }) => (
    <div>
      <Image src="/mock-image" alt="mock-alt" />
      <p>{text}</p>
    </div>
  )
}));

describe('OurMission component', () => {
  beforeEach(async () => {
    render(await OurMission());
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
    expect(screen.getAllByText('Тестовий опис').length).toBeGreaterThan(0);
  });

  it('should render bullet icons', () => {
    const bullets = screen.getAllByAltText('mock-alt');
    expect(bullets.length).toBe(3);
  });
});
