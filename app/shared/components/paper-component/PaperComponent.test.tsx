import { render, screen } from '@testing-library/react';
import React from 'react';

import PaperComponent from './PaperComponent';

describe('PaperComponent', () => {
  it('should render children correctly', () => {
    render(
      <PaperComponent>
        {' '}
        <div>Children</div>{' '}
      </PaperComponent>
    );
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
  it('should merge sx correctly', () => {
    render(<PaperComponent sx={{ margin: '160px' }}>Children</PaperComponent>);
    const paper = document.querySelector('.MuiPaper-root');
    expect(paper).toHaveStyle('margin: 160px');
  });
  it('should have default elevation of 0', () => {
    render(<PaperComponent>Children</PaperComponent>);
    const paper = document.querySelector('.MuiPaper-root');
    expect(paper).toHaveClass('MuiPaper-elevation0');
  });
  it('should apply custom elevation', () => {
    render(<PaperComponent elevation={3}>Children</PaperComponent>);
    const paper = document.querySelector('.MuiPaper-root');
    expect(paper).toHaveClass('MuiPaper-elevation3');
  });
  it('should merge childrenSx correctly', () => {
    render(
      <PaperComponent childrenSx={{ padding: '30px' }}>
        <div>Children</div>
      </PaperComponent>
    );
    const box = document.querySelector('.MuiBox-root');
    expect(box).toHaveStyle('padding: 30px');
  });
  it('should render without children', () => {
    render(<PaperComponent />);
    expect(document.querySelector('.MuiBox-root')).toBeInTheDocument();
  });
});
