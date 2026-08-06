import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import SectionTitle from './SectionTitle';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc | string;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en')
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ fill, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => (
    <img {...props} alt={props.alt || 'image'} data-testid="next-image" data-fill={fill ? 'true' : undefined} />
  )
}));

jest.mock('~/lib/utils/generateSizesAttribute', () => ({
  generateSizesAttribute: jest.fn(() => '(max-width: 600px) 16px, 24px')
}));

jest.mock('~/utils/sxToArray', () => ({
  sxToArray: (sx: unknown) => (Array.isArray(sx) ? sx : [sx].filter(Boolean))
}));

jest.mock('~/lib/utils/tiptapHelpers', () => ({
  isTipTapDoc: jest.fn((val) => val && (val.type === 'doc' || val.type === TipTapNodeTypes.doc || val.isDoc)),
  getPlainString: jest.fn((val) => (typeof val === 'string' ? val : val?.en || 'localized-fallback'))
}));

jest.mock('../tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];
    const isObjectDoc = typeof data === 'object' && data !== null && 'content' in data;
    const isString = typeof data === 'string' ? data : undefined;
    const rawText = isObjectDoc ? (data as unknown as Record<string, unknown>).content : isString;
    return (
      <div data-testid="mock-tiptap-content">
        {ParagraphRenderer
          ? ParagraphRenderer(typeof rawText === 'string' ? rawText : 'TipTap Title Content')
          : 'Fallback'}
      </div>
    );
  }
}));

const mockLocalizedTitle = { uk: 'Тестовий заголовок', en: 'Test English Title' };

const mockTipTapTitle = {
  type: 'doc',
  isDoc: true,
  content: [
    {
      type: 'paragraph',
      content: [{ type: 'text', text: 'TipTap Title Content' }]
    }
  ]
} as unknown as TipTapDoc;

describe('SectionTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render title with icon', () => {
    render(<SectionTitle title={{ uk: 'Test title', en: 'Test title' }} />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByAltText('ellipse')).toBeInTheDocument();
  });

  it('should render title without icon', () => {
    render(<SectionTitle icon={false} title={{ uk: 'Test title', en: 'Test title' }} />);
    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.queryByAltText('ellipse')).not.toBeInTheDocument();
  });

  describe('Icon Visibility and Content Routing Matrix', () => {
    it('should correctly configure default visibility states and render plain text dictionaries', () => {
      render(<SectionTitle title={mockLocalizedTitle} />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Test English Title');
      expect(screen.queryByTestId('mock-tiptap-content')).not.toBeInTheDocument();
      expect(screen.getByAltText('ellipse')).toBeInTheDocument();
    });

    it('should cleanly suppress the icon when icon prop is false', () => {
      render(<SectionTitle icon={false} title={mockLocalizedTitle} />);
      expect(screen.queryByAltText('ellipse')).not.toBeInTheDocument();
    });

    it('should alternate pipelines and mount TipTapContent when fed a structured node document', () => {
      render(<SectionTitle title={mockTipTapTitle} />);
      expect(screen.getByTestId('mock-tiptap-content')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('TipTap Title Content');
    });
  });

  describe('Dynamic TestID Mapping Propagation', () => {
    const testIdScenarios = [
      { id: 'OurGoals', payload: mockLocalizedTitle, expected: 'Test English Title' },
      { id: 'OurMission', payload: mockTipTapTitle, expected: 'TipTap Title Content' }
    ];

    it.each(testIdScenarios)(
      'should match DOM structural suffixes when test ID is assigned to variant "$id"',
      ({ id, payload, expected }) => {
        render(<SectionTitle title={payload} dataTestId={id} />);
        expect(screen.getByTestId(id)).toBeInTheDocument();
        const matchingElements = screen.getAllByTestId(`${id}-title`);
        expect(matchingElements.length).toBeGreaterThanOrEqual(1);
        const hasExpectedText = matchingElements.some((el) => el.textContent === expected);
        expect(hasExpectedText).toBe(true);
      }
    );
  });
});
