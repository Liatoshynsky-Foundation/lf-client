import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DataWeCollect from './DataWeCollect';
import type { DataWeCollectProps } from '~/types/page/privacy-policy.types';

import { mockLocalizedTipTapDoc } from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('DataWeCollect block', () => {
  it('should render PolicySection with correct props', () => {
    const mockSections = [
      {
        subtitle: mockLocalizedTipTapDoc('Section Subtitle'),
        list: [mockLocalizedTipTapDoc('Section List Item 1')]
      }
    ];
    const mockData: DataWeCollectProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      sections: mockSections,
      note: mockLocalizedTipTapDoc('Mock Note')
    };

    render(<DataWeCollect data={mockData} />);
    expect(screen.getByTestId('mock-title')).toHaveTextContent('Mock Title');
    expect(screen.getByTestId('mock-description')).toHaveTextContent(JSON.stringify(mockData.description));
    expect(screen.getByTestId('mock-section-subtitle')).toHaveTextContent(JSON.stringify(mockSections[0].subtitle));
    expect(screen.getByTestId('mock-section-list-item-0')).toHaveTextContent(JSON.stringify(mockSections[0].list[0]));
    expect(screen.getByTestId('mock-note')).toHaveTextContent(JSON.stringify(mockData.note));
  });
});
