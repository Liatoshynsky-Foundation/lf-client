import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import UserRights from './UserRights';
import type { UserRightsProps } from '~/types/page/privacy-policy.types';

import {
  assertPolicySectionProps,
  mockLocalizedTipTapDoc
} from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('UserRights block', () => {
  it('should render PolicySection with correct props', () => {
    const mockList = [mockLocalizedTipTapDoc('List Item 1')];
    const mockData: UserRightsProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      list: mockList,
      note: mockLocalizedTipTapDoc('Mock Note')
    };

    render(<UserRights data={mockData} />);
    assertPolicySectionProps(mockData);
  });
});
