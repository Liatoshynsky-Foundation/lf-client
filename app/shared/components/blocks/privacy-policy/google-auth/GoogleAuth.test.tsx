import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import GoogleAuth from './GoogleAuth';
import type { GoogleAuthProps } from '~/types/page/privacy-policy.types';

import {
  assertPolicySectionProps,
  mockLocalizedTipTapDoc
} from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('GoogleAuth block', () => {
  it('should render PolicySection with correct props', () => {
    const mockList = [mockLocalizedTipTapDoc('List Item 1')];
    const mockData: GoogleAuthProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      list: mockList,
      note: mockLocalizedTipTapDoc('Mock Note')
    };

    render(<GoogleAuth data={mockData} />);
    assertPolicySectionProps(mockData);
  });
});
