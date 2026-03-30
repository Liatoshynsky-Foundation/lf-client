import { render, screen } from '@testing-library/react';

import ArtistrySection from './ArtistrySection';
import { artistrySectionData } from './ArtistrySection.data';
import { TipTapNodeTypes } from '~/types/enums/common.enums';

const ButtonContentBlockMock = jest.fn(({ buttonText, additionalDescription }: any) => (
  <div>
    <button data-testid="ButtonContentBlock-mock">{buttonText}</button>
    {additionalDescription && <div data-testid="additional-content">Extra</div>}
  </div>
));

jest.mock('../terms-of-use/terms-content/button-content-block/ButtonContentBlock', () => ({
  __esModule: true,
  default: (props: any) => ButtonContentBlockMock(props)
}));

jest.mock('next-intl', () => ({
  useLocale: () => 'uk'
}));

describe('ArtistrySection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with real constant data', () => {
    render(<ArtistrySection {...artistrySectionData} />);

    expect(screen.getByText(artistrySectionData.subTitle.uk)).toBeInTheDocument();
    expect(screen.getByTestId('ButtonContentBlock-mock')).toHaveTextContent(artistrySectionData.buttonText.uk);
  });

  it('should cover splitTipTapContent when content is short or empty', () => {
    const shortProps = {
      ...artistrySectionData,
      textContent: {
        uk: { type: TipTapNodeTypes.doc, content: [] },
        en: {
          type: TipTapNodeTypes.doc,
          content: [{ type: TipTapNodeTypes.paragraph, content: [{ type: TipTapNodeTypes.text, text: 'short' }] }]
        }
      }
    };

    render(<ArtistrySection {...(shortProps as any)} />);
    expect(screen.queryByTestId('additional-content')).not.toBeInTheDocument();
  });

  it('should cover full split logic with multiple text nodes', () => {
    const multiNodeProps = {
      ...artistrySectionData,
      textContent: {
        uk: {
          type: TipTapNodeTypes.doc,
          content: [
            {
              type: TipTapNodeTypes.paragraph,
              content: [
                { type: TipTapNodeTypes.text, text: 'First' },
                { type: TipTapNodeTypes.text, text: 'Second' }
              ]
            }
          ]
        },
        en: artistrySectionData.textContent.en
      }
    };

    render(<ArtistrySection {...(multiNodeProps as any)} />);

    expect(screen.getByTestId('additional-content')).toBeInTheDocument();

    const lastCall = ButtonContentBlockMock.mock.calls[0][0];
    expect(lastCall.content.content[0].content).toHaveLength(1);
    expect(lastCall.additionalDescription.content[0].content).toHaveLength(1);
  });
});
