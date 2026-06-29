import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DataRetention from './DataRetention';
import type { DataRetentionProps } from '~/types/page/privacy-policy.types';

import { mockLocalizedTipTapDoc } from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('DataRetention block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: DataRetentionProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description')
    };

    render(<DataRetention data={mockData} />);
    expect(screen.getByTestId('mock-title')).toHaveTextContent('Mock Title');
    expect(screen.getByTestId('mock-note')).toHaveTextContent(JSON.stringify(mockData.description));
  });
});
