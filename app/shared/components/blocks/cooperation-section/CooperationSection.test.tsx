import { render, screen } from '@testing-library/react';
import React from 'react';

import { partnersMock } from '../our-partners/partners.data';
import CooperationSection from './CooperationSection';
import { cooperationSectionData } from './CooperationSection.data';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { ROUTES } from '~/shared/components/constants/routes';

jest.mock('next-intl', () => ({
  useLocale: () => 'en'
}));

jest.mock('../../section-title/SectionTitle', () => {
  const MockSectionTitle = ({ title }: { title: string }) => <h2 data-testid="section-title">{title}</h2>;
  MockSectionTitle.displayName = 'SectionTitle';
  return MockSectionTitle;
});

jest.mock('../terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  const MockButtonContentBlock = ({ buttonText, link }: any) => (
    <div data-testid="button-content-block">
      <a href={link} data-testid="button-link">
        {buttonText}
      </a>
    </div>
  );
  MockButtonContentBlock.displayName = 'ButtonContentBlock';
  return MockButtonContentBlock;
});

jest.mock('../our-partners-slider', () => {
  const MockOurPartnersSlider = ({ partners }: any) => (
    <div data-testid="our-partners-slider" data-partners-count={partners?.length || 0}>
      {partners?.map((partner: any) => (
        <div key={partner.id} data-testid="slider-partner">
          {partner.name}
        </div>
      ))}
    </div>
  );
  MockOurPartnersSlider.displayName = 'OurPartnersSlider';
  return MockOurPartnersSlider;
});

describe('CooperationSection', () => {
  const mockProps = {
    title: {
      uk: 'Співпраця',
      en: 'Cooperation'
    },
    textContent: {
      uk: makeDoc([normalText('Текст українською')]),
      en: makeDoc([normalText('Text in English')])
    },
    buttonText: {
      uk: 'Детальніше',
      en: 'Learn More'
    },
    buttonLink: ROUTES.COOPERATION,
    partners: partnersMock.slice(0, 3)
  };

  it('should render section title with correct locale', () => {
    render(<CooperationSection {...mockProps} />);

    expect(screen.getByTestId('section-title')).toBeInTheDocument();
    expect(screen.getByTestId('section-title')).toHaveTextContent('Cooperation');
  });

  it('should render button content block with correct data', () => {
    render(<CooperationSection {...mockProps} />);

    expect(screen.getByTestId('button-content-block')).toBeInTheDocument();
    expect(screen.getByTestId('button-link')).toHaveTextContent('Learn More');
    expect(screen.getByTestId('button-link')).toHaveAttribute('href', ROUTES.COOPERATION);
  });

    const title = screen.getByTestId('section-title');
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('OuR PaRtNeRs');

    const buttonLink = screen.getByTestId('button-link');
    expect(buttonLink).toHaveTextContent('Join the Partnership');
    expect(buttonLink).toHaveAttribute('href', '/cooperation');

    expect(screen.getByTestId('our-partners-slider')).toBeInTheDocument();
  });

  it('should render with custom mock props for specific edge cases', () => {
    const mockProps = {
      title: { uk: 'Співпраця', en: 'Cooperation' },
      textContent: {
        uk: makeDoc([normalText('Текст')]),
        en: makeDoc([normalText('Text')])
      },
      buttonText: { uk: 'Детальніше', en: 'Learn More' },
      buttonLink: '/cooperation',
      partners: partnersMock.slice(0, 2)
    };

    render(<CooperationSection {...mockProps} />);

    expect(screen.getByTestId('section-title')).toHaveTextContent('Cooperation');
    expect(screen.getAllByTestId('slider-partner')).toHaveLength(2);
  });

  it('should handle undefined partners correctly', () => {
    const propsWithoutPartners = {
      ...cooperationSectionData,
      partners: undefined
    };

    render(<CooperationSection {...(propsWithoutPartners as any)} />);

    const slider = screen.getByTestId('our-partners-slider');
    expect(slider).toHaveAttribute('data-partners-count', '0');
  });
});
