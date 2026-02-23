import { render, screen } from '@testing-library/react';

import { partnersMock } from '../our-partners/partners.data';
import { CooperationSection } from './CooperationSection';

import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';

jest.mock('next-intl', () => ({
  useLocale: () => 'en'
}));

jest.mock('../../section-title/SectionTitle', () => {
  const MockSectionTitle = ({ title }: { title: string }) => <h2 data-testid="section-title">{title}</h2>;
  MockSectionTitle.displayName = 'SectionTitle';
  return MockSectionTitle;
});

jest.mock('../terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => {
  const MockButtonContentBlock = ({ content, buttonText, link }: any) => (
    <div data-testid="button-content-block">
      <div data-testid="content">{JSON.stringify(content)}</div>
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
    buttonLink: '/cooperation',
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
    expect(screen.getByTestId('button-link')).toHaveAttribute('href', '/cooperation');
  });

  it('should render partners slider with provided partners', () => {
    render(<CooperationSection {...mockProps} />);

    const slider = screen.getByTestId('our-partners-slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('data-partners-count', '3');

    const sliderPartners = screen.getAllByTestId('slider-partner');
    expect(sliderPartners).toHaveLength(3);
  });

  it('should render partners slider with empty array when no partners provided', () => {
    const propsWithoutPartners = { ...mockProps, partners: undefined };
    render(<CooperationSection {...propsWithoutPartners} />);

    const slider = screen.getByTestId('our-partners-slider');
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute('data-partners-count', '0');
  });

  it('should render all main components', () => {
    render(<CooperationSection {...mockProps} />);

    const title = screen.getByText('Cooperation');
    const buttonBlock = screen.getByTestId('button-content-block');
    const slider = screen.getByTestId('our-partners-slider');

    expect(title).toBeInTheDocument();
    expect(buttonBlock).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });
});
