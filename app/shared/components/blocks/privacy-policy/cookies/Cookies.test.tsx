import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import Cookies from './Cookies';
import type { CookiesProps } from '~/types/page/privacy-policy.types';

import {
  assertPolicySectionProps,
  mockLocalizedTipTapDoc
} from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('Cookies block', () => {
  it('should render PolicySection with correct props', () => {
    const mockList = [mockLocalizedTipTapDoc('List Item 1'), mockLocalizedTipTapDoc('List Item 2')];
    const mockData: CookiesProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      list: mockList,
      note: mockLocalizedTipTapDoc('Mock Note')
    };

    render(<Cookies data={mockData} />);
    assertPolicySectionProps(mockData);
  });
});
