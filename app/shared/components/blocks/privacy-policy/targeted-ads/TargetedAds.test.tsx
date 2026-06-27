import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import TargetedAds from './TargetedAds';

jest.mock('../policy-section/PolicySection');

describe('TargetedAds block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData = {
      title: 'Mock Title',
      description: {} as any
    };

    render(<TargetedAds data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-targetedAds')).toHaveTextContent('Mock Title');
  });
});
