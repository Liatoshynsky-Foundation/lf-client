import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import DataWeCollect from './DataWeCollect';
import type { DataWeCollectProps } from '~/types/page/privacy-policy.types';

import {
  assertPolicySectionProps,
  mockLocalizedTipTapDoc
} from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('DataWeCollect block', () => {
  it('should render PolicySection with correct props', () => {
    const mockSections = [
      {
        subtitle: mockLocalizedTipTapDoc('Section Subtitle'),
        list: [mockLocalizedTipTapDoc('Section List Item 1')]
      },
      {
        subtitle: mockLocalizedTipTapDoc('Section Subtitle 2'),
        list: [mockLocalizedTipTapDoc('Section List 1 Item 2')]
      },
      {
        subtitle: mockLocalizedTipTapDoc('Section Subtitle 3'),
        list: [mockLocalizedTipTapDoc('Section List 1 Item 1')]
      }
    ];
    const mockData: DataWeCollectProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      sections: mockSections,
      note: mockLocalizedTipTapDoc('Mock Note')
    };

    render(<DataWeCollect data={mockData} />);
    assertPolicySectionProps(mockData);
  });
});
