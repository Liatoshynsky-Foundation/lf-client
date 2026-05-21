import { render, screen } from '@testing-library/react';
import { useLocale } from 'next-intl';
import React from 'react';

import SectionTitle from './SectionTitle';
import { TipTapNodeTypes } from '~/types/enums/common.enums';
import { TipTapDoc } from '~/types/types/tiptap.types';

type MockTipTapContentProps = {
  data: TipTapDoc;
  nodeRenderers?: Record<string, (children: React.ReactNode) => React.ReactNode>;
};

jest.mock('next-intl', () => ({
  useLocale: jest.fn(() => 'en')
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} data-testid="next-image" />
}));

jest.mock('~/lib/utils/generateSizesAttribute', () => ({
  generateSizesAttribute: jest.fn(() => '(max-width: 600px) 16px, 24px')
}));

jest.mock('~/utils/sxToArray', () => ({
  sxToArray: (sx: unknown) => (Array.isArray(sx) ? sx : [sx].filter(Boolean))
}));

jest.mock('~/lib/utils/tiptapHelpers', () => ({
  isTipTapDoc: jest.fn((val) => val && val.type === 'doc'),
  getPlainString: jest.fn((val) => (typeof val === 'string' ? val : val?.en || 'localized-fallback'))
}));

jest.mock('../tip-tap-content/TipTapContent', () => ({
  __esModule: true,
  default: ({ data, nodeRenderers }: MockTipTapContentProps) => {
    const ParagraphRenderer = nodeRenderers?.[TipTapNodeTypes.paragraph] || nodeRenderers?.['paragraph'];

    const rawText = data?.content?.[0]?.content?.[0]?.text;
    const dummyText: string =
      typeof rawText === 'string'
        ? rawText
        : rawText && typeof rawText === 'object'
          ? (rawText as Record<string, string>).uk || (rawText as Record<string, string>).en || ''
          : 'Fallback Text';

    return <div data-testid="mock-tiptap-content">{ParagraphRenderer ? ParagraphRenderer(dummyText) : dummyText}</div>;
  }
}));

const mockLocalizedTitle = { uk: 'Тестовий заголовок', en: 'Test English Title' };

const mockTipTapTitle = {
  type: TipTapNodeTypes.doc,
  content: [
    {
      type: TipTapNodeTypes.paragraph,
      content: [{ type: TipTapNodeTypes.text, text: 'TipTap Title Content' }]
    }
  ]
} as unknown as TipTapDoc;

describe('SectionTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLocale as jest.Mock).mockReturnValue('en');
  });

  describe('Icon Visibility Rules', () => {
    it('should render the primitive title accompanied by the icon by default', () => {
      render(<SectionTitle title={mockLocalizedTitle} />);

      expect(screen.getByText('Test English Title')).toBeInTheDocument();

      const icon = screen.getByAltText('ellipse');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('sizes', '(max-width: 600px) 16px, 24px');
    });

    it('should cleanly suppress the icon when icon prop is set to false', () => {
      render(<SectionTitle icon={false} title={mockLocalizedTitle} />);

      expect(screen.getByText('Test English Title')).toBeInTheDocument();
      expect(screen.queryByAltText('ellipse')).not.toBeInTheDocument();
    });
  });

  describe('Title Content Variant Routing', () => {
    it('should use plain text translation mapping when title is standard dictionary object', () => {
      render(<SectionTitle title={mockLocalizedTitle} />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Test English Title');
      expect(screen.queryByTestId('mock-tiptap-content')).not.toBeInTheDocument();
    });

    it('should mount TipTapContent pipeline when title satisfies isTipTapDoc parameters', () => {
      render(<SectionTitle title={mockTipTapTitle} />);

      expect(screen.getByTestId('mock-tiptap-content')).toBeInTheDocument();

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('TipTap Title Content');
    });
  });

  describe('Dynamic TestID Mapping Propagation', () => {
    it('should dynamically append contextual suffix rules when a parent dataTestId is provided', () => {
      render(<SectionTitle title={mockLocalizedTitle} dataTestId="OurGoals" />);

      expect(screen.getByTestId('OurGoals')).toBeInTheDocument();

      expect(screen.getByTestId('OurGoals-title')).toHaveTextContent('Test English Title');
      expect(screen.getByTestId('OurGoals-icon')).toBeInTheDocument();
    });

    it('should distribute dynamic title identifiers properly when processing TipTap variants', () => {
      render(<SectionTitle title={mockTipTapTitle} dataTestId="OurMission" />);

      expect(screen.getByTestId('OurMission')).toBeInTheDocument();
      expect(screen.getByTestId('OurMission-title')).toHaveTextContent('TipTap Title Content');
      expect(screen.getByTestId('OurMission-icon')).toBeInTheDocument();
    });
  });
});
