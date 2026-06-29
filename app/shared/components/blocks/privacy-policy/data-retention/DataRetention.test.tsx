import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DataRetention from './DataRetention';
import type { DataRetentionProps } from '~/types/page/privacy-policy.types';

jest.mock('../policy-section/PolicySection');

describe('DataRetention block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: DataRetentionProps['data'] = {
      title: 'Mock Title',
      description: {} as any
    };

    render(<DataRetention data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-dataRetention')).toHaveTextContent('Mock Title');
  });
});
