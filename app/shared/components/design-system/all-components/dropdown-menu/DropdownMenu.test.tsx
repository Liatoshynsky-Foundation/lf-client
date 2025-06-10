import { MenuItem } from '@mui/material';
import { render, screen } from '@testing-library/react';
import React from 'react';

import DropdownMenu from './DropdownMenu';

describe('DropdownMenu', () => {
  it('should render menu items when open is true', () => {
    render(
      <DropdownMenu
        open={true}
        onClose={() => {}}
        anchorEl={document.body}
        menuList={[<MenuItem key="1">Item 1</MenuItem>, <MenuItem key="2">Item 2</MenuItem>]}
      />
    );

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('should not render when open is false', () => {
    render(
      <DropdownMenu
        open={false}
        onClose={() => {}}
        anchorEl={document.body}
        menuList={<MenuItem>Hidden Item</MenuItem>}
      />
    );

    expect(screen.queryByText('Hidden Item')).not.toBeInTheDocument();
  });
});
