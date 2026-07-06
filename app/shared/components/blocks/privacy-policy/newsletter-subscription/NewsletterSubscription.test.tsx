import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import React from 'react';

import NewsletterSubscription from './NewsletterSubscription';
import type { NewsletterSubscriptionProps } from '~/types/page/privacy-policy.types';

import {
  assertPolicySectionProps,
  mockLocalizedTipTapDoc
} from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('NewsletterSubscription block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: NewsletterSubscriptionProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description')
    };

    render(<NewsletterSubscription data={mockData} />);
    assertPolicySectionProps(mockData, { descriptionAsNote: true });
  });
});
