import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import DataUsage from './DataUsage';
import type { DataUsageProps } from '~/types/page/privacy-policy.types';

import {
  assertPolicySectionProps,
  mockLocalizedTipTapDoc
} from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('DataUsage block', () => {
  it('should render PolicySection with correct props', () => {
    const mockList = [mockLocalizedTipTapDoc('List Item 1')];
    const mockData: DataUsageProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      list: mockList
    };

    render(<DataUsage data={mockData} />);
    assertPolicySectionProps(mockData);
  });
});
