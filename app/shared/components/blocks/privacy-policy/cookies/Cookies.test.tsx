import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Cookies from './Cookies';
import type { CookiesProps } from '~/types/page/privacy-policy.types';

import { mockLocalizedTipTapDoc } from '~/shared/components/blocks/privacy-policy/__mocks__/utils';

jest.mock('../policy-section/PolicySection');

describe('Cookies block', () => {
  it('should render PolicySection with correct props', () => {
    const mockList = [mockLocalizedTipTapDoc('List Item 1'), mockLocalizedTipTapDoc('List Item 2')];
    const mockData: CookiesProps['data'] = {
      title: 'Mock Title',
      description: mockLocalizedTipTapDoc('Mock Description'),
      list: mockList,
      note: mockLocalizedTipTapDoc('Mock Note')
    };

    render(<Cookies data={mockData} />);
    expect(screen.getByTestId('mock-title')).toHaveTextContent('Mock Title');
    expect(screen.getByTestId('mock-description')).toHaveTextContent(JSON.stringify(mockData.description));

    expect(screen.getByTestId('mock-list-item-0')).toHaveTextContent(JSON.stringify(mockList[0]));
    expect(screen.getByTestId('mock-list-item-1')).toHaveTextContent(JSON.stringify(mockList[1]));

    expect(screen.getByTestId('mock-note')).toHaveTextContent(JSON.stringify(mockData.note));
  });
});
