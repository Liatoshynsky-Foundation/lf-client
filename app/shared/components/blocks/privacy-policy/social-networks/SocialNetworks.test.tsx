import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import SocialNetworks from './SocialNetworks';
import type { SocialNetworksProps } from '~/types/page/privacy-policy.types';

import { mockLocalizedTipTapDoc } from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('SocialNetworks block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: SocialNetworksProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description')
    };

    render(<SocialNetworks data={mockData} />);
    expect(screen.getByTestId('mock-title')).toHaveTextContent('Mock Title');
    expect(screen.getByTestId('mock-note')).toHaveTextContent(JSON.stringify(mockData.description));
  });
});
