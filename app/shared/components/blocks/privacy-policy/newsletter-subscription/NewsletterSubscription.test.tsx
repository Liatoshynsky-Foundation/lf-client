import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import NewsletterSubscription from './NewsletterSubscription';
import type { NewsletterSubscriptionProps } from '~/types/page/privacy-policy.types';

jest.mock('../policy-section/PolicySection');

describe('NewsletterSubscription block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: NewsletterSubscriptionProps['data'] = {
      title: 'Mock Title',
      description: {} as any
    };

    render(<NewsletterSubscription data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-newsletter')).toHaveTextContent('Mock Title');
  });
});
