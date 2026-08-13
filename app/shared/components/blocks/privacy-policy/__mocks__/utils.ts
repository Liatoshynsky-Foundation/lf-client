import { screen, within } from '@testing-library/react';
import { z } from 'zod';

import { getDocKey } from '~/lib/utils/getDocKey';
import { makeDoc, normalText } from '~/lib/utils/tiptapHelpers';
import { TipTapDocSchema } from '~/validators/pagesSchemas/tiptap.schema';

type LocalizedTipTapDoc = z.infer<typeof TipTapDocSchema>;

export const mockLocalizedTipTapDoc = (text: string): LocalizedTipTapDoc =>
  makeDoc([normalText(text)]) as unknown as LocalizedTipTapDoc;

export interface AssertionOptions {
  descriptionAsNote?: boolean;
}

export interface MockSection {
  subtitle?: LocalizedTipTapDoc;
  description?: LocalizedTipTapDoc;
  list?: LocalizedTipTapDoc[];
  note?: LocalizedTipTapDoc;
}

export interface MockData {
  title?: string | LocalizedTipTapDoc;
  description?: LocalizedTipTapDoc;
  list?: LocalizedTipTapDoc[];
  note?: LocalizedTipTapDoc;
  sections?: MockSection[];
}

export const assertPolicySectionProps = (mockData: MockData, options: AssertionOptions = {}) => {
  if (mockData.title) {
    const expectedTitle = typeof mockData.title === 'string' ? mockData.title : JSON.stringify(mockData.title);
    expect(screen.getByTestId('mock-title')).toHaveTextContent(expectedTitle);
  }

  if (mockData.description) {
    const testId = options.descriptionAsNote ? 'mock-note' : 'mock-description';
    expect(screen.getByTestId(testId)).toHaveTextContent(JSON.stringify(mockData.description));
  }

  if (mockData.list) {
    mockData.list.forEach((item, idx) => {
      expect(screen.getByTestId(`mock-list-item-${idx}`)).toHaveTextContent(JSON.stringify(item));
    });
  }

  if (mockData.note) {
    expect(screen.getByTestId('mock-note')).toHaveTextContent(JSON.stringify(mockData.note));
  }

  if (mockData.sections) {
    mockData.sections.forEach((section, idx) => {
      const sectionId = getDocKey(section.subtitle) ?? getDocKey(section.description) ?? `section-${idx}`;
      const sectionContainer = screen.getByTestId(`mock-section-${sectionId}`);

      if (section.subtitle) {
        expect(within(sectionContainer).getByTestId('mock-section-subtitle')).toHaveTextContent(
          JSON.stringify(section.subtitle)
        );
      }

      if (section.description) {
        expect(within(sectionContainer).getByTestId('mock-section-description')).toHaveTextContent(
          JSON.stringify(section.description)
        );
      }

      if (section.list) {
        section.list.forEach((li, liIdx) => {
          expect(within(sectionContainer).getByTestId(`mock-section-list-item-${liIdx}`)).toHaveTextContent(
            JSON.stringify(li)
          );
        });
      }

      if (section.note) {
        expect(within(sectionContainer).getByTestId('mock-section-note')).toHaveTextContent(
          JSON.stringify(section.note)
        );
      }
    });
  }
};
