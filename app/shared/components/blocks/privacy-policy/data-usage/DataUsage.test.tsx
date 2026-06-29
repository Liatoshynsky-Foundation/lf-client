import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DataUsage from './DataUsage';
import type { DataUsageProps } from '~/types/page/privacy-policy.types';

jest.mock('../policy-section/PolicySection');

describe('DataUsage block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: DataUsageProps['data'] = {
      title: 'Mock Title',
      description: {} as any,
      list: []
    };

    render(<DataUsage data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-dataUsage')).toHaveTextContent('Mock Title');
  });
});
