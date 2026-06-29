import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import GoogleAuth from './GoogleAuth';
import type { GoogleAuthProps } from '~/types/page/privacy-policy.types';

import { mockLocalizedTipTapDoc } from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('GoogleAuth block', () => {
  it('should render PolicySection with correct props', () => {
    const mockList = [mockLocalizedTipTapDoc('List Item 1')];
    const mockData: GoogleAuthProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      list: mockList,
      note: mockLocalizedTipTapDoc('Mock Note')
    };

    render(<GoogleAuth data={mockData} />);
    expect(screen.getByTestId('mock-title')).toHaveTextContent('Mock Title');
    expect(screen.getByTestId('mock-description')).toHaveTextContent(JSON.stringify(mockData.description));
    expect(screen.getByTestId('mock-list-item-0')).toHaveTextContent(JSON.stringify(mockList[0]));
    expect(screen.getByTestId('mock-note')).toHaveTextContent(JSON.stringify(mockData.note));
  });
});
