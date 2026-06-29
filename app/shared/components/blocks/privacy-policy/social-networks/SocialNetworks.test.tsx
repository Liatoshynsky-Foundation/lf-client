import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import SocialNetworks from './SocialNetworks';
import type { SocialNetworksProps } from '~/types/page/privacy-policy.types';

jest.mock('../policy-section/PolicySection');

describe('SocialNetworks block', () => {
  it('should render PolicySection with correct props', () => {
    const mockData: SocialNetworksProps['data'] = {
      title: 'Mock Title',
      description: {} as any
    };

    render(<SocialNetworks data={mockData} />);
    expect(screen.getByTestId('PrivacyPolicy-socialNetworks')).toHaveTextContent('Mock Title');
  });
});
